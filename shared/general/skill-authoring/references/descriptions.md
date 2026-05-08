# Description Requirements

The `description` frontmatter is the primary text an agent sees when deciding whether to load a skill. It must make selection easy.

## Goal

Give the agent enough information to know:

1. What capability this skill provides.
2. When and why to trigger it.

## Format

- Keep it compact and specific.
- Write in third person or capability style.
- First sentence: what it does.
- Second sentence: `Use when ...` with concrete triggers.
- Include important child skill names in router descriptions because routing metadata is visible before reference files are loaded.

## Good example

```text
Extract text and tables from PDF files, fill forms, and merge documents. Use when working with PDF files or when user mentions PDFs, forms, document extraction, or document assembly.
```

## Bad example

```text
Helps with documents.
```

The bad example gives the agent no way to distinguish the skill from other document or file-processing skills.
