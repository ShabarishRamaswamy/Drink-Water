# Drink-Water
This is a Chrome extension which reminds you to drink water at your specified time.

It is important to drink water at regular intervals, especially when working or studying. Thus, I have created this extension to remind users to drink water at their own optimum intervals.

Users can use this either as a water interval or even a stopwatch if they want to.

This is a FOSS and simple extension. Have fun and Drink Water !

# Folder Structure
```
Drink-Water
│   README.md
│   package.json    
│   LICENSE    
│
└───res/fonts
│   │   Fonts
│   │
│   
└─── scripts
    │   popup.js
    │   popup.html
    │   popup.css
|
|
└─── icons
```

# Contents
`package.json` - Contains information about the development packages such as auto completion using @types module.

`manifest.json` - The entry point of any Browser Extension. Contains mission critical information such as the `manifest version` and other information pertaining to `background scripts` and `content scripts`.

`background.js` - The main service worker which constantly runs in the background. This is the backbone of the extension.

`popup.js` - This is the popup javascript code, popups are the menus that drop down when you click the extension icon on the top right of your browser.

# Progress
- [x] Initial Setup.
- [x] Message Passing.
- [x] Main Timer that constantly runs in the background.
- [x] Saving user preference and timer information.
- [x] Initial Timer - Digital timer.
- [ ] Rest of the Timers - Analog, Tank and Pomodoro.
- [ ] Improve UI and UX.