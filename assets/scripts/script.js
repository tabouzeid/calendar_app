var now = moment();
var date  = now.format('YYYYMMDD');
var hourOfDay = now.format('HH');

var todaysCalendar = getTimeSlotsForDate(date);

function setCurrentDateInHeader(){
    $("#currentDay").text(now.format('MMMM Do YYYY'));
}

function createTimeBlocksForToday(){
    for(var i = 9; i < 18; i++){
        addTimeBlockForHour(i);
    }
}

function addTimeBlockForHour(hour) {
    var row = $('<section>').addClass("row");
    $(".container").append(row);
    
    ///////////////

    var timeCol = $('<div>').addClass("col-1 text-right hour");
    var modHr = parseInt(hour) % 13;
    if(modHr < hour){
        modHr++;
        modHr = modHr+"PM";
    } else {
        modHr = modHr+"AM";
    }
    timeCol.text(modHr);
    row.append(timeCol);

    ////////////////

    var slotDescCol = $('<input>')
                        .attr("type", "text")
                        .attr("slot", hour)
                        .addClass("col-10 description "+getCssClassForHourStartingAt(hour));
    slotDescCol.val(getTimeSlotInfoFromLocalStorage(date, hour));
    row.append(slotDescCol);

    ////////////////

    var saveBtn = $('<button>')
                    .attr("type", "button")
                    .attr("slot", hour)
                    .addClass("col-1 saveBtn")
                    .text("Save");
    saveBtn.click(saveTimeSlotDesc);
    row.append(saveBtn);
}

function saveTimeSlotDesc(){
    var timeSlot = $(this).attr("slot");
    var desc = $("input[slot='"+timeSlot+"']").val();
    setTimeSlotInfoToLocalStorage(date, timeSlot, desc);
}

function getCssClassForHourStartingAt(hour){
    if(hour < hourOfDay){
        return "past";
    } else if (hour == hourOfDay){
        return "present";
    } else {
        return "future";
    }
}

function getTimeSlotsForDate(date) {
    if(todaysCalendar != undefined){
        return todaysCalendar;
    }
    var timeSlots = localStorage.getItem(date);
    if(timeSlots != undefined){
        return JSON.parse(timeSlots);
    }
    return {};
}

function setTimeSlotInfoToLocalStorage(date, hour, slotDescription){
    todaysCalendar[hour] = slotDescription;
    localStorage.setItem(date, JSON.stringify(todaysCalendar));
}

function getTimeSlotInfoFromLocalStorage(date, hour){
    if(todaysCalendar == undefined){
        todaysCalendar = getTimeSlotsForDate(date);
    }
    slotDescription = todaysCalendar[hour];
    if(slotDescription == undefined){
        return "";
    }
    return slotDescription;
}

setCurrentDateInHeader();
createTimeBlocksForToday();