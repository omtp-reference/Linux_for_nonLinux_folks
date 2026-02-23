## Gentoo

Gentoo is a **source-based** Linux distribution — which means when you install software,
you're compiling it from source code on your own machine rather than downloading pre-compiled
binaries. Every package is built with exactly the USE flags (feature toggles) you specify,
optimized for your hardware.

This takes a very long time. Deliberately. That's the point.

---

## Who Uses Gentoo (And Why)

Gentoo users are a specific breed. They value:

- **Maximum control** — every software feature is opt-in or opt-out at compile time
- **Deep understanding** — the process of setting up Gentoo teaches you more about how
  Linux actually works than almost any other path
- **Performance** — binaries compiled specifically for your CPU architecture with the
  features you actually want
- **Ideology** — some Gentoo users simply value the pure source-code approach

**This is not a beginner distribution.** The official installation guide is long, detailed,
and requires you to understand what you're doing at every step. It is, however, one of
the best educational experiences Linux has to offer if you're willing to invest the time.

---

## Portage and emerge — The Package System

Gentoo uses **Portage** as its package management system, and `emerge` as the command to
interact with it.

```bash
# Sync the portage tree (update the list of available packages)
sudo emerge --sync

# Install a package
sudo emerge <category/package-name>
# Example:
sudo emerge www-client/firefox

# Uninstall a package
sudo emerge --depclean <package-name>

# Update all installed packages
sudo emerge --update --deep --newuse @world

# Search for a package
emerge --search <term>

# Check what would be installed/changed without doing it
sudo emerge --pretend <package-name>
```

Note the category prefix (`www-client/`, `dev-lang/`, etc.) — Gentoo organizes packages
into categories. You can usually omit the category if the name is unambiguous.

---

## USE Flags

USE flags are the feature flags that control what gets compiled into your packages. They're
set in `/etc/portage/make.conf` and can be set per-package in `/etc/portage/package.use`.

```bash
# Example make.conf USE flags
USE="pulseaudio X gtk -kde -qt5"
# The - prefix disables a flag
```

Changing USE flags and then updating your system will recompile affected packages.
This is normal. It takes a while. Get comfortable with that.

---

## The Honest Take

If your friend uses Gentoo, they are almost certainly more capable of solving their own
problems than you are of diagnosing them remotely. What they often want is a sounding board
rather than a solution. The [Gentoo Wiki](https://wiki.gentoo.org) and
[Gentoo Handbook](https://wiki.gentoo.org/wiki/Handbook:Main_Page) are both exceptional
resources and are almost always the right place to start.
