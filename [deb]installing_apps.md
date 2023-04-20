##### Installing Firefox (not a Snap)

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

##### Install Vivaldi

```bash
cd ~/Downloads
wget -c https://downloads.vivaldi.com/stable/vivaldi-stable_5.7.2921.68-1_amd64.deb
sudo gdebi vivaldi-stable_5.7.2921.68-1_amd64.deb
```

##### Install Slack

Download the latest Slack 64-bit `.deb` from https://slack.com/downloads/linux

Open the file with `sudo gdebi <appname>` to install.

##### Install Discord

Download the latest Discord 64-bit `.deb` from https://discord.com/api/download?platform=linux&format=deb

Open the file with `sudo gdebi <appname>` to install.

##### Install Todoist (AppImage}

First make sure `AppImageLauncher Settings` is in your Applications menu; if it isn't install it before  installing Todoist.

```bash
sudo add-apt-repository ppa:appimagelauncher-team/stable
sudo apt update
sudo apt install appimagelauncher
```

Now continue on to download and install Todoist.

```bash
cd ~/Downloads
wget -c https://electron-dl.todoist.com/linux/Todoist-1.0.0.AppImage
```

In your file manager right-click on the Todoist AppImage file and choose the `Open with AppImageLauncher` option -- in the modal dialog that pops up choose the `Integrate and Run` option to install and then launch Todoist.

##### Install MarkText editor

```bash
cd /Downloads
wget -c https://github.com/marktext/marktext/releases/download/v0.17.1/marktext-amd64.deb
sudo gdebi marktext-amd64.deb
```

##### Install Strawberry Music Player

```bash
sudo add-apt-repository ppa:jonaski/strawberry
sudo apt update
sudo apt install strawberry
```

##### Install Nicotine+ (SoulSeek client)

There is a `.deb` package available [here](https://github.com/nicotine-plus/nicotine-plus/releases/latest/download/debian-package.zip) but for a proper install that can update if a new client comes out this is the way.

```bash
sudo apt install software-properties-common
sudo add-apt-repository ppa:nicotine-team/stable
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 6CEB6050A30E5769
sudo apt update
sudo apt install nicotine
```

##### Install Zoom

```bash
cd ~/Downloads
wget -c https://zoom.us/client/5.14.2.2046/zoom_amd64.deb
sudo gdebi zoom_amd64.deb
```

##### Install VLC

```bash
sudo apt install vlc
# add libdvdcss support
sudo apt install libdvd-pkg
sudo dpkg-reconfigure libdvd-pkg
```
