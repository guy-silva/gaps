function createTimeTriggerEveryNMinutes() {
  ScriptApp.newTrigger("executeAutoBlocker")
    .timeBased()
    .everyMinutes(10)
    .create();
}
