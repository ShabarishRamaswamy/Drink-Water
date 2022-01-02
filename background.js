/**
 * Setting default values in the Storage which can be changed.
 */

chrome.runtime.onInstalled.addListener(() => {
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
});

/**
 * @function creates timer to be used as the main timer of the extension.
 */
chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (key == "periodInMinutes") {
            chrome.alarms.clearAll(() => {
                createTimer(0, Number(newValue));
            });
        }
    }
});

createTimer = (delayInMinutes, periodInMinutes) => {
    if (periodInMinutes > 0) {
        chrome.alarms.create("DrinkWater", {
            delayInMinutes: Number(delayInMinutes),
            periodInMinutes: Number(periodInMinutes),
        });
    } else {
        chrome.storage.sync.get(
            ["delayInMinutes", "periodInMinutes"],
            (values) => {
                createTimer(values.delayInMinutes, values.periodInMinutes);
            }
        );
    }
    // console.log("Created Timer");
};

chrome.alarms.onAlarm.addListener((alarm) => {
    chrome.action.setBadgeBackgroundColor(
        { color: [255, 0, 0, 0] }, // Blue
        () => {
            // console.log("Timer over !");
        }
    );

    chrome.action.setBadgeText({ text: "!" }).then(() => {
        chrome.storage.sync.set({ badgeText: "!" }).then(() => {
            // console.log("Alarm fired");
        });
    });
});

/**
 * @function to return the current time to Popup.
 */
chrome.runtime.onMessage.addListener((request, sender) => {
    if (request.giveCurrentTime) {
        chrome.alarms.get("DrinkWater", function (response) {
            let timeLeft = -1;
            // console.log(response);
            timeLeft = Math.floor((response.scheduledTime - Date.now()) / 1000);
            // console.log(timeLeft);
            chrome.runtime.sendMessage({ currentTime: timeLeft });
        });
    }
});

/**
 * Now, when the user clicks the plugin and says that they have consumed water, we must reset the
 * badge and the exclaimation on the plugin's icon.
 */
chrome.runtime.onMessage.addListener((request, sender) => {
    if (request.iconClicked) {
        // console.log("Hi");
        try {
            // TODO: getBadgeText Does not work.
            // chrome.action.getBadgeText(null, (text) => {
            //     if (text == "!") {
            //         chrome.action.setBadgeText("");
            //     }
            // });

            // Temporary workaround

            /**
             * This complexity with the setTimeout can be avoided if
             * there is any way to determine if the alarm went off during creation
             * or when it is actually supposed to go.
             */
            chrome.alarms.clearAll(() => {
                createTimer(0, -1); // -1 Will force the timer to pull from storage and set.
            });
            setTimeout(() => {
                chrome.action.setBadgeText({ text: "" }).then(() => {
                    chrome.storage.sync.set({ badgeText: "" });
                });
            }, 1000);
        } catch (e) {
            console.log(e);
            console.log("No Badge.");
        }
    }
});

/**
 * Logging errors from POPUP
 */
chrome.runtime.onMessage.addListener((request, sender) => {
    if (request.popupErrorDisplay) {
        console.log(`POPUP ERROR: ${request.popupErrorDisplay}`);
        console.dir(request.popupErrorDisplay);
    }
});
