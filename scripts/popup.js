/**
 * All the Required Variables
 */
var interval_input = document.getElementsByClassName(
    "settings_interval_input"
)[0];

var timer_type_input = document.getElementsByClassName("timer_type_input")[0];
var timer_type_select = document.getElementsByClassName("timer_type_input")[1];
var timer_fg = document.getElementsByClassName("timer-fg")[0];
var update_button = document.getElementsByClassName("updateTimer")[0];
var drank_button = document.getElementsByClassName("completed-drinking")[0];
var currentTimerType = "";

var globalPeriodInMinutes = 0;

chrome.storage.sync.get(
    ["delayInMinutes", "periodInMinutes", "timerType"],
    (values) => {
        interval_input.value = values.periodInMinutes;
        timer_type_input.value = values.timerType;
        timer_fg.style["animation-duration"] = `${
            values.periodInMinutes * 60
        }s`;

        globalPeriodInMinutes = values.periodInMinutes;
        currentTimerType = values.timerType;
    }
);

update_button.addEventListener("click", () => {
    if (timer_type_select.options[timer_type_select.selectedIndex].value) {
        chrome.storage.sync.set({
            timerType:
                timer_type_select.options[timer_type_select.selectedIndex]
                    .value,
        });
    }
    if (interval_input.value) {
        chrome.storage.sync.set({
            periodInMinutes: interval_input.value,
        });

        createTimer(interval_input.value);
    }
});

drank_button.addEventListener("click", () => {
    chrome.runtime.sendMessage({ iconClicked: "iconClicked" });
});

/**
 * Message passing between popup and background to get the current timer.
 * 1. Asks for the Timer.
 * 2. Gets the Timer.
 * 3. Runs the timer till the intervals and loops back.
 * Note: Nested callback responses were not working as expected. Thus multiple messages
 * are being sent.
 */
chrome.runtime.sendMessage({ giveCurrentTime: true });
chrome.runtime.onMessage.addListener((request, sender) => {
    try {
        if (request.currentTime) {
            // timer_fg.innerText = request.currentTime;
            createTimer(Number(request.currentTime));
        }
    } catch (error) {
        chrome.runtime.sendMessage({ popupErrorDisplay: error });
    }
});

/**
 * This is the Main Timer function for Popup.
 */
var createTimer = (currentTime) => {
    setInterval(() => {
        if (globalPeriodInMinutes && currentTime >= 0) {
            // timer_text_based.innerText += `Current Time: ${currentTime}\n`;
            displayTimer(String(currentTime));
            currentTime -= 1;
        } else {
            currentTime = Math.floor(globalPeriodInMinutes * 60);
        }
    }, 1000);
};

/**
 * @function which displays the timer on the extension.
 * Responsible for the timer visuals seen by the user.
 * Wil be run every second.
 */
var displayTimer = (currentTime) => {
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = String(currentTime - currentMin * 60);
    if (currentSec < 10) {
        currentSec = `0${currentSec}`;
    }

    if (currentTimerType == "Digital") {
        var timer_text_based =
            document.getElementsByClassName("timer-text-based")[0];
        timer_text_based.style.display = "block";

        timer_text_based.innerText = `${currentMin}:${currentSec}`;
    } else if (currentTimerType == "Clock") {
        var timer_svg = document.getElementsByClassName("timer-svg")[0];
        timer_svg.style.display = "block";
        console.log("Hi");
        timer_svg.innerHTML = `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50%" cy="50%" r="45%" fill="#1ECBE1" stroke="black" stroke-width="3"/>
        <use xlink:href="#stick" transform="rotate(0)" />
      </svg>`;
    } else if (currentTimerType == "Pomodoro") {
    } else if (currentTimerType == "Tank") {
    }
    return;
};

/**
 * Message Passing code.
 */

/**
 * Misc
 */
