// Copyright [2021] [Guy B. O. Silva]
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


// set the amount of days the script should consider for checking events
// Useful to reduce the complexity of the script plus it allows the meetings that are
// proper planned ahead (more days than this variable) to easily find space in your 
// agenda as no automblocked event would be created by that time.
var daysAhead = 3;
// set the max length in minutes an autoblocked event can have
var autoBlockMaxSizeMinutes = 30;
// set the min length in minutes an autoblocked event may have
var autoBlockMinSizeMinutes = 10;
// set the minumun amount of minutes an event needs to have to be entitled to 
// have an autoblocked event after it
var minumunEventLenghtToBlock = 15;
// set the text to be used in the autoblock event. ATTENTION: always use a string with uncomon 
// text for a meeting, otherwise it may delete wrong content from your calendar!
var eventModifier = '[AutoBlock]';
// set the color to be used in the autoblock event
var eventColor = CalendarApp.EventColor.ORANGE;

function executeAutoBlocker() {
  var workCal = CalendarApp.getDefaultCalendar();

  var events = upcomingEvents(workCal, daysAhead);
  for (id in events){
    var event = events[id];
    if (isAutoblockEvent_(event)){
      handleAutoBlockEvent_(workCal, event)
    }else{
      handleNonAutoBlockEvent_(workCal, event);
    }
  }
};

function isAutoblockEvent_(event){
  return event.getTitle().includes(eventModifier) && isSelfEvent(event);
};

function handleAutoBlockEvent_(calendar, event){
  var events = eventsBeforeOrAfter(calendar, event, -5);
  if (events.length == 0 || isRejectedEvent(events[0])){
    // if the initial event changed times, got deleted or got rejected by you, delete the autoblocked
    event.deleteEvent();
  }
};

function handleNonAutoBlockEvent_(calendar, lastEvent){
  console.log(lastEvent.getTitle()+ ' confirm');
  if (isSelfEvent(lastEvent) || isRejectedEvent(lastEvent)){
    // self events or rejected events do not requires block time
    return
  }
  
  var blockEventLenght = availableWindowInMinutes_(calendar, lastEvent);
  if (blockEventLenght > 0 ){
    createAutoblockEvent_(calendar, lastEvent, blockEventLenght)
  };
};

function createAutoblockEvent_(calendar, afterEvent, length){
  var startTime = afterEvent.getEndTime();
  var endTime = afterEvent.getEndTime();
  endTime.setMinutes(endTime.getMinutes() + length);

  var event = calendar.createEvent(eventModifier+ ' ' + afterEvent.getTitle(), startTime, endTime);
  event.setColor(eventColor);
  event.removeAllReminders();
};

function availableWindowInMinutes_(calendar, event){
  var eventMinutes = eventLenghtInMinutes(event);
  // ignore events of minimun length
  if (eventMinutes < minumunEventLenghtToBlock){
    return 0;
  };

  //event has a sizeable length, check if there is an empty space to allocate
  var maxMinutes = Math.min(Math.floor(eventMinutes/2), autoBlockMaxSizeMinutes);

  while (maxMinutes >= autoBlockMinSizeMinutes) {
    //search for the biggest chunk of minutes that can be allocated up to 
    // 'autoBlockMinSizeMinutes' minutes, as less than that would not be useful
    if (eventsBeforeOrAfter(calendar, event, maxMinutes).length == 0) {
      return maxMinutes;
    };
    maxMinutes = maxMinutes - 5;
  };
  // no space was found
  return 0;
};
