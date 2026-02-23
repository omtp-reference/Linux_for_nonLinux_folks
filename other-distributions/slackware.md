## Slackware

Slackware is the **oldest Linux distribution still in active development**, first released
in 1993 by Patrick Volkerding. It predates the Debian and Red Hat families. Many distributions
(including early versions of SUSE) were originally built on top of it.

It has changed remarkably little in 30 years. That's a feature, not a bug.

---

## The Philosophy

Where Debian and Red Hat aim to be user-friendly and Arch aims for minimalism with good
tooling, Slackware aims for something different: **Unix-like simplicity and stability**,
even at the cost of convenience.

The most immediately noticeable consequence: **Slackware's package manager does not
handle dependencies automatically.** You install what you want, you track what it needs,
and if something is missing, the error message tells you. You then go find and install
that missing thing yourself.

To experienced Unix administrators, this is fine — they know their systems and they know
what they're installing. To everyone else, it feels like the installer is being hostile.
It's not. It just respects your ability to figure it out.

---

## Who Uses Slackware

Slackware users tend to be long-time Linux/Unix veterans who:

- Value the "closest to Unix" experience available in a mainstream distro
- Have been using it since the 90s and see no reason to change
- Work in environments where predictability over decades matters more than new features
- Are deeply suspicious of package managers that make decisions for them

If you're helping someone who uses Slackware, they have almost certainly been using
Linux longer than you have. Act accordingly.

---

## pkgtool — The Package System

Slackware uses a simple set of package management tools:

```bash
# Install a pre-built Slackware package (.tgz or .txz)
sudo installpkg package-name.tgz

# Remove an installed package
sudo removepkg package-name

# Upgrade an existing package
sudo upgradepkg package-name.tgz

# List all installed packages
ls /var/log/packages/

# Find what package a file belongs to
grep -r "/path/to/file" /var/log/packages/
```

There are no official dependency-resolving tools in base Slackware. Community tools like
**slackpkg** (for official repo updates) and **sbopkg** (for SlackBuild scripts from
[SlackBuilds.org](https://slackbuilds.org)) fill this gap somewhat:

```bash
# slackpkg — update/install from official Slackware mirrors
sudo slackpkg update
sudo slackpkg upgrade-all
sudo slackpkg install <package>

# sbopkg — install software built from SlackBuilds.org scripts
sudo sbopkg -i <package>
```

---

## SlackBuilds.org

[SlackBuilds.org](https://slackbuilds.org) is Slackware's equivalent of the AUR — a
community-maintained collection of build scripts for thousands of packages not in the
official Slackware repos. Unlike the AUR, these are build scripts, not binary packages,
so you compile them locally.

---

## The Honest Take

If your Slackware-using friend has a problem, the [Slackware Documentation Project](https://docs.slackware.com)
and the [LinuxQuestions.org Slackware forum](https://www.linuxquestions.org/questions/slackware-14/)
are the go-to resources. The community is small but experienced and surprisingly helpful.
