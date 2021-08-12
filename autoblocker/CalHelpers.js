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


function upcomingEvents(calendar, days){
  var startDate = new Date();
  var endDate = new Date();
  endDate.setDate(startDate.getDate() + days);

  return calendar.getEvents(startDate,endDate);
};

function eventsBeforeOrAfter(calendar, event, minutesOffset){
  var startTime, endTime;
  if (minutesOffset > 0){
    //check after event end time
    startTime = event.getEndTime();
    endTime = event.getEndTime();
    endTime.setMinutes(startTime.getMinutes() + minutesOffset);
  }else{
    //check before event start time
    startTime = event.getStartTime();
    startTime.setMinutes(startTime.getMinutes() + minutesOffset);
    endTime = event.getStartTime();
  };

  return calendar.getEvents(startTime, endTime);
};

function isSelfEvent(event){
  return event.getGuestList().length == 0;
};

function isRejectedEvent(event){
  return event.getMyStatus() == CalendarApp.GuestStatus.NO;
};

function eventLenghtInMinutes(event){
  var diff = Math.abs(event.getStartTime() - event.getEndTime());
  return Math.floor((diff/1000)/60);
};