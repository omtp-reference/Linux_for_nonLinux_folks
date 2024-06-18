### Table of Contents

- [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Install Firefox](#install-firefox)
  - [Install LibreWolf](#install-librewolf)
  - [Install Vivaldi](#install-vivaldi)
  - [Install Slack](#install-slack)
  - [Install Discord](#install-discord)
  - [Install Todoist](#install-todoist)
  - [Install MarkText editor](#install-marktext-editor)
  - [Install Strawberry Music Player](#install-strawberry-music-player)
  - [Install Nicotine](#install-nicotine)
  - [Install Zoom](#install-zoom)
  - [Install VLC](#install-vlc)

---

##### Introduction

In this modern era, many things have changed when it comes to application packaging in Linux. On the Debian/Ubuntu side we've seen dpkg grow into gdebi and then be "replaced" by apt-get (later shortened to apt). They're all still around at some level, but modern apps like to use "sandboxing" and therefore use package schemas like snap or flatpak. Elementary OS 7 (Horus) went a step further by making nearly all of it's base apps into flatpaks. As an old neckbeard I prefer the old ways a bit more and therefore my order of preference for these will always be `Apt<DEB<AppImage<Flatpak<Snap`. My own security conscious brain and the trust/distrust earned by these methods dictates this order. See [Package Management](./package-management.md) for more information about `apt`.

back to [top](#table-of-contents)

---

##### Install Firefox

First remove the snap version if it is installed and add the Mozilla PPA so you can get the real Firefox package.

```bash
sudo snap remove firefox
sudo add-apt-repository ppa:mozillateam/ppa
```

Next, alter the Firefox package priority to ensure the PPA/deb/apt version of Firefox is preferred.

```bash
echo '
Package: firefox*
Pin: release o=LP-PPA-mozillateam
Pin-Priority: 501
' | sudo tee /etc/apt/preferences.d/mozillateamppa
```

Now update your sources and install Firefox normally.

```bash
sudo apt-get update
sudo apt install firefox
```

back to [top](#table-of-contents)

---

##### Install LibreWolf

LibreWolf is a custom version of Firefox, focused on privacy, security and freedom.
[LibreWolf](https://librewolf.net/)

```bash
sudo apt update && sudo apt install -y wget gnupg lsb-release apt-transport-https ca-certificates

distro=$(if echo " una bookworm vanessa focal jammy bullseye vera uma " | grep -q " $(lsb_release -sc) "; then lsb_release -sc; else echo focal; fi)

wget -O- https://deb.librewolf.net/keyring.gpg | sudo gpg --dearmor -o /usr/share/keyrings/librewolf.gpg

sudo tee /etc/apt/sources.list.d/librewolf.sources << EOF > /dev/null
Types: deb
URIs: https://deb.librewolf.net
Suites: $distro
Components: main
Architectures: amd64
Signed-By: /usr/share/keyrings/librewolf.gpg
EOF

sudo apt update

sudo apt install librewolf -y
```

back to [top](#table-of-contents)

---

##### Install Vivaldi

```bash
cd ~/Downloads
wget -c https://downloads.vivaldi.com/stable/vivaldi-stable_5.7.2921.68-1_amd64.deb
sudo gdebi vivaldi-stable_5.7.2921.68-1_amd64.deb
```

back to [top](#table-of-contents)

---

##### Install Slack

Download the latest Slack 64-bit `.deb` from https://slack.com/downloads/linux

Open the file with `sudo gdebi <appname>` to install.

back to [top](#table-of-contents)

---

##### Install Discord

Download the latest Discord 64-bit `.deb` from https://discord.com/api/download?platform=linux&format=deb

Open the file with `sudo gdebi <appname>` to install.

back to [top](#table-of-contents)

---

##### Install Todoist

Todoist is currently only available as an AppImage.

```bash
cd ~/Downloads
wget -c https://electron-dl.todoist.com/linux/Todoist-1.0.0.AppImage
```

In your file manager right-click on the Todoist AppImage file and choose the `Open with AppImageLauncher` option -- in the modal dialog that pops up choose the `Integrate and Run` option to install and then launch Todoist.

back to [top](#table-of-contents)

---

##### Install MarkText editor

```bash
cd /Downloads
wget -c https://github.com/marktext/marktext/releases/download/v0.17.1/marktext-amd64.deb
sudo gdebi marktext-amd64.deb
```

back to [top](#table-of-contents)

---

##### Install Strawberry Music Player

```bash
sudo add-apt-repository ppa:jonaski/strawberry
sudo apt update
sudo apt install strawberry
```

back to [top](#table-of-contents)

---

##### Install Nicotine

Nicotine+ is a SoulSeek client for linux.

There is a `.deb` package available [here](https://github.com/nicotine-plus/nicotine-plus/releases/latest/download/debian-package.zip) but for a proper install that can update if a new client comes out this is the way.

```bash
sudo apt install software-properties-common
sudo add-apt-repository ppa:nicotine-team/stable
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 6CEB6050A30E5769
sudo apt update
sudo apt install nicotine
```

back to [top](#table-of-contents)

---

##### Install Zoom

```bash
cd ~/Downloads
wget -c https://zoom.us/client/5.14.2.2046/zoom_amd64.deb
sudo gdebi zoom_amd64.deb
```

back to [top](#table-of-contents)

---

##### Install VLC

```bash
sudo apt install vlc
# add libdvdcss support
sudo apt install libdvd-pkg
sudo dpkg-reconfigure libdvd-pkg
```

back to [top](#table-of-contents)
