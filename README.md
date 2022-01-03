# Drink-Water
This is a Chrome extension which reminds you to drink water at your specified time.

It is important to drink water at regular intervals, especially when working or studying. Thus, I have created this extension to remind users to drink water at their own optimum intervals.

Users can use this either as a water interval or even a stopwatch if they want to.

This is a FOSS and simple extension. Have fun and Drink Water !

# Installation Instructions
**Step 1:** Download the contents of this repository as a zip or clone it using `git@github.com:ShabarishRamaswamy/Drink-Water.git`

<img src="./res/img/installation_1_edited.webp">

<br />

**Step 2:**
Go to your respective browsers' extension page.
This might be in settings->extensions.

It should look something like this:

<img src="./res/img/Extension_Page_URL_edited.webp">

<br />

**Step 3:**
Click on the `Load Unpacked` button:

<img src="./res/img/Click_Load_unpacked_edited.webp">


<br />

**Step 3**:
Unzip the contents if you have downloaded as a Zip file.

If you don't have an unzipper then I suggest using [Peazip]("https://github.com/peazip/PeaZip"). It is Free and Open Source.

<br />

**Step 4:**
Navigate to the folder in which you have downloaded:

<img src="./res/img/Navigate_to_Saved_edited.webp">

<br />

**Step 5:**
Click on `Select Folder`.

<img src="./res/img/Click_Select_Folder_edited.webp">

<br />

**Step 6:**
Enjoy 😎 

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
- [x] Improve UI and UX.