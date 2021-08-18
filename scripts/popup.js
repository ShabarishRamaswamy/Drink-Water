/**
 * All the Required Variables
 */
var interval_input = document.getElementsByClassName("settings_interval_input")[0];
var timer_type_input = document.getElementsByClassName("timer_type_input")[0];
var timer = document.getElementsByClassName("timer")[0];


chrome.storage.sync.get(["delayInMinutes", "periodInMinutes", "timerType"], (values) => {
    interval_input.value = values.periodInMinutes;
    timer_type_input.value = values.timerType;
    timer.style["animation-duration"] = `${values.periodInMinutes*60}s`
});




/**
 * Message Passing code.
 */

/**
 * Misc
 */