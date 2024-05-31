# Basic Developer Workstation Setup

---

### Project 0

---

##### Install VS Code

[Running Visual Studio Code on Linux](https://code.visualstudio.com/docs/setup/linux)

### Project 8

---

##### Install Node using NVM

Another way of installing Node.js that is particularly flexible is to use nvm, the Node Version Manager. This piece of software allows you to install and maintain many different independent versions of Node.js, and their associated Node packages, at the same time.

To install NVM on your Ubuntu 22.04 machine, visit the project’s GitHub page. Copy the curl command from the README file that displays on the main page. This will get you the most recent version of the installation script.

Before piping the command through to bash, it is always a good idea to audit the script to make sure it isn’t doing anything you don’t agree with. You can do that by removing the | bash segment at the end of the curl command:

    `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh`

Take a look and make sure you are comfortable with the changes it is making. When you are satisfied, run the command again with | bash appended at the end. The URL you use will change depending on the latest version of nvm, but as of right now, the script can be downloaded and executed by typing:

    `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`

This will install the nvm script to your user account. To use it, you must first source your .bashrc file:

    `source ~/.bashrc`

Now, you can ask NVM which versions of Node are available:

    `nvm list-remote`

Output

```bash
       v16.11.1
       v16.12.0
       v16.13.0   (LTS: Gallium)
       v16.13.1   (LTS: Gallium)
       v16.13.2   (LTS: Gallium)
       v16.14.0   (Latest LTS: Gallium)
        v17.0.0
        v17.0.1
        v17.1.0
        v17.2.0
        v17.3.0
        v17.3.1
        v17.4.0
        v17.5.0
        v17.6.0
```

It’s a very long list! You can install a version of Node by typing any of the release versions you see. For instance, to get version v16.14.0 (another LTS release), you can type:

    `nvm install v16.14.0`

You can see the different versions you have installed by typing:

    `nvm list`

Output

```
->     v16.14.0
default -> v16.14.0
iojs -> N/A (default)
unstable -> N/A (default)
node -> stable (-> v16.14.0) (default)
stable -> 16.14 (-> v16.14.0) (default)
lts/* -> lts/gallium (-> v16.14.0)
lts/argon -> v4.9.1 (-> N/A)
lts/boron -> v6.17.1 (-> N/A)
lts/carbon -> v8.17.0 (-> N/A)
lts/dubnium -> v10.24.1 (-> N/A)
lts/erbium -> v12.22.10 (-> N/A)
lts/fermium -> v14.19.0 (-> N/A)
lts/gallium -> v16.14.0
```

This shows the currently active version on the first line (-> v16.14.0), followed by some named aliases and the versions that those aliases point to.

Note: if you also have a version of Node.js installed through apt, you may see a system entry here. You can always activate the system-installed version of Node using nvm use system.

You can install a release based on these aliases as well. For instance, to install fermium, run the following:

    `nvm install lts/fermium`

Output

```bash
Downloading and installing node v14.19.0...
Downloading https://nodejs.org/dist/v14.19.0/node-v14.19.0-linux-x64.tar.xz...
################################################################################# 100.0%
Computing checksum with sha256sum
Checksums matched!
Now using node v14.19.0 (npm v6.14.16)
```

You can verify that the install was successful using the same technique from the other sections, by typing:

    `node -v`

Output

```bash
v14.19.0
```

The correct version of Node is installed on our machine as we expected. A compatible version of npm is also available.

### Project 12

---

##### Install Postman VS Code extension

There is no standard way to install Postman across all distribution so I prefer the VS Code extension that allows you to run Postman from inside VS Code. Just install the Postman VS Code extension and sign-in in the sidebar.

##### Install MongoDB

```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc |  gpg --dearmor | sudo tee /usr/share/keyrings/mongodb.gpg > /dev/null
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install mongodb-org
```

##### Install MongoDB Compass

Download MongoDB Compass

```
wget https://downloads.mongodb.com/compass/mongodb-compass_1.43.0_amd64.deb
```

Install MongoDB Compass

```
sudo dpkg -i mongodb-compass_1.43.0_amd64.deb
```

Start MongoDB Compass

```
mongodb-compass
```
