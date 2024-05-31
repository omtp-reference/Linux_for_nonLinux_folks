### Using the Fedora package manager -- DNF

#### DNF Flags

```bash
$ echo 'fastestmirror=1' | sudo tee -a /etc/dnf/dnf.conf
$ echo 'max_parallel_downloads=10' | sudo tee -a /etc/dnf/dnf.conf
$ echo 'deltarpm=true' | sudo tee -a /etc/dnf/dnf.confb
$ cat /etc/dnf/dnf.conf
```

#### After Install

````bash
$ sudo dnf upgrade --refresh
$ sudo dnf update -y
````

#### Additional Repositories

```bash
sudo dnf install -y  https://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm
sudo dnf install -y https://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
sudo dnf config-manager --set-enabled rpmfusion-free-updates-testing
sudo dnf config-manager --set-enabled rpmfusion-nonfree-updates-testing

sudo dnf upgrade --refresh
sudo dnf groupupdate core
sudo dnf install -y rpmfusion-free-release-tainted
sudo dnf install -y dnf-plugins-core
```

Checkout `sudo dnf grouplist -v` to see available groups you might be interested in.

### Other package managers/types

#### Flatpak support

Let's make sure that both the normal and beta repos for Flatpak are working as intended.

```bash
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
flatpak install flathub org.gnome.Recipes
flatpak remote-add --if-not-exists flathub-beta https://flathub.org/beta-repo/flathub-beta.flatpakrepo
flatpak install flathub-beta org.godotengine.Godot
flatpak update
```

#### Snap support

Enabling snap support boils down to running the following commands:

```bash
sudo dnf install -y snapd
sudo ln -s /var/lib/snapd/snap /snap # for classic snap support
sudo reboot now
```

The restart is needed to ensure snap’s paths are updated correctly. After the reboot, check whether there are any updates (and install Snap Store for ease of use):

```bash
sudo snap refresh
sudo snap install snap-store
```