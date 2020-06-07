var now = moment();

function setCurrentDateInHeader(){
    $("#currentDay").text(now.format('MMMM Do YYYY'));
}

setCurrentDateInHeader();