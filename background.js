delayInMinutes = 0.1;
periodInMinutes = 60;

chrome.alarms.create( "DrinkWater",{ 
    delayInMinutes: delayInMinutes, 
    periodInMinutes: periodInMinutes 
});

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