## Mount other drives

Mount non-root drives without formatting them so we keep our data intact:

```bash
/dev/nvme1n1p1 on /home/tallest/Games
/dev/sdc1 on /home/tallest/Storage
```

## Import existing ZFS pool

```bash
sudo apt install zfsutils-linux
sudo zpool status # should be empty
sudo zpool create -f -m /home/tallest/Games/the-massive the-massive /dev/sda /dev/sdb
sudo zpool status # should show the pool status
```

## nvidia-drivers-525+ fails to compile modules

If you see the error below while installing nvidia-driver-525 or newer, do the steps below the error message:

```bash
dpkg: error processing package nvidia-dkms-525(--configure):
 installed nvidia-dkms-525 package post-installation script subprocess returned error exit status 10

Examining the /var/lib/dkms/nvidia/525.78.01/build/make.log reveals multiple
cc: error: unrecognized command-line option ‘-ftrivial-auto-var-init=zero’
```

```bash
sudo apt-get purge *nvidia* && sudo apt-get autoremove
sudo apt-get install gcc-12
sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-12 12
sudo apt-get install nvidia-driver-525 # or whichever version you want
```

##### Desktop Setup Steps

First, we need to install a better apt replacement called nala

```bash
sudo apt install nala
# or
curl https://gitlab.com/volian/volian-archive/-/raw/main/install-nala.sh | bash
```

#### Activate the beta flathub repo

```bash
flatpak remote-add --if-not-exists flathub-beta https://flathub.org/beta-repo/flathub-beta.flatpakrepo
```

###### Get Flatseal for changing flatpak permissions

```bash
flatpak install flathub com.github.tchx84.Flatseal
```

##### Zen Browser

```bash
flatpak install flathub io.github.zen_browser.zen
```

##### Betterbird

```bash
flatpak install flathub eu.betterbird.Betterbird
```

##### Cameractrls

```bash
flatpak install flathub hu.irl.cameractrls
```

##### Discord Canary (bleeding edge)

```bash
flatpak install flathub-beta com.discordapp.DiscordCanary
```

##### Discord

```bash
flatpak install flathub com.discordapp.Discord
```

##### Telegram

```bash
flatpak install flathub org.telegram.desktop
```

##### OBS Studio

```bash
flatpak install flathub com.obsproject.Studio
```

##### ProtonUp-Qt

```bash
flatpak install flathub net.davidotek.pupgui2
```

##### Bottles

```bash
flatpak install flathub com.usebottles.bottles
```

##### ProtonTricks

```bash
flatpak install flathub com.github.Matoking.protontricks
```

##### Lutris

```bash
flatpak install flathub net.lutris.Lutris
```

##### GeForce NOW (electron)

```bash
flatpak install flathub io.github.hmlendea.geforcenow-electron
```

##### Steam Link

```bash
flatpak install flathub com.valvesoftware.SteamLink
```

##### Steam

```bash
flatpak install flathub com.valvesoftware.Steam
```

##### Xenia Manager

```bash

```

##### AppImagePool (App Image manager)

```bash
flatpak install flathub io.github.prateekmedia.appimagepool
```

##### Gear Lever (App Image manager)

```bash
flatpak install flathub it.mijorus.gearlever
```

 PCSX2
