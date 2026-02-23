## Initial Fedora Workstation Setup

_current as of Fedora 41_

---

## Table of Contents

- [During Install](#during-install)
  - [Drive Partitioning](#drive-partitioning)
- [After Install](#after-install)
  - [DNF5 — Fedora's Package Manager](#dnf5--fedoras-package-manager)
  - [Additional Repositories](#additional-repositories)
  - [Nvidia Drivers](#nvidia-drivers)
  - [Desktop Environments](#desktop-environments)
  - [Useful Package Groups](#useful-package-groups)
  - [Important Single Packages](#important-single-packages)
  - [Flatpak Support](#flatpak-support)
  - [Snap Support](#snap-support)
  - [Fonts](#fonts)
  - [SSH Keys](#ssh-keys)
  - [Git and Version Control](#git-and-version-control)
  - [Various Applications](#various-applications)
  - [Multimedia](#multimedia)
  - [Gaming](#gaming)
- [Advanced: Hardware Security Key Setup](#advanced-hardware-security-key-setup)

---

## During Install

### Drive Partitioning

Fedora's installer (Anaconda) will handle partitioning for you if you let it, and for most
people that's fine. If you want more control, here's a layout that works well:

```
mountpoint | suggested size | format | notes
-----------------------------------------------------------------
/boot      |  1-2 GB        | ext4   | bootloader lives here
/boot/efi  |  512 MB-1 GB  | fat32  | required for UEFI systems
swap       | equal to RAM   | swap   | or use a swapfile instead
/          |  50+ GB        | ext4   | your root filesystem
/home      |  remainder     | ext4   | your personal files
```

> **Recommendation: put `/home` on a separate physical drive if you have one.**
>
> This is the single best thing you can do for your Linux setup. When you reinstall,
> upgrade, or even nuke the OS by accident, your personal files, configs, and data
> survive completely untouched. Just tell the installer to mount your existing drive
> at `/home` without formatting it. This turns a disaster into a 20-minute inconvenience.
>
> If you only have one drive, at minimum make `/home` its own partition rather than
> lumping it in with `/`.

---

## After Install

### DNF5 — Fedora's Package Manager

Fedora 41 ships with **DNF5** as the default package manager — a complete rewrite of
the older DNF that's significantly faster. The commands you'd find in older guides still
work (backward compatibility is maintained), so don't panic if something says `dnf install`
instead of `dnf5 install` — they're the same.

**Quick reference:**

```bash
sudo dnf install <package>   # install a package
sudo dnf remove <package>    # remove a package
sudo dnf update              # update all packages
sudo dnf search <term>       # search available packages
sudo dnf info <package>      # show details about a package
sudo dnf list installed      # list installed packages
```

**First thing to do after install — update everything:**

```bash
sudo dnf upgrade --refresh
sudo dnf update -y
```

**Tune DNF5 for faster downloads:**

```bash
echo 'max_parallel_downloads=10' | sudo tee -a /etc/dnf/dnf.conf
echo 'fastestmirror=1' | sudo tee -a /etc/dnf/dnf.conf
cat /etc/dnf/dnf.conf  # verify your changes
```

**Set your hostname** (replace `your-hostname` with whatever you want to call your machine):

```bash
hostnamectl set-hostname your-hostname
```

---

### Additional Repositories

Out of the box, Fedora only includes fully open-source packages. For proprietary software,
drivers, and media codecs, you'll want **RPM Fusion** — the community-maintained repo
that fills the gaps.

```bash
# Install both the free (open-source) and nonfree (proprietary) repos
sudo dnf install -y \
  https://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm \
  https://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm

# Enable testing repos to get the freshest updates
sudo dnf config-manager --set-enabled rpmfusion-free-updates-testing
sudo dnf config-manager --set-enabled rpmfusion-nonfree-updates-testing

# Update and pull in the core multimedia group
sudo dnf upgrade --refresh
sudo dnf groupupdate core
sudo dnf install -y rpmfusion-free-release-tainted
sudo dnf install -y dnf-plugins-core
```

To see what package groups are available (there are good ones):

```bash
sudo dnf grouplist -v
```

---

### Nvidia Drivers

Fedora 41 supports Nvidia driver installation directly through RPM Fusion, and it now works
with UEFI Secure Boot enabled. No more fighting with COPR workarounds.

```bash
# Make sure your system is fully updated first — this matters
sudo dnf upgrade --refresh

# Install the akmod (kernel module) driver from RPM Fusion nonfree
sudo dnf install akmod-nvidia

# For CUDA support (machine learning, GPU computing, video encoding)
sudo dnf install xorg-x11-drv-nvidia-cuda

# Reboot to load the new kernel module
sudo reboot
```

> **Note:** After rebooting, give the system a minute or two before expecting
> accelerated graphics — the `akmod` process compiles the kernel module on first boot.
> If you reboot immediately after the install completes and things look wrong, wait
> 2-3 minutes and reboot again.

For AMD GPUs, the open-source driver is included in the kernel — no extra steps needed.

---

### Desktop Environments

Fedora Workstation ships with GNOME, but you're not stuck with it. Install any of these:

```bash
# Cinnamon — great choice if you're coming from Windows
sudo dnf groupinstall "Cinnamon Desktop"

# MATE — lightweight, traditional two-panel layout
sudo dnf groupinstall "MATE Desktop" --with-optional "MATE Applications"

# KDE Plasma — feature-rich, highly configurable
sudo dnf groupinstall "KDE Plasma Workspaces"

# Xfce — lightweight and fast
sudo dnf groupinstall "Xfce Desktop"
```

After installing, log out and select your new desktop from the login screen's session menu.

---

### Useful Package Groups

```bash
# Development tools and creative software
sudo dnf groupinstall "Development and Creative Workstation"

# Office productivity suite (includes LibreOffice)
sudo dnf groupinstall "Office/Productivity"

# 3D printing tools
sudo dnf groupinstall "3D Printing"
```

---

### Important Single Packages

```bash
# Container and virtualization tools
sudo dnf install docker-compose

# Utilities that are suspiciously absent by default
sudo dnf install cabextract p7zip p7zip-plugins

# A proper terminal text editor
sudo dnf install vim-enhanced

# USB webcam utilities
sudo dnf install v4l-utils v4l2ucp
```

---

### Flatpak Support

Flatpak is the recommended way to install desktop apps on Fedora — it's sandboxed, distro-
agnostic, and Flathub has almost everything.

```bash
# Add Flathub (the main Flatpak app store)
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo

# Add the beta channel (for cutting-edge versions of some apps)
flatpak remote-add --if-not-exists flathub-beta https://flathub.org/beta-repo/flathub-beta.flatpakrepo

# Keep Flatpak apps up to date
flatpak update
```

---

### Snap Support

Snap is Canonical's (Ubuntu's maker) packaging format. It works on Fedora, though Flatpak
is generally preferred here. Enable it if you need something that's only available as a snap.

```bash
sudo dnf install -y snapd
sudo ln -s /var/lib/snapd/snap /snap  # enables "classic" confinement mode

# Restart — snap needs the new paths to be active
sudo reboot
```

After reboot:

```bash
sudo snap refresh
sudo snap install snap-store  # optional: graphical snap browser
```

---

### Fonts

```bash
# Google's Roboto font family
sudo dnf install -y google-roboto*

# Microsoft core fonts (for compatibility when someone sends you a .docx)
sudo dnf install -y curl cabextract xorg-x11-font-utils fontconfig
sudo rpm -i https://downloads.sourceforge.net/project/mscorefonts2/rpms/msttcore-fonts-installer-2.6-1.noarch.rpm
```

---

### SSH Keys

Generate a key pair for authenticating to servers, GitHub, etc. Ed25519 is the modern
algorithm — smaller and faster than RSA.

```bash
# Generate a new key (replace the comment with something meaningful to you)
ssh-keygen -t ed25519 -C "fedora-workstation"

# Load the key into the SSH agent for this session
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Print your public key so you can paste it into GitHub, servers, etc.
cat ~/.ssh/id_ed25519.pub
```

---

### Git and Version Control

```bash
# Git and Git LFS (for large file support)
sudo dnf install -y git git-lfs
git-lfs install

# Configure your identity
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

---

### Various Applications

#### DaVinci Resolve

DaVinci Resolve has a free version for Linux that's genuinely excellent for video editing.

1. Visit [blackmagicdesign.com/products/davinciresolve](https://www.blackmagicdesign.com/products/davinciresolve)
2. Choose the current free **Linux** version from the selector
3. Fill out the (required) registration form and download the `.zip` archive
4. Extract and run the installer:

```bash
unzip DaVinci_Resolve_*.zip
sudo chmod +x DaVinci_Resolve_*.run
sudo ./DaVinci_Resolve_*.run -i
```

#### Discord

Multiple ways to install — pick one:

```bash
# Flatpak (recommended)
flatpak install flathub com.discordapp.Discord

# RPM Fusion
sudo dnf install discord

# Snap
sudo snap install discord --edge
sudo snap connect discord:system-observe
```

#### Dropbox

```bash
sudo dnf install -y dropbox nautilus-dropbox
```

#### Sublime Text

```bash
# Add the GPG key
sudo rpm -v --import https://download.sublimetext.com/sublimehq-rpm-pub.gpg

# Add the stable repo
sudo dnf config-manager --add-repo https://download.sublimetext.com/rpm/stable/x86_64/sublime-text.repo

# Install
sudo dnf install sublime-text
```

#### Sublime Merge (Git GUI)

```bash
# Uses the same repo as Sublime Text — if you added it above, just install:
sudo dnf install sublime-merge
```

#### Vivaldi Browser

```bash
sudo dnf install -y dnf-utils
sudo dnf config-manager --add-repo https://repo.vivaldi.com/archive/vivaldi-fedora.repo
sudo dnf install -y vivaldi-stable
```

#### Zoom

```bash
# Download the current RPM from Zoom's site
wget https://zoom.us/client/latest/zoom_x86_64.rpm
sudo dnf localinstall zoom_x86_64.rpm
```

---

### Multimedia

#### VLC

```bash
sudo dnf install -y vlc
```

#### Multimedia Codecs

For full codec support (H.264, AAC, MP3, DVD playback, etc.):

```bash
sudo dnf groupupdate sound-and-video
sudo dnf install -y libdvdcss
sudo dnf install -y gstreamer1-plugins-{bad-\*,good-\*,ugly-\*,base} gstreamer1-libav \
  --exclude=gstreamer1-plugins-bad-free-devel ffmpeg gstreamer-ffmpeg
sudo dnf install -y lame\* --exclude=lame-devel
sudo dnf group upgrade --with-optional Multimedia
```

For OpenH264 (browser video calls):

```bash
sudo dnf config-manager --set-enabled fedora-cisco-openh264
sudo dnf install -y gstreamer1-plugin-openh264
```

#### OBS Studio

```bash
# Flatpak version includes most popular plugins out of the box
flatpak install flathub com.obsproject.Studio
```

---

### Gaming

```bash
# Steam (via RPM Fusion)
sudo dnf install steam -y

# Heroic Games Launcher (Epic and GOG)
flatpak install flathub com.heroicgameslauncher.hgl

# Lutris (multi-platform game manager)
flatpak install flathub net.lutris.Lutris

# ProtonUp-Qt (manage Proton/Wine versions for Steam and Lutris)
flatpak install flathub net.davidotek.pupgui2
```

---

## Advanced: Hardware Security Key Setup

This section covers setting up a **YubiKey** (or compatible FIDO2/PIV hardware key) for
two-factor authentication on sudo and for GPG key storage. This is beyond what most users
need, but if you care about security, it's worth the effort.

### Required Packages

```bash
sudo dnf install -y yubikey-manager pam-u2f pamu2fcfg
sudo dnf install -y gpg gnupg2 gnupg-pkcs11-scd pcsc-tools opensc pcsc-lite-ccid

# Start and enable the smart card daemon
sudo systemctl start pcscd
sudo systemctl enable pcscd
```

Insert your key and verify it's recognized:

```bash
ykman info
```

If you see `No YubiKey detected`, try `sudo systemctl restart pcscd` — this is a known
quirk and the restart almost always fixes it.

### Two-Factor Authentication for sudo

```bash
sudo authselect select sssd with-pam-u2f-2fa without-nullok
mkdir ~/.config/Yubico

# Register your primary key (touch the metal contact when it flashes)
pamu2fcfg > ~/.config/Yubico/u2f_keys

# Register your backup key on the same line
pamu2fcfg -n >> ~/.config/Yubico/u2f_keys
```

> **IMPORTANT:** Before closing this terminal, open a **new terminal** and verify that
> `sudo echo test` works and prompts for your physical key touch. Do not close the
> original terminal until you've confirmed this — it's your escape hatch if something
> goes wrong.

### GPG Key on YubiKey

If you want to store your private GPG key on the YubiKey's smart card (so the key
never touches your disk):

```bash
# Check that gpg can see the card
gpg --card-status

# If you get "No such device", restart pcscd:
sudo systemctl restart pcscd
```

Refer to the [YubiKey-Guide](https://github.com/drduh/YubiKey-Guide) for the full
process of generating and transferring GPG keys to the card — it's thorough and well-
maintained.
