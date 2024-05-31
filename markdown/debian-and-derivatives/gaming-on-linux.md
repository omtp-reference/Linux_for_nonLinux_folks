##### Step 1 – Install Steam, Enable Proton and Install Proton-GE

Install Steam using the Terminal with the following command:

```bash
sudo apt install gdebi-core gdebi
cd ~/Downloads
wget -c https://cdn.akamai.steamstatic.com/client/installer/steam.deb
gdebi-core steam.deb
```

Once installed, sign into your account.

Enable Proton for all your game library by navigating to `Steam>Settings>Steam Play>Advanced` and ticking the `Enable Steam Play` for all other titles, once done restart Steam to apply.

https://github.com/GloriousEggroll/proton-ge-custom

Download Proton-GE by navigating to the releases section of the GitHub page, scroll down to the assets section, and download the `tar.gz` archive.

Once downloaded, extract the Proton-GE folder, and copy it.

Next navigate to your Home directory, enable Hidden Files, navigate to `.steam` root and create a new folder called `compatibilitytools.d` and paste the extracted Proton-GE folder inside.

Restart Steam if already open, and when you now right click on a game’s properties, under the General tab, tick the Force the use of a specific Steam Play compatibility tool, you will now be able to select the Proton-GE build from the list. ​

##### Step 2 – Install Lutris

[Download Lutris](https://lutris.net/downloads/)

Open a Terminal and type the following commands in sequence:

```bash
sudo add-apt-repository ppa:lutris-team/lutris  
sudo apt update  
sudo apt install lutris
```

##### Getting `PlayFab` cross play working under Linux

`PlayFab` is a mechanism to allow crossplay games to work on Linux; Valheim for sure uses this.

Not all of the required libraries are included for using the PlayFab cross play system under modern debian-based distros. Fix this with:

```bash
apt-get update && apt-get install -y libpulse-dev libatomic1 libc6
```
