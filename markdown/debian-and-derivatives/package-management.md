# Package Management

## Table of Contents

- [Package Management](#package-management)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Apt (formerly known as apt-get)](#apt-formerly-known-as-apt-get)
    - [Enabling the ability to install from .deb files](#enabling-the-ability-to-install-from-deb-files)
    - [Enabling the ability to install from PPA repositories](#enabling-the-ability-to-install-from-ppa-repositories)
    - [Enabling the ability to install from AppImage files](#enabling-the-ability-to-install-from-appimage-files)
  - [### Tweaks and Fixes](#-tweaks-and-fixes)

---

## Introduction

In this modern era, many things have changed when it comes to application packaging in Linux. On the Debian/Ubuntu side we've seen dpkg grow into gdebi and then be "replaced" by apt-get (later shortened to apt). They're all still around at some level, but modern apps like to use "sandboxing" and therefore use package schemas like snap or flatpak. Elementary OS 7 (Horus) went a step further by making nearly all of it's base apps into flatpaks. As an old neckbeard I prefer the old ways a bit more and therefore my order of preference for these will always be `Apt<DEB<AppImage<Flatpak<Snap`. My own security conscious brain and the trust/distrust earned by these methods dictates this order.

back to [top](#table-of-contents)

---

## Apt (formerly known as apt-get)

In the Debian/Ubuntu family, `apt` is currently the package manager that comes installed with your distribution. It is a descendent of `dpkg`; which is still available, and useful to boot when apt just doesn't have the toolset to do the job.

Apt can install standard `.deb` packages, `snaps`, and packages from either the standard repositories or third-party `PPAs`.

back to [top](#table-of-contents)

---

### Enabling the ability to install from .deb files

```bash
sudo apt install gdebi-core gdebi
```

Now you can either open a `.deb` file with the gdebi GUI from the right-click menu in your file browser, or use `sudo gdebi <filename.deb>` in a terminal window.

back to [top](#table-of-contents)

---

### Enabling the ability to install from PPA repositories

To install install files from a PPA repository, we need to ensure a few additional apt tools are installed.

```bash
sudo apt install software-properties-common
```

Once this is done, you need to add the PPA repository to your available sources. For this example I will use the Pantheon-Tweaks PPA as it is useful for my current `Elementary OS 7` desktop.

```bash
sudo add-apt-repository -y ppa:philip.scott/pantheon-tweaks
```

***NOTE: **If this command fails, disable ipv6 on your network connection.*

Then we can update our sources and install.

```bash
sudo apt update
sudo apt install -y pantheon-tweaks
```

---

### Enabling the ability to install from AppImage files

First, make sure `AppImageLauncher Settings` isn't already in your Applications menu; if it isyou already can use AppImage files as intended.

```bash
sudo add-apt-repository ppa:appimagelauncher-team/stable
sudo apt update
sudo apt install appimagelauncher
```

Now continue on to download and install the AppImage file as you have been instructed.

back to [top](#table-of-contents)

---

## ### Tweaks and Fixes

Issue - 

Issue - What does this apt error message ("Download is performed unsandboxed as root...") mean?

```bash
W: Download is performed unsandboxed as root as file '/var/cache/apt/archives/partial/samba-libs_2%3a4.5.8+dfsg-0ubuntu0.17.04.1_i386.deb' couldn't be accessed by user '_apt'. - pkgAcquire::Run (13: Permission denied)
```

The fix

```bash
sudo chown -Rv _apt:root /var/cache/apt/archives/partial/
sudo chmod -Rv 700 /var/cache/apt/archives/partial/
```

back to [top](#table-of-contents)
