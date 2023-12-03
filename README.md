# StationApp
StationApp is a mobile application designed to support admins in assisting students with adding points to their accounts. It is important to note that this app is not meant to be used independently but rather as a separate component of its main application. The main application "BinusRecycleApp" can be found by following the link: https://github.com/kennethfilberts/binus-recycle-app

In order to use this application, users must set up the BinusRecycleDB Database along with its API. Further explanation can be found in the link: https://github.com/Scleepy/BinusRecycleAPI

The Figma prototype can be found here: 
https://www.figma.com/file/iK0IVQM2PLw3e3BDy8omTv/Station-App?type=design&node-id=204%3A84&mode=design&t=CZ5naUYh4tneq1wZ-1

### Setup:
- Once the prerequisites are met(database & API), you can begin to clone the "main" branch of the repository and run "npm i" run install all the dependencies.
- The .env file must be configured to your local machine's IP address by opening cmd and running "ipconfig":
```
BASE_URL=http://[IP HERE, DELETE BRACKETS]:3000
```
- Punch "npm run android clear-cache" into the terminal to start the application
