chrome.alarms.create("DrinkWater", { delayInMinutes: 1, periodInMinutes: 60 });
chrome.alarms.onAlarm.addListener((alarm) => {
    console.log("Alarm fired")
})