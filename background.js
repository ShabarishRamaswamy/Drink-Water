delayInMinutes = 0.1;
chrome.alarms.create("DrinkWater", { delayInMinutes: 1, periodInMinutes: 60 });
chrome.alarms.onAlarm.addListener((alarm) => {
    console.log("Alarm fired")
})
/**
 * Timer used for the interval
 */

setInterval(() => {
    chrome.action.setBadgeBackgroundColor(
        { color: [255, 0, 0, 0] },  // Green
        () => { /* ... */ },
    );

    chrome.action.setBadgeText(
        { text: "!" }
    );
}, delayInMinutes * 1000 * 60);