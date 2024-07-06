## Initial Fedora 35 Workstation Setup
_current as of Fedora 35-36_

#### During Install

##### drive partitioning

On Hades: To save the contents of my `/home` folder we don't want to format it and we want to reuse our old partition structure.

```bash
mountpoint | size | format   | reformat | device
---------------------------------------------------------
/boot      |  4Gb | ext4     |    yes   | /dev/nvme0n1p1
/boot/efi  |  2Gb | fat32    |    yes   | /dev/nvme0n1p2
swap       | 64Gb | swap     |    yes   | /dev/nvme0n1p3
/          |  *Gb | ext4     |    yes   | /dev/nvme0n1p4
/home      |  *Tb | LVM/ext4 |     no   | /dev/mapper/hades-home
/var       |  1Tb | LVM/ext4 |    yes   | /dev/mapper/hades-var
/usr       |  1Tb | LVM/ext4 |    yes   | /dev/mapper/hades-usr
```

##### INFO: DNF Shortcuts

```bash
sudo dnf in # install
sudo dnf rm # remove
sudo dnf up # update
sudo dnf grp # group (and can be chained - ie, sudo dnf grp in)
sudo dnf mc # makecache
sudo dnf wp # provides
sudo dnf se # search
sudo dnf ls # list
```

##### DNF Tuning Flags

```bash
echo 'max_parallel_downloads=10' | sudo tee -a /etc/dnf/dnf.conf
echo 'deltarpm=true' | sudo tee -a /etc/dnf/dnf.confb
cat /etc/dnf/dnf.conf
```

#### After Install

````bash
sudo dnf upgrade --refresh
sudo dnf up -y
````

### Set hostname

```bash
# setting the system hostname
hostnamectl set-hostname hades 
```

#### How to enable the `performance` CPU governor on startup?
For Desktops to use performance mode...

```bash
sudo dnf install kernel-tools
```
Edit `/etc/sysconfig/cpupower` as desired. See `man cpupower-frequency-set`.
```bash
sudo systemctl enable --now cpupower.service
```

#### Additional Repositories

```bash
sudo dnf in -y  https://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm
sudo dnf in -y https://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
sudo dnf config-manager --set-enabled rpmfusion-free-updates-testing
sudo dnf config-manager --set-enabled rpmfusion-nonfree-updates-testing
sudo dnf upgrade --refresh
sudo dnf groupupdate core
sudo dnf in -y rpmfusion-free-release-tainted
sudo dnf in -y dnf-plugins-core
```
#### Nvidia Driver

```bash
# first, install the nvautoinstall tool from the copr repo
sudo dnf install dnf-plugins-core -y
sudo dnf copr enable t0xic0der/nvidia-auto-installer-for-fedora -y
sudo dnf install nvautoinstall -y
# now we can install the entire nvidia toolset
sudo nvautoinstall rpmadd
sudo nvautoinstall driver
sudo nvautoinstall ffmpeg
# needed for cuda on Fedora 36
sudo nvautoinstall nvrepo
# to Enable Prime Rendering on Optimus laptop, uncomment the line below
# sudo nvautoinstlal primec
sudo nvautoinstall plcuda
sudo nvautoinstall vidacc
sudo nvautoinstall vulkan
# a reboot ensures the proper kernel mods are being used
sudo reboot now
```

#### DNF Groups I like to install

##### Desktop Environments

```bash
# my favorite DE
sudo dnf groupinstall "Cinnamon Desktop" 
# might as well have a backup DE
sudo dnf groupinstall "MATE Desktop" --with-optional "MATE Applications" 
sudo dnf groupinstall "Xfce Desktop"
```

##### Other Groups

```bash
sudo dnf groupinstall "Development and Creative Workstation" --with-optional "Vagrant with libvirt support" "Cloud Management Tools"
sudo dnf groupinstall "Office/Productivity" --with-optional "dayplanner" "libreoffice-wiki-publisher"
sudo dnf groupinstall "3D Printing" 
```

##### Important Single Packages

```bash
# install Docker and Vagrant's connection to it
sudo dnf in docker-compose docker-distribution vagrant-adbinfo
sudo dnf in cabextract net-snmp-utils p7zip p7zip-plugins procinfo puppet
# install a CLI text editor I am familiar with
sudo dnf in vim-enhanced
```

##### USB Webcam support

```bash
# install v4l-utils package to get some useful utilities for USB webcams
sudo dnf in v4l-utils -y
# install a gui to change UVC camera settings
sudo dnf in v4l2ucp
```

#### Flatpak support

```bash
# make sure the Flatpak repo is installed
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
flatpak install flathub org.gnome.Recipes
# enable the Flatpak beta repo
flatpak remote-add --if-not-exists flathub-beta https://flathub.org/beta-repo/flathub-beta.flatpakrepo
flatpak install flathub-beta org.godotengine.Godot
# make sure Flatpak is up to date
flatpak update
```

#### Snap support
```bash
# install snapd
sudo dnf in -y snapd
sudo ln -s /var/lib/snapd/snap /snap # for classic snap support
# restart to ensure paths are properly updated
sudo reboot now
```
```bash
# refresh the database of available snaps (if it gives an error, rerun the command)
sudo snap refresh
# install the snap store for a clean install gui
sudo snap install snap-store
```

#### Fonts

```bash
# install the entire Google Roboto font family
sudo dnf in -y google-roboto*
```
##### Microsoft Fonts
```bash
# install prerequisites to use Microsoft fonts
sudo dnf in -y curl cabextract xorg-x11-font-utils fontconfig
# install Microsoft fonts for those times you need them
sudo rpm -i https://downloads.sourceforge.net/project/mscorefonts2/rpms/msttcore-fonts-installer-2.6-1.noarch.rpm
```

#### SSH Keys

```bash
# generate a new ssh key
ssh-keygen -t ed25519 -C "fedora-on-hades"
# load the key into ssh-agent
eval "$(ssh-agent -s)" 
ssh-add ~/.ssh/id_ed25519
# don’t forget to add your public key to GitHub, Gitlab, Servers, etc.
```
#### Coding

##### Git related

```bash
sudo dnf in -y git git-lfs
git-lfs install
wget https://release.gitkraken.com/linux/gitkraken-amd64.rpm
sudo dnf in ./gitkraken-amd64.rpm
```

#### Various Applications

##### Davinci Resolve

```bash
# first, visit https://www.blackmagicdesign.com/products/davinciresolve
# choose the current free version of Davinci Resolve for Linux in the selector
# fill out the required information and download the installer archive
# unzip the archive and perform the following steps
sudo cd DaVinci_Resolve_17.4.5_Linux/
sudo chmod +x DaVinci_Resolve_17.4.5_Linux.run
sudo ./DaVinci_Resolve_17.4.5_Linux.run -i
```

##### Discord

```bash
# Snap #
sudo snap install discord --edge
sudo snap connect discord:system-observe

# Flatpak #
flatpak install --from https://flathub.org/repo/appstream/com.discordapp.Discord.flatpakref

# RPM Fusion #
sudo dnf in discord

# Copr #
sudo dnf copr enable tcg/discord
sudo dnf in Discord-installer
```

##### Dropbox

```bash
sudo dnf in -y dropbox nautilus-dropbox
```

##### OneDrive Client

-  https://abraunegg.github.io

##### Sublime Text 3

```bash
# download latest build of Sublime Text 3 (currently build 3211)
# download link -> https://download.sublimetext.com/sublime-text-3211-1.x86_64.rpm
cd Downloads
sudo dnf in -y sublime-text-3211-1.x86_64.rpm
```

##### Sublime Merge

Install the GPG key:

```bash
sudo rpm -v --import https://download.sublimetext.com/sublimehq-rpm-pub.gpg
```

Select the channel to use:

- Stable

  ```bash
  sudo dnf config-manager --add-repo https://download.sublimetext.com/rpm/stable/x86_64/sublime-text.repo
  ```

- Dev

  ```bash
  sudo dnf config-manager --add-repo https://download.sublimetext.com/rpm/dev/x86_64/sublime-text.repo
  ```

Update dnf and install Sublime Merge

```bash
sudo dnf in sublime-merge
```

##### Vivaldi

```bash
sudo dnf in -y dnf-utils
# add the Vivaldi repo to dnf/yum
sudo dnf config-manager --add-repo https://repo.vivaldi.com/archive/vivaldi-fedora.repo
# install Vivaldi
sudo dnf in -y vivaldi-stable
```

##### VMWare Workstation Player

-  https://docs.fedoraproject.org/en-US/quick-docs/how-to-use-vmware/

##### Zoom Client

```bash
sudo dnf install wget -y
# in a perfect world the latest version would work, but it doesn't yet
# wget https://zoom.us/client/latest/zoom_x86_64.rpm
# so we install the last version that we KNOW works
wget https://zoom.us/client/5.9.6.2225/zoom_x86_64.rpm
sudo dnf localinstall zoom_x86_64.rpm
```

#### Multimedia
##### VLC

The best video player:
```bash
sudo dnf in -y vlc
```
Open it and check whether it works.

##### Multimedia Codecs

If you have VLC installed, you should be fine as it has builtin support for all relevant audio and video codecs. In other cases, I have found that the following commands install all required stuff for Audio and Video:
```bash
sudo dnf groupupdate sound-and-video
sudo dnf in -y libdvdcss
sudo dnf in -y gstreamer1-plugins-{bad-\*,good-\*,ugly-\*,base} gstreamer1-libav --exclude=gstreamer1-plugins-bad-free-devel ffmpeg gstreamer-ffmpeg 
sudo dnf in -y lame\* --exclude=lame-devel
sudo dnf group upgrade --with-optional Multimedia
```

For OpenH264 I run:
```bash
sudo dnf config-manager --set-enabled fedora-cisco-openh264
sudo dnf in -y gstreamer1-plugin-openh264
```

###### OBS
I like that the snap version has all popular extensions included, so I use it:
```bash
sudo snap install obs-studio --edge
sudo snap connect obs-studio:audio-record
sudo snap connect obs-studio:avahi-control
sudo snap connect obs-studio:camera
sudo snap connect obs-studio:jack1
sudo snap connect obs-studio:joystick
sudo snap connect obs-studio:process-control
sudo snap connect obs-studio:removable-media
sudo snap connect obs-studio:raw-usb
sudo snap connect obs-studio:kernel-module-observe
sudo dnf -y in akmod-v4l2loopback v4l2loopback-utils
echo "options v4l2loopback devices=1 video_nr=13 card_label='OBS Virtual Camera'    exclusive_caps=1" | sudo tee /etc/modprobe.d/v4l2loopback.conf
echo "v4l2loopback" | sudo tee /etc/modules-load.d/v4l2loopback.conf
sudo modprobe -r v4l2loopback
sudo modprobe v4l2loopback devices=1 video_nr=13 card_label='OBS Virtual Camera' exclusive_caps=1
```
Open OBS and set it up, import your scenes, etc.

#### Security steps with Yubikey

I have a Yubikey and use it 
-  as second-factor for all admin/sudo tasks using `authselect`
-  for my private GPG key using the smart card capabilities of the yubikey

For this I need to install several packages:

```bash
sudo dnf in -y yubikey-manager # some common packages
# Insert the yubikey
ykman info # your key should be recognized
# Device type: YubiKey 5 NFC
# Serial number: 
# Firmware version: 5.1.2
# Form factor: Keychain (USB-A)
# Enabled USB interfaces: OTP+FIDO+CCID
# NFC interface is enabled.
# 
# Applications  USB     NFC     
# OTP       Enabled Enabled   
# FIDO U2F  Enabled Enabled   
# OpenPGP   Enabled Enabled   
# PIV       Enabled Enabled 
# OATH      Enabled Enabled   
# FIDO2     Enabled Enabled   
```

Make sure that OpenPGP and PIV are enabled on both Yubikeys as shown above.

##### Yubikey: two-factor authentication for admin/sudo password
Let’s set up the Yubikeys as second-factor for everything related to sudo using the pam.d module and authselect:
```bash
sudo dnf in -y pam-u2f pamu2fcfg
sudo authselect select sssd with-pam-u2f-2fa without-nullok
mkdir ~/.config/Yubico
pamu2fcfg > ~/.config/Yubico/u2f_keys # When your device begins flashing, touch the metal contact to confirm the association.
pamu2fcfg -n >> ~/.config/Yubico/u2f_keys # Do the same with your backup device
```
Important: before you close the terminal, open a new one and check whether you can do sudo echo test:
```bash
sudo echo test
# Please touch the device.
# [sudo] Passwort for $USER
```

##### Yubikey: private GPG key
Let’s use the private GPG key on the Yubikey (a tutorial on how to put it there is taken from Heise or YubiKey-Guide). Installing some packages first:
```bash
sudo dnf in -y gpg gnupg2 gnupg-pkcs11-scd pcsc-tools opensc pcsc-lite-ccid
sudo systemctl start pcscd
sudo systemctl enable pcscd
```
Insert your yubikey and check whether the card is readable by gpg:
```bash
gpg --card-status
````
If there is a No such device message, then try restarting pcscd by running:
```bash
sudo systemctl restart pcscd
````
This is a known bug, that is, if you ever run into the issue that gpg --card-status does not find your Yubikey, simply run sudo systemctl restart pcscd and it’ll work.

My public key is given in a file called /home/$USER/.gnupg/public.asc:
```bash
cd ~/.gnupg
gpg --import public.asc #this is my public key, my private one is on my yubikey
export KEYID=91E724BF17A73F6D
gpg --edit-key $KEYID
  trust
  5
  y
  quit
echo "This is an encrypted message" | gpg --encrypt --armor --recipient $KEYID -o encrypted.txt
gpg --decrypt --armor encrypted.txt
```
#### Gaming

```bash
sudo dnf in steam -y
```

https://github.com/Heroic-Games-Launcher/HeroicGamesLauncher/releases/tag/v2.2.6
https://github.com/CommandMC/EpicLinux/wiki
https://www.addictivetips.com/ubuntu-linux-tips/how-to-use-ea-origin-on-linux/

#### Webcam Setup

First, we query the available cameras.

```bash
v4l2-ctl --list-devices
OBSBOT Tiny: OBSBOT Tiny Camera (usb-0000:5a:00.3-2.4.1.1):
	/dev/video0
	/dev/video1
	/dev/media0

Logitech BRIO (usb-0000:5a:00.3-2.4.3):
	/dev/video2
	/dev/video3
	/dev/video4
	/dev/video5
	/dev/media1
```

Let's get the settings for the OBSBOT Tiny first.

```bash
v4l2-ctl -d /dev/video0 --list-ctrls

User Controls

                     brightness 0x00980900 (int)    : min=0 max=255 step=1 default=128 value=50
                       contrast 0x00980901 (int)    : min=0 max=255 step=1 default=128 value=159
                     saturation 0x00980902 (int)    : min=0 max=255 step=1 default=128 value=128
        white_balance_automatic 0x0098090c (bool)   : default=1 value=0
                           gain 0x00980913 (int)    : min=0 max=255 step=1 default=0 value=78
           power_line_frequency 0x00980918 (menu)   : min=0 max=2 default=2 value=2 (60 Hz)
      white_balance_temperature 0x0098091a (int)    : min=2000 max=7500 step=10 default=4000 value=4080
                      sharpness 0x0098091b (int)    : min=0 max=255 step=1 default=128 value=128
         backlight_compensation 0x0098091c (int)    : min=0 max=1 step=1 default=1 value=1

Camera Controls

                  auto_exposure 0x009a0901 (menu)   : min=0 max=3 default=3 value=3 (Aperture Priority Mode)
         exposure_time_absolute 0x009a0902 (int)    : min=3 max=2047 step=1 default=250 value=312 flags=inactive
     exposure_dynamic_framerate 0x009a0903 (bool)   : default=0 value=0
                   pan_absolute 0x009a0908 (int)    : min=-36000 max=36000 step=3600 default=0 value=0
                  tilt_absolute 0x009a0909 (int)    : min=-36000 max=36000 step=3600 default=0 value=7200
                 focus_absolute 0x009a090a (int)    : min=0 max=255 step=5 default=0 value=0 flags=inactive
     focus_automatic_continuous 0x009a090c (bool)   : default=1 value=1
                  zoom_absolute 0x009a090d (int)    : min=100 max=500 step=1 default=100 value=100
```

Now, let's get the settings for the Brio 4K.

```bash
v4l2-ctl -d /dev/video2 --list-ctrls

User Controls

                     brightness 0x00980900 (int)    : min=0 max=100 step=1 default=50 value=50
                       contrast 0x00980901 (int)    : min=0 max=100 step=1 default=50 value=50
                     saturation 0x00980902 (int)    : min=0 max=100 step=1 default=50 value=50
                            hue 0x00980903 (int)    : min=0 max=100 step=1 default=50 value=50
        white_balance_automatic 0x0098090c (bool)   : default=1 value=1
                    red_balance 0x0098090e (int)    : min=0 max=0 step=0 default=0 value=0 flags=inactive
                   blue_balance 0x0098090f (int)    : min=0 max=0 step=0 default=0 value=0 flags=inactive
                           gain 0x00980913 (int)    : min=1 max=48 step=1 default=1 value=1
           power_line_frequency 0x00980918 (menu)   : min=0 max=2 default=3 value=0 (Disabled)
      white_balance_temperature 0x0098091a (int)    : min=2800 max=6500 step=1 default=4000 value=0 flags=inactive
                      sharpness 0x0098091b (int)    : min=0 max=4 step=1 default=2 value=2
         backlight_compensation 0x0098091c (int)    : min=0 max=18 step=1 default=9 value=9

Camera Controls

                  auto_exposure 0x009a0901 (menu)   : min=0 max=3 default=0 value=0 (Auto Mode)
         exposure_time_absolute 0x009a0902 (int)    : min=1 max=2500 step=1 default=330 value=330 flags=inactive
     exposure_dynamic_framerate 0x009a0903 (bool)   : default=0 value=0
                   pan_absolute 0x009a0908 (int)    : min=-468000 max=468000 step=3600 default=0 value=533736
                  tilt_absolute 0x009a0909 (int)    : min=-324000 max=324000 step=7200 default=0 value=310788
                  zoom_absolute 0x009a090d (int)    : min=0 max=100 step=1 default=0 value=100
                zoom_continuous 0x009a090f (int)    : min=0 max=100 step=1 default=70 value=70
                      pan_speed 0x009a0920 (int)    : min=-1 max=160 step=1 default=20 value=0
                     tilt_speed 0x009a0921 (int)    : min=-1 max=120 step=1 default=20 value=0
```

