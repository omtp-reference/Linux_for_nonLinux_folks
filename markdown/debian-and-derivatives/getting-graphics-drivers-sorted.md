### How to Setup Elementary OS For Gaming - Steam Proton, Wine, Lutris, AMD & Nvidia GPU Drivers

##### Step 1 – Enable PPAs

Open a Terminal window and type the following:

```bash
sudo apt install software-properties-common    
```

##### Step 2 – Download and Install Latest GPU Drivers

##### Nvidia Hardware

Open a Terminal window and run the following commands in sequence:

```bash
sudo add-apt-repository ppa:graphics-drivers/ppa  
sudo dpkg --add-architecture i386  
sudo apt update  
sudo apt install nvidia-driver-455  
sudo apt install libvulkan1 libvulkan1:i386
```

<mark>IMPORTANT:</mark>  DO NOT reboot the computer until you verify that the proper kernel headers were installed to properly build the nvidia kernel modules.

###### Verifying kernel headers are installed to build modules

<mark>IMPORTANT:</mark>  *As of 25Apr2023, upgrading to a new kernel under Ubuntu 22.04 does not succeed at rebuilding dkms modules during the upgrade because apt sees the linux-headers are an 'optional' install target. So if you upgrade your kernel, check the name of the kernel just installed and make sure to install the matching kernel headers; installing the headers for the new kernel will automatically successfully rebuild the dkms modules for the new kernel as part of the process of installing the correct linux-header package.*

```bash
dpkg --list | grep linux-image-
rc  linux-image-5.15.0-58-generic              5.15.0-58.64                                     amd64        Signed kernel image generic
ii  linux-image-5.19.0-38-generic              5.19.0-38.39~22.04.1                             amd64        Signed kernel image generic
ii  linux-image-5.19.0-40-generic              5.19.0-40.41~22.04.1                             amd64        Signed kernel image generic
ii  linux-image-5.19.0-41-generic              5.19.0-41.42~22.04.1                             amd64        Signed kernel image generic
ii  linux-image-generic-hwe-22.04              5.19.0.41.42~22.04.14                            amd64        Generic Linux kernel image
```

*As you can see above, the kernel I just installed (at the time of writing this) is* 

`linux-image-5.19.0-41-generic` 

*so I would type* 

`sudo apt install linux-headers-5.19.0-41-generic` 

*now you may reboot to use the new kernel AND new nvidia drivers.*

##### AMD / Intel Hardware

Open a Terminal window and run the following commands in sequence:

```bash
sudo add-apt-repository ppa:kisak/kisak-mesa  
sudo dpkg --add-architecture i386  
sudo apt update && sudo apt upgrade  
sudo apt install libgl1-mesa-dri:i386  
sudo apt install mesa-vulkan-drivers mesa-vulkan-drivers:i386 
```

Reboot to apply the settings. ​

