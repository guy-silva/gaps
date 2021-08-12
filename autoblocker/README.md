# AutoBlocker

If you have a busy calendar where meetings are created without any control to the point one the end of one meeting is the start of the other and you have no time to take a breake, write notes, reply other messagas, etc... **this script is for you!**

This script helps you by automatically blocking some minutes in your calendar (with a private meeting) just after a long meeting. 

![sample](https://user-images.githubusercontent.com/1482146/129271995-0b75be0b-dcbc-4d24-9eae-f222938dd8c3.png)


Green events were automatically created :boom:

# Installation 

follow up the guid from project's [README](../README.md)

# Configuration 

Check [AutoBloker's](autoblocker.js) global vars. 

# Usage

Once trigger is set, it will check every 10 minutes for your events. If it has new events, then it will automatically block some time considering your configurations. If existing events were moved/deleted or rejected by you then it will delete the automatically blocked events.

For uninstalling it, delete the trigger and delete the events with custom name. 