#### Install and setup OBS Studio

The most recent version of OBS Studio is available as a flatpak in the Elementary OS App Center or can also be installed from [OBS Studio | Flathub](https://flathub.org/apps/com.obsproject.Studio). 



Now OBS Studio settings are a mix of the arcane and obtuse and most folks don't really understand them; with that being said, OBS Studio, out of the box, will not output any video recording format that the free version of Davinci Resolve can load and use. So we're going to fix that right now. We're going to change the recording output settings to use `Custom Output (FFmpeg)` and use the following settings.



```
Container Format: mov
Video Bitrate: 290000Kbps
Keyframe Interval: 1
Video Encoder: dnxhd
Audio Bitrate: 2304 Kbps
Audio Encoder: pcm_s24le
```

You should now be able to record 1080p 60 video using DNxHD 290. This 
will import directly into the free version of Davinci Resolve.

See [Interfacing Linux: Record DNxHD With OBS &#8211; Linux Game Cast](https://linuxgamecast.com/2020/06/interfacing-linux-obs-davinci-resolve-free-edition-lifehack/) for slightly more details and an image to verify your settings.



#### Install and setup Davinci Resolve

The free version of Davinci Resolve is available for download at [DaVinci Resolve 18 | Blackmagic Design](https://www.blackmagicdesign.com/products/davinciresolve).

Once downloaded do the following:

```bash
cd ~/Downloads/
unzip ./DaVinci_Resolve_18.5_Linux.zip
chmod +x ./DaVinci_Resolve_18.5_Linux.run
./DaVinci_Resolve_18.5_Linux.run -i
```

Go through the installation steps as usual. If the installation fails, the error message popup will tell you if other files are needed. IE, on my first install on my current machine the message told me I was missing `xcb-cursor` and `xcb-damage`; these are the actual library nanes, not the package names you need to install. To find the package names I used apt search for each one:

```bash
uncletallest@hades:~$ apt search xcb-cursor
Sorting... Done
Full Text Search... Done
libxcb-cursor-dev/jammy 0.1.1-4ubuntu1 amd64
  utility libraries for X C Binding -- cursor, development files

libxcb-cursor0/jammy,now 0.1.1-4ubuntu1 amd64 [installed]
  utility libraries for X C Binding -- cursor

uncletallest@hades:~$ apt search xcb-damage
Sorting... Done
Full Text Search... Done
libxcb-damage0/jammy,now 1.14-3ubuntu3 amd64 [installed]
  X C Binding, damage extension

libxcb-damage0-dev/jammy 1.14-3ubuntu3 amd64
  X C Binding, damage extension, development files


```

We don't need the dev libraries so using the above information I would install `libxcb-cursor0` and `libxcb-damage0`:

```bash
sudo apt install libxcb-cursor0 libxcb-damage0
```

Once all missing libraries are installed, rerun the Davinci installer.
