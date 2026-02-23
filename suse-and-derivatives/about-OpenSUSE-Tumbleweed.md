## OpenSUSE Tumbleweed

OpenSUSE Tumbleweed is a **rolling-release** distribution. There are no version numbers
to speak of — instead of waiting for the next annual release to get new software, packages
are updated continuously as upstream projects release them. You're always running the
current version of everything.

This sounds appealing (and it often is), but it comes with a tradeoff: occasionally an
update breaks something. SUSE has a trick up its sleeve to make this much less painful
than it sounds.

---

## Who Should Use Tumbleweed?

- You want the latest kernel, desktop environment, and application versions
- You're comfortable troubleshooting the occasional hiccup
- You'd rather have new features today than wait for the next annual release
- You're a developer who needs recent libraries and toolchains

If you want a "set it and forget it" SUSE experience, [Leap](about-OpenSUSE-Leap.md) is
the better choice.

---

## The Superpower: Snapshots with Btrfs + Snapper

Tumbleweed ships with the **Btrfs** filesystem and the **Snapper** tool pre-configured
by default. Every time you install or update packages, Snapper automatically takes a
snapshot of your system's state before and after.

If an update breaks your system, you can **boot into the previous snapshot** directly from
the boot menu and roll back — no reinstallation needed.

```bash
# List your current snapshots
snapper list

# Create a manual snapshot (useful before making big changes)
sudo snapper create --description "before big update"

# Roll back to a previous snapshot (replace N with the snapshot number)
sudo snapper rollback N
sudo reboot
```

This is one of the best safety nets in Linux. It turns "rolling release" from a gamble
into a calculated risk you can always undo.

---

## zypper — Same Commands as Leap

The package manager is identical to Leap. See the [Leap page](about-OpenSUSE-Leap.md)
for the full command reference.

```bash
sudo zypper ref && sudo zypper update  # the standard "update everything" command
```

Tumbleweed users tend to run this frequently — daily or every few days — to stay current.

---

## YaST

Same as Leap — YaST is available and covers all the same system administration tasks.
See the [Leap page](about-OpenSUSE-Leap.md) for details.

---

## Checking Your Version

```bash
cat /etc/os-release
# PRETTY_NAME="openSUSE Tumbleweed"
# Note: no version number — that's the point
```
