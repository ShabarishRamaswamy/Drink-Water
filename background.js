/**
 * Setting default values in the Storage which can be changed.
 */
chrome.storage.sync.set(
    {
        delayInMinutes: 0,
        periodInMinutes: 1,
        timerType: "Digital",
    },
    () => {
        chrome.storage.sync.get(
            ["delayInMinutes", "periodInMinutes"],
            (values) => {
                createTimer(values.delayInMinutes, values.periodInMinutes);
            }
        );
    }
);

/**
 * @function creates timer to be used as the main timer of the extension.
 */
chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (key == "periodInMinutes") {
            createTimer(0, Number(newValue));
        }
    }
});

createTimer = (delayInMinutes, periodInMinutes) => {
    chrome.alarms.create("DrinkWater", {
        delayInMinutes: delayInMinutes,
        periodInMinutes: periodInMinutes,
    });
    // console.log("Created Timer");
};

chrome.alarms.onAlarm.addListener((alarm) => {
    chrome.action.setBadgeBackgroundColor(
        { color: [255, 0, 0, 0] }, // Blue
        () => {
            // console.log("Timer over !");
        }
    );

    chrome.action.setBadgeText({ text: "!" });

    chrome.storage.sync.set({ badgeText: "!" });

    // console.log("Alarm fired");

    /**
     * Now, when the user clicks the plugin and says that they have consumed water, we must reset the
     * badge and the exclaimation on the plugin's icon.
     */
    chrome.runtime.onMessage.addListener((request, sender) => {
        if (request.iconClicked) {
            console.log("Hi");
            try {
                // TODO: getBadgeText Does not work.
                // chrome.action.getBadgeText(null, (text) => {
                //     if (text == "!") {
                //         chrome.action.setBadgeText("");
                //     }
                // });

                // Temporary workaround
                chrome.storage.sync.get("badgeText", (res) => {
                    // console.log(`Badge Text: ${res.badgeText}`);
                    if (res.badgeText == "!") {
                        chrome.action.setBadgeText({ text: "" });
                    }
                });
            } catch (e) {
                console.log(e);
                console.log("No Badge.");
            }
        }
    });
});
