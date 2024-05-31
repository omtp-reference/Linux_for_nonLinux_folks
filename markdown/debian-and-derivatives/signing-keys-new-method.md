# Correct way to add new signing keys in 2023

**TL;DR** [How-to](#how-to-add-a-new-repo-with-signing-key)



## Installing a package from an [external repository in Ubuntu](https://itsfoss.com/adding-external-repositories-ubuntu/) consists of three steps:

- Adding the repository’s GPG key to the system
- Adding the external repository to the system
- Installing the package from this external repository

But lately, you would notice a message about ‘apt-key being deprecated’ when you try installing packages from third-party repositories.



Take the [installation of Spotify on Ubuntu](https://itsfoss.com/install-spotify-ubuntu-linux/) for example. When I add the GPG key to the system, it complains.

```
curl -sS https://download.spotify.com/debian/pubkey_5E3C45D7B312C643.gpg | sudo apt-key add -
[sudo] password for abhishek: 
Warning: apt-key is deprecated. Manage keyring files in trusted.gpg.d instead (see apt-key(8)).
OK
```

It’s a warning, not an error. It doesn’t stop the process. The GPG key is added to your system and you can continue adding the external repository.

However, it will create further warnings (again, not errors). In the example here, if I continue adding the external repository, it shows me this message “[key is stored in legacy trusted.gpg keyring](https://itsfoss.com/key-is-stored-in-legacy-trusted-gpg/)“.

```
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
All packages are up to date.
W: http://repository.spotify.com/dists/stable/InRelease: Key is stored in legacy trusted.gpg keyring (/etc/apt/trusted.gpg), see the DEPRECATION section in apt-key(8) for details.
```

It doesn’t stop the installation of the package, though. In the example, I was able to install the spotify-client package afterward.

If it’s not an error, do you need to be worried about it? Probably not. Not now, at least. However, it would be better to understand future changes coming to this external repo mechanism.

## Understanding the apt-key deprecation and trusted.gpg issue

There are two parts to this message:

- apt-key is deprecated
- Manage keyring files in trusted.gpg.d

I’ll come to both points in a moment.

When you add the keys (.gpg or .asc) of a repository, your system trusts the packages (signed with that key) coming from the repository. If you don’t add the key of a repository, your system won’t allow installing packages from it.

For a long time, the apt-key command line tool has been used for managing the repository keys to Debian and other distros using apt package management. You can add, list, update, and remove the keys with this command.

### Problem with the way apt-key works

It works by adding the keys to the /etc/apt/trusted.gpg file. The apt package manager trusts the keys inside this file.

Sounds good, right? However, it was discovered to be a potential security issue. Your system trusts those keys completely, not just for the packages you added them for.

Imagine that you added keys to repository A to get package AA and to repo B to get package BB. Your system will gladly accept package BB signed by the key of repo A. It cannot relate the keys to their respective packages.

Now, it’s easier said than done because there are other factors in play like apt policy and preferences but it opens an attack surface.

This is the reason why apt-key is being deprecated. That’s the first part of the warning message.

### Ubuntu wants you to separate GPG keys

Coming to the second part of the warning message; “Manage keyring files in trusted.gpg.d”.

Ubuntu doesn’t want you to add all the signature keys in the single /etc/apt/trusted.gpg file. It suggests using a separate file that are located in the /etc/apt/trusted.gpg.d directory.

It’s the same mechanism it uses for the sources list where external repository sources are listed in their own file under /etc/apt/sources.list.d instead of keeping everything under the /etc/apt/sources.list file. It makes managing the external repos a bit easier.

This means that instead of using the apt-key in this fashion:

```
curl -sS https://download.spotify.com/debian/pubkey_5E3C45D7B312C643.gpg | sudo apt-key add -
```

You should use it like this:

```
curl -sS https://download.spotify.com/debian/pubkey_5E3C45D7B312C643.gpg | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/spotify.gpg
```

Which is basically adding the key to its dedicated file under /etc/apt/trusted.d directory. Ubuntu won’t complain anymore.

Although this doesn’t fix the original concern of cross-signing the packages. The [proper way](https://wiki.debian.org/DebianRepository/UseThirdParty?ref=itsfoss.com) to fix is to add the key location to the sources list file of the repository. I’ll discuss both methods in the next section. 

## How to add a new repo with signing key

### Add the key

As an example, let’s add the key of the Spotify repository in /usr/share/keyrings directory.

```
curl -sS https://download.spotify.com/debian/pubkey_5E3C45D7B312C643.gpg | gpg --dearmor | sudo tee /usr/share/keyrings/spotify.gpg
```

### Add the apt repo

Now, comes the next part. Normally, the content of the sources list file are like this:

```
deb URL_of_the_repo stable non-free
```

You should edit it and add the location of the key file like this:

```
deb [signed-by=/usr/share/keyrings/key-file.gpg] URL_of_the_repo stable non-free
```

This way, you are linking the package to a specific key. Now, this key cannot be used to download any other package. No more cross-signing.

Using the Spotify example, I modified the command this way so that the sources list also contains the signed by information.

```
echo "deb [signed-by=/usr/share/keyrings/spotify.gpg] http://repository.spotify.com stable non-free" | sudo tee /etc/apt/sources.list.d/spotify.list
```




