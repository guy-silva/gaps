# GAPS
Repository with **G**oogle **AP**ps **S**cripts to improve your life!

# Available Scripts

## [AutoBlocker](autoblocker/README.md)
Blocks your calendar for minutes after a large meeting.

# Scripts Instalation

clone this repo then send the content of desired scripts into google apps scripts usign the below methods

## Clasp

make sure to have enabled [Google Apps Script API](https://script.google.com/home/usersettings)

install [clasp](https://github.com/google/clasp). It allows command line interations with google scripts. You can get a tutorial [here](https://codelabs.developers.google.com/codelabs/clasp#0)


Then with clasp you'll need to login, enter in the desired repository folder, create a new project in your google script account and push the files from the folder into the project (make sure you don't have google script UI opened while doing the clasp or it may not push properly)

## Manual

Alternativelly copy the content of .js into your google script project using the web editor and set proper triggers

## Customizing the script
Check the readme of the script to see further customizations

## Setting Up the trigger
Once projec is visible in google apps scripts interface, go to the trigger file and execute the function in there from the UI so the trigger gets created (or manually do it yourself)
