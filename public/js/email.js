function emailInit() {
    emailjs.init('FRIz7ePDvgzvEl_Cc');
}
emailInit();

//Gets all dates in between start and end date of trip
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date (currentDate).toDateString());
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

//Input trip dates and activities
function emailFormat(data) {
    const start_date = new Date(data.trip.start_date);
    const end_date = new Date(data.trip.end_date);
    const tripDates = getDates(start_date, end_date)
    let tableTextArr = []
    //Render table headers with the dates of the trip
    for (let i=0; i < tripDates.length; i++) {
        tableTextArr.push(`<tr><th style="border: 3px solid black;">${tripDates[i]}</th></tr>`);
    }
    //Creates table data tag with the image, name and address of the activity if the activity date matches the trip date in the calendar
    for (let i=0; i<tripDates.length; i++) {
        for (let j=0; j<data.trip.activities.length; j++) {
            if(data.trip.activities[j].activity_date == tripDates[i]) {
                tableTextArr[i] = tableTextArr[i] + `<tr><td style="font-weight: bolder; font-size: large;">${data.trip.activities[j].activity_name}</td></tr> <tr><td><img src="${data.trip.activities[j].activity_img}" style="max-width: 400px; max-height: 400px"></td></tr> <tr><td>${data.trip.activities[j].activity_address}</td></tr><br>`
            }
        }
        if(tableTextArr[i].length === 66) {
            tableTextArr[i] = tableTextArr[i] + `<tr><td>No activities planned<br></td></tr>`
        }
    }
    return tableTextArr.join(' ')
}

document.getElementById('itinerary-email').addEventListener('submit', function(e) {
    e.preventDefault();
    const data = JSON.parse(sessionStorage.getItem('email-data'));
    const message = sessionStorage.getItem('full-email');

    const start_date = new Date(data.trip.start_date).toDateString()
    const end_date = new Date(data.trip.end_date).toDateString()

    this.to_email.value = data.user.email
    this.to_name.value = data.user.first_name
    this.destination.value = data.trip.location
    this.start_date.value = start_date
    this.end_date.value = end_date
    this.message.value = message
    this.from_name.value = 'SightCity Travel Planning'

    emailjs.sendForm('service_e25c33t', 'trip_itinerary', this)
        .then(function() {
            M.toast({
                html: 'Email Sent!',
                classes: 'teal accent-3'
            });
        }, function(error) {
            console.log('FAILED...', error);
        });
});

window.addEventListener('load', callData)

function callData(e) {
    e.preventDefault();
    fetch('/api/summary')
    .then(res => res.json())
    .then(data => {
        sessionStorage.setItem('email-data', JSON.stringify(data))
        let activityTable = emailFormat(data)
        emailContent(data, activityTable)
    })
}

//Compose and send email
function emailContent(data, activityTable) {
    let fullEmail = `<h1 style="font-size:20;">Are you ready for your trip to <b>${data.trip.location}</b>?</h1> <h2 style="font-size:18px;">You will be staying at <b>${data.trip.hotel.hotel_name}</b></h2><h2 style="font-size:18px;">Here is your itinerary:</h2><table style="font-size:16px; margin-left: auto; margin-right: auto; display: flex; justify-content: center;" width="auto" height="auto" cellpadding="5px" cellspacing="5px">${activityTable}</table>`
    sessionStorage.setItem('full-email', fullEmail)
}