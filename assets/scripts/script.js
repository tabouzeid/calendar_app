var now = moment();
var date  = now.format('YYYYMMDD');
var hourOfDay = now.format('HH');

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
    row.append(slotDescCol);

    ////////////////

    var saveBtn = $('<button>')
                    .attr("type", "button")
                    .attr("slot", hour)
                    .addClass("col-1 saveBtn")
                    .text("Save");
    row.append(saveBtn);
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

setCurrentDateInHeader();
createTimeBlocksForToday();