# Gamehacking.org Downloader

## Description

It is pretty tedious to download the cheat files from the GameHacking site. Instead we can use Playwright to do the manual work for us.

## Get Started

1. Install Node (v18+)
1. Clone this repo.
1. Install PlayWright using `npx playwright install --with-deps`. Note that this will install a number of system dependencies.
1. Run `npm install`
1. Run the scraper: `node scraper.js`

## Important caveats

This is a very quick first draft so it only targets the SNES system. It also only targets the FXPak Pro file format.

It also has the first listing page hard-coded (easy enough to trigger clicking Next). To download from the other listing pages, change the number from 0 through to 83 as required and rerun the scraper.

I have only run and tested this in Ubuntu 22.04 running in WSL2 on Windows 11.

That said it should be compatible with:

- Windows 10+, Windows Server 2016+ or Windows Subsystem for Linux (WSL).
- MacOS 12 Monterey, MacOS 13 Ventura, or MacOS 14 Sonoma.
- Debian 11, Debian 12, Ubuntu 20.04 or Ubuntu 22.04, with x86-64 or arm64 architecture.

## TODOs

- Automate cycling through the listing pages
- Add ability to pass in a system identifier (currently only targets SNES)
- Ability to specify format (currently only targets FXPak Pro for SNES)
