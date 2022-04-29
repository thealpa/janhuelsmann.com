---
title: Ubiquiti Dream Machine Pro as a NAS
desc: Launching a samba container via podman to utilize the Ubiquiti Dream Machine Pro as a small network attached storage (NAS).
permalink: udm-pro-nas
layout: post.njk
date: Last Modified
published: 2022-02-28
---

The [Ubiquiti Dream Machine Pro](https://store.ui.com/collections/unifi-network-unifi-os-consoles/products/udm-pro){.highlight} line of networking consoles offer a single 3.5" drive bay (with compatibility for 2.5" drives). Out of the box the drive can unfortunately only be used as Unifi Protect storage. Thankfully the UDM Pro runs it's services using containers, which means we can launch our own via [podman](https://podman.io/){.highlight}, allowing the UDM Pro to be used as a small NAS using the SMB/CIFS server software [samba](https://www.samba.org/){.highlight}. 

### Installation

1. SSH into your UDM Pro. If you haven't done this before you can follow this [guide](https://evanmccann.net/blog/2020/5/udm-ssh){.highlight}.

2. Enter the following command to install [on_boot.d](https://github.com/boostchicken/udm-utilities){.highlight} as well as the required [CNI plugins](https://github.com/boostchicken-dev/udm-utilities/blob/master/cni-plugins/05-install-cni-plugins.sh){.highlight} and [CNI bridge scipt](https://github.com/boostchicken-dev/udm-utilities/blob/master/on-boot-script/examples/udm-networking/on_boot.d/05-cni-bridge.sh){.highlight}:
`curl -fsL "https://raw.githubusercontent.com/boostchicken/udm-utilities/HEAD/on-boot-script/remote_install.sh" | /bin/sh`

3. Download the [samba container script](https://raw.githubusercontent.com/thealpa/UDMPRO-samba/udmsamba-master/20-samba.sh){.highlight} to your UDM Pro:
`curl "https://raw.githubusercontent.com/thealpa/UDMPRO-samba/udmsamba-master/20-samba.sh" -o /mnt/data/on_boot.d/20-samba.sh`

4. Optionally adjust any settings you want (I highly recommend changing the default credentials!):
`vi /mnt/data/on_boot.d/20-samba.sh`<br>
If you're having trouble using the vi editor press *i* to edit content and then save the file by using *Esc* and typing *:wq* followed by return.

5. Set permissions to executable:
`chmod +x /mnt/data/on_boot.d/20-samba.sh`

6. Run the script:
`sh /mnt/data/on_boot.d/20-samba.sh`

### Usage

Connect to your new UDM Pro samba server using:
`smb://<your_udm_ip>/Shared/`

The default credentials are `user` and `password`. If you need more configuration options please refer to the [dperson/samba](https://hub.docker.com/r/dperson/samba){.highlight} docker image. Since a single HDD or SSD does not offer any redundancy, please make additional backups of any important data.

Installing a SATA drive automatically triggers an additional loud fan regardless of temperatures. [This script](https://github.com/renedis/ubnt-auto-fan-speed){.highlight} can be used to adjust fan speeds inside the UDM Pro to one's personal preference.