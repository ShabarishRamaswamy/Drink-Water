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
var timer_text_based = document.getElementsByClassName("timer-text-based")[0];

chrome.runtime.sendMessage({ iconClicked: "iconClicked" });

chrome.storage.sync.get(
    ["delayInMinutes", "periodInMinutes", "timerType"],
    (values) => {
        interval_input.value = values.periodInMinutes;
        timer_type_input.value = values.timerType;
        timer_fg.style["animation-duration"] = `${
            values.periodInMinutes * 60
        }s`;
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

var createTimer = (value) => {
    let ms_time = 0;

    setInterval(() => {
        if (ms_time / 60 <= value) {
            timer_text_based.innerText = "" + ms_time;
            ms_time += 1;
        } else {
            ms_time = 0;
        }
    }, 1000);
};

/**
 * Message Passing code.
 */

/**
 * Misc
 */
