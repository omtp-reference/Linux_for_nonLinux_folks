### How to Setup Elementary OS For Gaming - Steam Proton, Wine, Lutris, AMD & Nvidia GPU Drivers

##### Step 1 – Enable PPAs

Open a Terminal window and type the following:

```bash
sudo apt install software-properties-common    
```

##### Step 2 – Download and Install Latest GPU Drivers

###### Nvidia Hardware

Open a Terminal window and run the following commands in sequence:

```bash
sudo add-apt-repository ppa:graphics-drivers/ppa  
sudo dpkg --add-architecture i386  
sudo apt update  
sudo apt install nvidia-driver-455  
sudo apt install libvulkan1 libvulkan1:i386
```

Reboot the computer to apply the settings.

###### AMD / Intel Hardware

Open a Terminal window and run the following commands in sequence:

```bash
sudo add-apt-repository ppa:kisak/kisak-mesa  
sudo dpkg --add-architecture i386  
sudo apt update && sudo apt upgrade  
sudo apt install libgl1-mesa-dri:i386  
sudo apt install mesa-vulkan-drivers mesa-vulkan-drivers:i386 
```

Reboot to apply the settings. ​

##### Step 3 – Install Steam, Enable Proton and Install Proton-GE

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

##### Step 4 – Install Lutris

[Download Lutris](https://lutris.net/downloads/)

Open a Terminal and type the following commands in sequence:

```bash
sudo add-apt-repository ppa:lutris-team/lutris  
sudo apt update  
sudo apt install lutris
```
