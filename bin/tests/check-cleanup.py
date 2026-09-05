#!/usr/bin/env python3
"""Independent fixture checks. All runs/fixtures persist. No Git or permanent removal.

Usage: python3 check_cleanup.py /path/to/skills-repository
Copies current bin/ into each fixture, so reruns test the revised real scripts.
"""
import hashlib
import http.server
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import threading
import uuid


SOURCE = Path(sys.argv[1]).resolve() if len(sys.argv) == 2 else None
if SOURCE is None or not (SOURCE / "bin/link").is_file():
    sys.exit("Usage: python3 check_cleanup.py /path/to/skills-repository")
RUN = Path(tempfile.mkdtemp(prefix="skills-cleanup-check-")).resolve()
RESULTS = []
RUNS = []
SNAPSHOT = RUN / "source-snapshot"
SNAPSHOT.mkdir()
shutil.copytree(SOURCE / "bin", SNAPSHOT / "bin", symlinks=True)
if (SOURCE / "package.json").is_file():
    shutil.copy2(SOURCE / "package.json", SNAPSHOT / "package.json")

# The initial linker uses unlinkSync. Intercept removal before it occurs.
# syncBuiltinESMExports also protects named ESM imports in the real linker.
# The real /usr/bin/trash subprocess is allowed and its arguments are recorded.
GUARD = RUN / "no-permanent-delete.cjs"
GUARD.write_text(r'''
const fs = require('node:fs');
const cp = require('node:child_process');
const log = (entry) => fs.appendFileSync(process.env.CLEANUP_CHECK_TRACE, JSON.stringify(entry) + '\n');
for (const key of ['unlink', 'unlinkSync', 'rm', 'rmSync', 'rmdir', 'rmdirSync']) {
  fs[key] = (...args) => {
    log({blocked: key, path: String(args[0])});
    throw new Error('CHECK SAFETY: permanent deletion is forbidden: ' + key);
  };
}
for (const key of ['unlink', 'rm', 'rmdir']) {
  fs.promises[key] = async (...args) => {
    log({blocked: 'promises.' + key, path: String(args[0])});
    throw new Error('CHECK SAFETY: permanent deletion is forbidden: ' + key);
  };
}
for (const key of ['spawnSync', 'spawn', 'execFileSync', 'execFile', 'execSync', 'exec']) {
  const original = cp[key];
  cp[key] = function (...args) {
    log({operation: key, command: String(args[0]), args: Array.isArray(args[1]) ? args[1] : []});
    if (/(^|[\s/;])(rm|unlink|rmdir|shred)([\s;]|$)/.test(String(args[0]))) {
      throw new Error('CHECK SAFETY: permanent deletion subprocess is forbidden');
    }
    return original.apply(this, args);
  };
}
require('node:module').syncBuiltinESMExports();
''')


def write(path, text):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text)
    return path


def skill(root, location="skills/alpha", front=None, body="# Alpha\n\nRead the input.\n"):
    package = root / location
    name = package.name
    front = front if front is not None else f"name: {name}\ndescription: Read the requested input.\n"
    write(package / "SKILL.md", "---\n" + front + "---\n" + body)
    return package


def fixture(label, providers=None):
    root = RUN / label
    root.mkdir()
    shutil.copytree(SNAPSHOT / "bin", root / "bin", symlinks=True)
    for filename in ("package.json",):
        if (SNAPSHOT / filename).is_file():
            shutil.copy2(SNAPSHOT / filename, root / filename)
    (root / "skills").mkdir()
    (root / "native").mkdir()
    providers = providers if providers is not None else {"first": {}, "second": {}}
    manifest = {"claude_only": [], "dormant": [], "providers": providers}
    write(root / "manifest.json", json.dumps(manifest, indent=2) + "\n")
    for name in providers:
        (root / "providers" / name).mkdir(parents=True)
    return root


def run(root, argv, env_extra=None):
    env = os.environ.copy()
    trace = root / "process-trace.jsonl"
    env["NODE_OPTIONS"] = f"--require={GUARD}"
    env["CLEANUP_CHECK_TRACE"] = str(trace)
    if env_extra:
        env.update(env_extra)
    result = subprocess.run(argv, cwd=root, env=env, text=True, capture_output=True)
    RUNS.append({"fixture": str(root), "argv": argv, "exit": result.returncode,
                 "stdout": result.stdout, "stderr": result.stderr})
    return result


def record(label, ok, detail="", blocked=False):
    status = "BLOCKED" if blocked else "PASS" if ok else "FAIL"
    RESULTS.append({"check": label, "status": status, "detail": detail})
    print(f"{status}: {label}" + (f" ({detail})" if detail else ""), flush=True)


def snapshot(root):
    result = {}
    for path in sorted(root.rglob("*")):
        key = str(path.relative_to(root))
        stat = path.lstat()
        if path.is_symlink():
            result[key] = ("link", os.readlink(path), stat.st_ino, stat.st_mtime_ns)
        elif path.is_file():
            result[key] = ("file", hashlib.sha256(path.read_bytes()).hexdigest(), stat.st_ino)
        else:
            result[key] = ("directory", stat.st_ino)
    return result


def trashed(root, path):
    trace = root / "process-trace.jsonl"
    if not trace.exists():
        return False
    for line in trace.read_text().splitlines():
        item = json.loads(line)
        command = item.get("command", "")
        args = item.get("args", [])
        if command == "/usr/bin/trash" and str(path) in args:
            return True
        if command.startswith("/usr/bin/trash ") and str(path) in command:
            return True
    return False


def link_checks():
    root = fixture("link-exposure", {
        "first": {"exclude": ["dormant", "claude_only"], "native": ["native/first/native-one"]},
        "second": {"exclude": ["dormant"]},
    })
    for name in ("alpha", "dormant-skill", "claude-only"):
        skill(root, "skills/" + name)
    skill(root, "native/first/native-one")
    write(root / "skills/not-a-package/README.md", "Supporting directory.\n")
    write(root / "skills/loose-file.md", "Loose file.\n")
    (root / "skills/package-alias").symlink_to("alpha", target_is_directory=True)
    manifest = json.loads((root / "manifest.json").read_text())
    manifest["dormant"] = ["dormant-skill"]
    manifest["claude_only"] = ["claude-only"]
    write(root / "manifest.json", json.dumps(manifest))
    result = run(root, [str(root / "bin/link")])
    expected = {
        "first": {"alpha": "../../skills/alpha", "native-one": "../../native/first/native-one"},
        "second": {"alpha": "../../skills/alpha", "claude-only": "../../skills/claude-only"},
    }
    actual = {p: {x.name: os.readlink(x) if x.is_symlink() else "REAL" for x in (root / "providers" / p).iterdir()} for p in expected}
    record("link exposes canonical packages and configured native entries only", result.returncode == 0 and actual == expected,
           f"exit={result.returncode}; actual={actual}")
    before = snapshot(root / "providers")
    repeat = run(root, [str(root / "bin/link")])
    record("link preserves correct symlink identities on repeat", repeat.returncode == 0 and before == snapshot(root / "providers"), f"exit={repeat.returncode}")

    for replacement in (False, True):
        label = "retarget" if replacement else "stale"
        root = fixture("link-" + label)
        skill(root)
        target = write(root / "surviving-target/payload.txt", "Do not remove this target.\n").parent
        entry = root / "providers/first" / ("alpha" if replacement else "cleanup-check-" + uuid.uuid4().hex)
        entry.symlink_to(target, target_is_directory=True)
        result = run(root, [str(root / "bin/link")])
        expected_entry = entry.is_symlink() and os.readlink(entry) == "../../skills/alpha" if replacement else not os.path.lexists(entry)
        survived = (target / "payload.txt").read_text() == "Do not remove this target.\n"
        record(f"link sends {label} symlink to Trash and preserves target",
               result.returncode == 0 and expected_entry and survived and trashed(root, entry),
               f"exit={result.returncode}; target_survives={survived}; trash_invoked={trashed(root, entry)}")

    for kind in ("symlink", "directory", "wanted-symlink"):
        preserved = "alpha" if kind == "wanted-symlink" else ".system"
        root = fixture("link-preserve-" + kind, {"first": {"preserve": [preserved]}, "second": {}})
        skill(root)
        entry = root / "providers/first" / preserved
        if kind == "directory":
            write(entry / "live-state.txt", "Live consumer state.\n")
        else:
            target = write(root / "live-state/payload.txt", "Live consumer state.\n").parent
            entry.symlink_to(target, target_is_directory=True)
        before = snapshot(root / "providers/first")
        result = run(root, [str(root / "bin/link")])
        after = snapshot(root / "providers/first")
        unchanged = all(after.get(key) == value for key, value in before.items())
        record("link leaves manifest-preserved " + kind + " untouched", result.returncode == 0 and unchanged, f"exit={result.returncode}")

    root = fixture("link-unmanaged")
    skill(root)
    write(root / "providers/first/unmanaged-dir/sentinel.txt", "Keep this real entry.\n")
    write(root / "providers/first/unmanaged.txt", "Keep this real file.\n")
    before = snapshot(root / "providers/first")
    result = run(root, [str(root / "bin/link")])
    after = snapshot(root / "providers/first")
    record("link preserves unmanaged real files and directories", result.returncode == 0 and all(after.get(k) == v for k, v in before.items()), f"exit={result.returncode}")

    for problem in ("missing-native", "real-name-collision"):
        providers = {"first": {}, "second": {}}
        if problem == "missing-native":
            providers["second"]["native"] = ["native/second/missing"]
        root = fixture("link-atomic-" + problem, providers)
        skill(root)
        write(root / "providers/first/existing.txt", "Existing provider state.\n")
        if problem == "real-name-collision":
            write(root / "providers/second/alpha/owned.txt", "Unmanaged real directory.\n")
        before = snapshot(root / "providers")
        result = run(root, [str(root / "bin/link")])
        unchanged = before == snapshot(root / "providers")
        record("link fails before changing any provider: " + problem, result.returncode != 0 and unchanged,
               f"exit={result.returncode}; providers_unchanged={unchanged}")


def validator_checks():
    control = fixture("validate-control")
    skill(control)
    result = run(control, [str(control / "bin/validate-skill.sh"), "skills/alpha"])
    ready = result.returncode == 0
    record("validator accepts one directory with minimal valid YAML", ready, f"exit={result.returncode}")

    def check(label, front=None, body=None, prepare=None, valid=True, args=None):
        root = fixture("validate-" + label)
        package = skill(root, front=front, **({"body": body} if body is not None else {}))
        if prepare:
            prepare(root, package)
        argv = [str(root / "bin/validate-skill.sh")] + (args if args is not None else ["skills/alpha"])
        result = run(root, argv)
        ok = (result.returncode == 0) if valid else (result.returncode != 0)
        blocked = not valid and not ready and ok
        record("validator " + label, ok, f"exit={result.returncode}" + ("; valid control failed" if blocked else ""), blocked=blocked)
        return root, result

    check("rejects-zero-arguments", valid=False, args=[])
    check("rejects-second-argument", valid=False, args=["skills/alpha", "leaf"])
    check("quoted-YAML-scalars", front='name: "alpha"\ndescription: "Read input: keep # characters literal."\n')
    check("folded-YAML-description", front="name: alpha\ndescription: >-\n  Read the input.\n  Keep the useful details.\n")
    check("literal-YAML-description", front="name: alpha\ndescription: |\n  Read the input.\n  Keep the useful details.\n")
    check("supported-optional-metadata", front='name: alpha\ndescription: Read the input.\nlicense: MIT\ncompatibility: Requires Python 3.\nallowed-tools: Read Bash\nmetadata:\n  author: Example\n  version: "1.0"\n  short-description: Read input.\n')
    check("quoted-boolean-description-is-string", front='name: alpha\ndescription: "false"\n')
    long_description = "Read the input. Keep the useful details. Explain the result. " * 10
    check("large-valid-description", front="name: alpha\ndescription: " + json.dumps(long_description) + "\n")
    check("large-valid-document-without-archetype", body="# Alpha\n\n" + "Read the next item and record the result.\n" * 1300)
    check("large-valid-reference", body="# Alpha\n\nRead [the details](references/details.md).\n",
          prepare=lambda root, package: write(package / "references/details.md", "Read this step.\n" * 1300))

    for label, front in {
        "missing-name": "description: Read input.\n",
        "missing-description": "name: alpha\n",
        "empty-description": 'name: alpha\ndescription: ""\n',
        "whitespace-description": 'name: alpha\ndescription: "   "\n',
        "null-description": "name: alpha\ndescription: null\n",
        "boolean-description": "name: alpha\ndescription: false\n",
        "numeric-description": "name: alpha\ndescription: 123\n",
        "list-description": "name: alpha\ndescription: [one, two]\n",
        "mapping-description": "name: alpha\ndescription: {text: read}\n",
        "numeric-name": "name: 123\ndescription: Read input.\n",
        "list-name": "name: [alpha]\ndescription: Read input.\n",
        "wrong-name": "name: beta\ndescription: Read input.\n",
        "non-kebab-name": "name: Alpha_Name\ndescription: Read input.\n",
        "malformed-YAML": "name: alpha\ndescription: [unterminated\n",
    }.items():
        check("rejects-" + label, front=front, valid=False)
    check("rejects-absent-frontmatter", prepare=lambda root, package: write(package / "SKILL.md", "# Alpha\nname: alpha\ndescription: Read input.\n"), valid=False)
    check("rejects-unclosed-frontmatter", prepare=lambda root, package: write(package / "SKILL.md", "---\nname: alpha\ndescription: Read input.\n# Body\n"), valid=False)
    check("rejects-missing-SKILL", args=["skills/missing"], valid=False)

    def local_files(root, package):
        write(package / "references/details.md", "# Details\n\nRead [the sample](../assets/sample.txt).\n")
        write(package / "assets/sample.txt", "Example input.\n")
        write(package / "scripts/demo.py", "print('example')\n")

    check("valid-local-links-and-static-refs", body="# Alpha\n\nRead [details](references/details.md#details). Run `scripts/demo.py`. Read `assets/sample.txt`. [Here](#alpha).\n", prepare=local_files)
    check("valid-dynamic-reference-placeholder", body="# Alpha\n\nSelect `references/<topic>.md` after a topic is chosen.\n")
    for label, body in {
        "missing-markdown-link": "Read [details](guide.md).\n",
        "missing-backtick-reference": "Read `references/missing.md`.\n",
        "missing-backtick-script": "Run `scripts/missing.py`.\n",
        "missing-reference-link-definition": "Read [details][guide].\n\n[guide]: references/missing.md\n",
    }.items():
        check("rejects-" + label, body=body, valid=False)
    check("rejects-missing-link-in-reference", body="Read [details](references/details.md).\n",
          prepare=lambda root, package: write(package / "references/details.md", "Read [missing](missing.md).\n"), valid=False)

    def internal_symlink(root, package):
        write(package / "assets/real.txt", "Keep this file.\n")
        (package / "assets/alias.txt").symlink_to("real.txt")

    check("rejects-internal-package-symlink", prepare=internal_symlink, valid=False)
    check("rejects-dangling-package-symlink", prepare=lambda root, package: (package / "dangling.txt").symlink_to("missing.txt"), valid=False)
    check("rejects-canonical-name-duplicate", prepare=lambda root, package: skill(root, "skills/beta", front='name: "alpha"\ndescription: Duplicate name.\n'), valid=False)
    check("rejects-native-name-duplicate", prepare=lambda root, package: skill(root, "native/example/alpha"), valid=False)

    root = fixture("validate-unique-native")
    skill(root, "skills/beta")
    skill(root, "native/example/alpha")
    result = run(root, [str(root / "bin/validate-skill.sh"), "native/example/alpha"])
    record("validator accepts a unique native package", result.returncode == 0, f"exit={result.returncode}")

    requests = []

    class Handler(http.server.BaseHTTPRequestHandler):
        def do_GET(self):
            requests.append(self.path)
            self.send_response(404)
            self.end_headers()

        def log_message(self, *args):
            pass

    server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), Handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    try:
        root, result = check("external-URLs-are-accepted", body=f"Read [external](http://127.0.0.1:{server.server_port}/missing.md).\nRead [secure](https://example.invalid/references/missing.md).\n")
        record("validator does not fetch external URLs", result.returncode == 0 and not requests,
               f"exit={result.returncode}; requests={len(requests)}", blocked=not ready)
    finally:
        server.shutdown()
        server.server_close()
        thread.join()


try:
    link_checks()
    validator_checks()
except Exception as error:
    record("runner completed all checks", False, f"{type(error).__name__}: {error}")
finally:
    write(RUN / "results.json", json.dumps({"source": str(SOURCE), "results": RESULTS, "subprocesses": RUNS}, indent=2) + "\n")
    counts = {status: sum(x["status"] == status for x in RESULTS) for status in ("PASS", "FAIL", "BLOCKED")}
    print("COUNTS: " + json.dumps(counts), flush=True)
    print("EVIDENCE: " + str(RUN / "results.json"), flush=True)
    print("FIXTURES: " + str(RUN), flush=True)
sys.exit(0 if counts["FAIL"] == 0 and counts["BLOCKED"] == 0 else 1)
