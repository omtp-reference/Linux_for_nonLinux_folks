## Gentoo Derivatives

Gentoo has a small but notable family of related distributions, and one very famous
distant relative you almost certainly already use.

---

## Funtoo

**Funtoo** is a Gentoo fork created by **Daniel Robbins** — the original creator of Gentoo
himself. After stepping back from Gentoo's governance, Robbins started Funtoo with the goal
of improving on Gentoo in a few specific ways:

- Faster sync via Git (rather than Gentoo's rsync-based tree)
- Better out-of-the-box defaults for desktop use
- Some built-in opinionated decisions to reduce the configuration burden

From a practical standpoint, Funtoo is very similar to Gentoo — it uses Portage and `emerge`,
the same USE flag system, and the same source-compilation model. If you know Gentoo, you know
Funtoo.

[funtoo.org](https://www.funtoo.org)

---

## ChromeOS — Gentoo's Most Famous Offspring

The most widely used Gentoo derivative is one you've almost certainly encountered:
**Google's ChromeOS**, the operating system that runs on every Chromebook.

ChromeOS uses **Portage** (Gentoo's package system) under the hood for its build system,
and the underlying OS is heavily derived from Gentoo. You won't be running `emerge` on a
Chromebook in normal use — the ChromeOS shell is locked down — but the heritage is real.

If you use a Chromebook with **Linux (Crostini)** enabled, you get a Debian container
inside ChromeOS for development work.

---

## Sabayon (Historical)

Sabayon was a user-friendly Gentoo derivative that aimed to provide pre-compiled binaries
for common software while still allowing Portage under the hood. It was discontinued in 2021. If you encounter references to it, that's the context.
