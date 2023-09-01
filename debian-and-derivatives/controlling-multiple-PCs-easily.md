# Controlling multiple PCs Easily

## What is a software KVM?

### How is a software KVM different from VNC/noMachine/RDP?

## What are my options for software KVM?

### *Paid vs Free*

### *Compatability matters*

## Which one do I recommend?

Barrier is the only completely cross-platform, FOSS (Free and Open Source Software) solution and has been for quite some time. Barrier was originally a fork of v1.9 of Synergy's open source repository; this was due to Symless abandoning all support for their Synergy v1 software and making Synergy v2 require payments to function at all.

### Barrier

From the README.md on the Barrier [repo](https://github.com/debauchee/barrier):

> Barrier is software that mimics the functionality of a KVM switch, which historically would allow you to use a single keyboard and mouse to control multiple computers by physically turning a dial on the box to switch the machine you're controlling at any given moment. 
> Barrier does this in software, allowing you to tell it which machine to control by moving your mouse to the edge of the screen, or by using a keypress to switch focus to a different system.
> 
> Barrier was forked from Symless's Synergy 1.9 codebase. 
> Synergy was a commercialized reimplementation of the original 
> CosmoSynergy written by Chris Schoeneman.

#### Let's Install it

##### On Windows:

Download the Barrier .exe file from [here](https://github.com/debauchee/barrier/releases/latest)

Install as you normally would.

#### On MacOS:

Download the Barrier .dmg file from [here](https://github.com/debauchee/barrier/releases/latest)

Install by opening the DMG and dragging the icon to your applications folder in Finder.

##### On Linux:

Barrier is easily installable from a terminal:

###### Ubuntu family of distros

```
sudo apt install barrier
```

###### RedHat family of distros

```
sudo dnf install barrier
```

###### Suse family of distros

```
sudo zypper install barrier
```

Find Barrier in your application menu and run it that first time.

#### Lets configure Barrier:

##### For the Server:

<sup>_this is the one with the keyboard and mouse you want to use_</sup>

Configure as shown:

fig. 1 - configuration (main window)

![](C:\Users\Uncle%20Tallest\Sync\Work\Code\github\omtp-reference\Linux_for_nonLinux_folks\images\barrier\fig1-windows-server.png)

fig. 2 - settings (Barrier menu)

![](C:\Users\Uncle%20Tallest\Sync\Work\Code\github\omtp-reference\Linux_for_nonLinux_folks\images\barrier\fig2-windows-server.png)

##### For the Clients:

<sup>_these are the PCs you want to control_</sup>

Configure as shown:

fig. 1 - configuration (main window)

![](C:\Users\Uncle%20Tallest\Sync\Work\Code\github\omtp-reference\Linux_for_nonLinux_folks\images\barrier\fig1-windows-client.png)

fig. 2 - settings (Barrier menu)

![](C:\Users\Uncle%20Tallest\Sync\Work\Code\github\omtp-reference\Linux_for_nonLinux_folks\images\barrier\fig2-windows-client.png)








