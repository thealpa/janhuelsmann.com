---
title: Enabling Intel SST on ASUS Motherboards
discription: This guide outlines fow to edit ASUS BIOS files to enable Intel Speed Shift on unsupported motherboards.
permalink: sst
layout: post.njk
date: 2017-06-30
---
Updated 2018-10-30

**Intel SST should now work out of the box with newer ASUS UEFI versions.**

I recently purchased an [ASUS Z270I](https://rog.asus.com/motherboards/rog-strix/rog-strix-z270-i-gaming-model/){.highlight} motherboard and noticed that [Intel Speed Shift](https://arstechnica.com/information-technology/2015/08/the-many-tricks-intel-skylake-uses-to-go-faster-and-use-less-power/){.highlight} did not work (HWiNFO64 is a great tool to validate whether CPU features are enabled). 

Disclamer: Modding your BIOS is dangerous. Everything you are doing will be at your own risk.

1. Since ASUS is using American Megatrends Aptio V UEFI we can save the UEFI (version 0704 at the time of writing) to a file using [AFUWINGUI for AptioV](https://ami.com/en/products/bios-uefi-tools-and-utilities/bios-uefi-utilities/){.highlight}.

2. To open and modify the extracted file we need the AMI BIOS Configuration Program (AMIBCP). A quick Google search should help.

3. Open the BIOS file using AMIBCP and navigate to Setup/Advanced/CPU Configuration/CPU - Power Management. There should be a disabled handle called Intel(R) Speed Shift Technology. Change its optimal value from Disabled to Enabled and save the file. 

4. When trying to flash the modified UEFI back to the board using AFUWINx64.exe you should encounter a security verification issue. As it turns out AMI removed the option to circumvent the verification in newer versions of its AFU software. Again, a quick Google search should help out. I used v5.06.0 to flash my modified .rom file using the following command:

		$ AFUWINx64.exe afuwin.rom /GAN

