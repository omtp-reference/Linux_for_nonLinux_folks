## Slackware Derivatives

Slackware's age and simplicity have inspired a number of spin-offs, most of which add
the dependency management and user-friendliness that base Slackware deliberately omits.

---

## Salix OS

**Salix** is the most actively maintained Slackware derivative, built with one key
philosophy: **one application per task**. It ships with a minimal, curated set of
applications and avoids the "install everything" approach of some distributions.

The major improvement over base Slackware is proper dependency resolution — Salix's
package manager `slapt-get` handles dependencies automatically.

```bash
# Update the package list
sudo slapt-get --update

# Install a package (with dependency resolution)
sudo slapt-get --install <package>

# Upgrade all installed packages
sudo slapt-get --upgrade

# Search for a package
slapt-get --search <term>
```

Salix also includes **GSlapt**, a graphical front-end for those who prefer not to use
the terminal. It fully compatible with Slackware packages and SlackBuilds.

[salixos.org](https://www.salixos.org)

---

## Porteus

**Porteus** is a fast, portable Slackware derivative designed to run from a USB drive
or other removable media. It's small (under 300MB), boots quickly, and is modular —
you can add and remove software components without reinstalling.

It's not really meant to be installed to a hard drive as a primary system. It shines as:

- A bootable live environment for system recovery
- A portable OS you carry with you on a USB stick
- A lightweight system for older hardware

[porteus.org](http://www.porteus.org)

---

## A Note on Slackware's Influence

Many historically important distributions trace their lineage to Slackware, including
early versions of **SUSE** (which started as a German adaptation of Slackware before
becoming its own thing). Its influence on the Linux ecosystem is larger than its current
user base suggests.
