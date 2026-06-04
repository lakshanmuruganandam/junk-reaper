<div align="center">

# 🗑️ Junk Reaper

> **Interactively hunts down and obliterates hidden `.DS_Store` and `.log` files across your project.**

[![npm version](https://badge.fury.io/js/junk-reaper.svg)](https://www.npmjs.com/package/junk-reaper)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

```text
    ██╗██╗   ██╗███╗   ██╗██╗  ██╗
    ██║██║   ██║████╗  ██║██║ ██╔╝
    ██║██║   ██║██╔██╗ ██║█████╔╝ 
    ██║██║   ██║██║╚██╗██║██╔═██╗ 
    ██║╚██████╔╝██║ ╚████║██║  ██╗
    ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝
    ██████╗ ███████╗ █████╗ ██████╗ ███████╗██████╗ 
    ██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔════╝██╔══██╗
    ██████╔╝█████╗  ███████║██████╔╝█████╗  ██████╔╝
    ██╔══██╗██╔══╝  ██╔══██║██╔═══╝ ██╔══╝  ██╔══██╗
    ██║  ██║███████╗██║  ██║██║     ███████╗██║  ██║
    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝
```

Are you tired of macOS constantly polluting your pristine repositories with hidden `.DS_Store` files? Do you have megabytes of random `debug.log` files scattered across folders?

**Junk Reaper** is an interactive, highly-visual CLI that recursively sweeps your entire codebase (safely ignoring `node_modules` and `.git`), finds all the hidden garbage files, calculates how much space they are wasting, and lets you mass-delete them instantly.

## ✨ Features

- **🔍 Smart Scanning:** Uses `fast-glob` to rip through massive directories in milliseconds without getting bogged down by `node_modules`.
- **⚡ Mass Deletion:** Interactively select as many junk files as you want using the Spacebar, or press `a` to select them all.
- **🛡️ Secure:** Requires a final confirmation before permanently obliterating the files using `fs.unlinkSync`.
- **🎨 Premium UX:** Built with `inquirer` for a buttery-smooth terminal experience, complete with custom ASCII art.

## 🚀 Installation

Run it instantly anywhere without installing:

```bash
npx junk-reaper
```

Or install it globally to keep your projects clean forever:

```bash
npm install -g junk-reaper
```

## 🎮 Usage

Run the command inside any directory:

```bash
junk-reaper
```

### Controls:
- **`↑ / ↓`** : Navigate the list of discovered junk files.
- **`Space`** : Select files to delete.
- **`a`** : Select ALL files to do a full sweep.
- **`Enter`** : Proceed to obliteration.

---

### Architected by [@lakshanmuruganandam](https://github.com/lakshanmuruganandam)
*Death to `.DS_Store`.*
