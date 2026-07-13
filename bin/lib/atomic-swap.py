#!/usr/bin/env python3
"""Atomically exchange two existing directories without deleting either."""

import ctypes
import os
import sys


def swap(left: str, right: str) -> None:
    libc = ctypes.CDLL(None, use_errno=True)
    encoded_left = os.fsencode(left)
    encoded_right = os.fsencode(right)

    if sys.platform == "darwin":
        operation = libc.renamex_np
        operation.argtypes = [ctypes.c_char_p, ctypes.c_char_p, ctypes.c_uint]
        operation.restype = ctypes.c_int
        result = operation(encoded_left, encoded_right, 0x00000002)  # RENAME_SWAP
    elif sys.platform.startswith("linux"):
        operation = libc.renameat2
        operation.argtypes = [ctypes.c_int, ctypes.c_char_p, ctypes.c_int, ctypes.c_char_p, ctypes.c_uint]
        operation.restype = ctypes.c_int
        result = operation(-100, encoded_left, -100, encoded_right, 0x00000002)  # RENAME_EXCHANGE
    else:
        raise RuntimeError(f"atomic directory exchange is unsupported on {sys.platform}")

    if result != 0:
        error_number = ctypes.get_errno()
        raise OSError(error_number, os.strerror(error_number))


if __name__ == "__main__":
    if len(sys.argv) != 3:
        raise SystemExit("usage: atomic-swap.py LEFT RIGHT")
    swap(sys.argv[1], sys.argv[2])
