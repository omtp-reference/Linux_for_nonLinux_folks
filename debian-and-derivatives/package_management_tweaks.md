Issue - What does this apt error message ("Download is performed unsandboxed as root...") mean?

```bash
W: Download is performed unsandboxed as root as file '/var/cache/apt/archives/partial/samba-libs_2%3a4.5.8+dfsg-0ubuntu0.17.04.1_i386.deb' couldn't be accessed by user '_apt'. - pkgAcquire::Run (13: Permission denied)
```

The fix

```bash
sudo chown -Rv _apt:root /var/cache/apt/archives/partial/
sudo chmod -Rv 700 /var/cache/apt/archives/partial/
```


