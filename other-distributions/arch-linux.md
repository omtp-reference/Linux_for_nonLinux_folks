## Arch Linux

Arch Linux is a rolling-release distribution built around a single philosophy: **simplicity
and user control**. Where most distros hold your hand through installation with a graphical
wizard, Arch starts you at a command prompt and expects you to build your system from scratch.

This isn't a bug. It's the entire point. Arch users know their system inside and out because
they assembled it themselves.

---

## Who Uses Arch (And Why They're Like That)

The Arch user base skews toward developers, power users, and people who genuinely enjoy
understanding how Linux works beneath the surface. The "btw I use Arch" meme exists for a
reason — there's a culture of pride around it, because it does take real knowledge to set
up and maintain.

Your friend who uses Arch probably:

- Has a strong opinion about their desktop environment, window manager, and every other
  component of their system because they chose each one intentionally
- Updates their system frequently (it's a rolling release — you have to)
- Is perfectly capable of fixing their own problems most of the time

When they do ask for help, they usually just need a second pair of eyes.

---

## pacman — The Package Manager

Arch uses **pacman** (Package Manager). The syntax is different from apt or dnf but the
concepts are the same.

```bash
# Update the package database and upgrade all packages
sudo pacman -Syu

# Install a package
sudo pacman -S <package-name>

# Remove a package (and its dependencies no longer needed)
sudo pacman -Rs <package-name>

# Search for a package
pacman -Ss <search-term>

# Show information about a package
pacman -Si <package-name>

# List installed packages
pacman -Q

# Find which package owns a file
pacman -Qo /path/to/file
```

---

## The AUR — Arch User Repository

Beyond the official Arch repos, there's the **AUR (Arch User Repository)** — a massive
community-maintained collection of package build scripts. If software exists for Linux,
it's probably in the AUR.

You don't use `pacman` directly to install AUR packages. Instead, you use an **AUR helper**
like `yay` or `paru`:

```bash
# Install yay (a popular AUR helper) — first time only
sudo pacman -S --needed git base-devel
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si

# After that, yay works just like pacman for both official repos and AUR
yay -S <package-name>        # install from AUR or official repos
yay -Syu                     # update everything (AUR included)
```

> **Note:** AUR packages are built from source by the community. They're not vetted by
> Arch maintainers. Always look at the PKGBUILD before installing from an unfamiliar source.

---

## The Wiki

If you ever need to figure something out on Arch (or any Linux for that matter), the
[Arch Wiki](https://wiki.archlinux.org) is one of the best technical resources in the
entire Linux ecosystem. Its documentation is so thorough that it's frequently useful even
on non-Arch systems.

---

## Common Arch Survival Commands

```bash
# "Something broke after an update" — check recent news first
# Browse https://archlinux.org/news/ before a major update

# Fix a partial upgrade (don't do partial upgrades on Arch)
sudo pacman -Syu  # always upgrade everything together

# Find and reinstall a corrupted package
sudo pacman -S <package-name>

# Clear the package cache (frees disk space)
sudo pacman -Sc
```
