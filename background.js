/**
 * Setting default values in the Storage which can be changed.
 */
chrome.storage.sync.set({
    "delayInMinutes": 0,
    "periodInMinutes": 60,
    "timerType": "Clock"
}, (obj) => {
    chrome.storage.sync.get(["delayInMinutes", "periodInMinutes"], (values) => {
        createTimer(values.delayInMinutes, values.periodInMinutes);
    });
});

/**
 * @function creates timer to be used as the main timer of the extension.
 */
createTimer = (delayInMinutes, periodInMinutes) => {
    chrome.alarms.create( "DrinkWater",{ 
        delayInMinutes: delayInMinutes, 
        periodInMinutes: periodInMinutes 
    });
}


chrome.alarms.onAlarm.addListener((alarm) => {

    chrome.action.setBadgeBackgroundColor(
        { color: [255, 0, 0, 0] },  // Blue
        () => { /* ... */ },
    );

    chrome.action.setBadgeText(
        { text: "!" }
    );

    console.log("Alarm fired");
})

/**
 * Now, when the user clicks the plugin and says that they have consumed water, we must reset the 
 * badge and the exclaimation on the plugin's icon.
 */