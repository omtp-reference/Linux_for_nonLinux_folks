## Arch Linux Derivatives

Arch Linux's philosophy is appealing but the installation process is famously daunting.
Several distributions have taken Arch's rolling-release core and added graphical installers,
sensible defaults, and pre-configured desktop environments to make it more approachable.

---

## Manjaro

**Manjaro** is the most popular Arch derivative. It offers:

- A full graphical installer (no command-line required to get a working desktop)
- Pre-configured desktop environments (GNOME, KDE Plasma, and Xfce are the official editions)
- A **slightly delayed** update cycle relative to Arch — packages are held for testing before
  being pushed to users, which catches breaking updates before they hit you

Manjaro uses its own package repositories that mirror Arch but typically lag by 1-2 weeks.
This gives the team time to catch and fix issues before they reach users.

```bash
# Manjaro's package manager is still pacman, but also comes with pamac (graphical)
sudo pacman -Syu          # update everything
pamac update              # same thing via pamac
pamac install <package>   # install via pamac
```

**Manjaro Hardware Detection (MHWD)** is a tool unique to Manjaro that automates
driver installation including Nvidia:

```bash
# List available drivers for your hardware
mhwd -l

# Install a driver (e.g., Nvidia proprietary)
sudo mhwd -i pci video-nvidia
```

---

## EndeavourOS

**EndeavourOS** is much closer to "real" Arch than Manjaro — it uses the actual Arch
repositories directly (so you get packages the same day Arch does), adds a graphical
installer, and includes a small set of helpful utilities and a welcoming community.

If Arch is the deep end and Manjaro is the shallow end, EndeavourOS is the middle of the
pool. Users learn and are expected to understand what they're doing.

The package manager is standard Arch **pacman** and the **yay** AUR helper comes
pre-installed.

---

## Garuda Linux

**Garuda** is an Arch-based distribution with a heavy focus on gaming and aesthetics.
It comes pre-configured with:

- Performance tweaks (including the Zen kernel by default)
- `gamemode` and `mangohud` for gaming optimizations pre-installed
- A visually striking KDE Plasma setup out of the box
- Their own graphical system maintenance tool (Garuda Assistant)

It uses the Arch repos directly (like EndeavourOS) and comes with **paru** as the
AUR helper.

---

## Common Note for All Arch Derivatives

Because these all use Arch as their foundation, the [Arch Wiki](https://wiki.archlinux.org)
applies to all of them. When you hit a problem, search the Arch Wiki first — the answer
is almost certainly there.

The main exception is Manjaro: because of its delayed repos and custom tooling (like MHWD),
check the [Manjaro Wiki](https://wiki.manjaro.org) for Manjaro-specific issues.
