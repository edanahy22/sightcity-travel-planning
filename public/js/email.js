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
                tableTextArr[i] = tableTextArr[i] + `<tr><td style="font-weight: bolder; font-size: large;">${data.trip.activities[j].activity_name}</td></tr> <tr><td><img src="${data.trip.activities[j].activity_img}" style="max-width: 100px; max-height: 100px"></td></tr> <tr><td>${data.trip.activities[j].activity_address}</td></tr>`
            }
        }
        if(tableTextArr[i].length === 66) {
            tableTextArr[i] = tableTextArr[i] + `<tr><td>No activities planned</td></tr>`
        }
    }
    return tableTextArr.join(' ')
}

document.getElementById('itinerary-email').addEventListener('submit', function(e) {
    e.preventDefault();
    const data = JSON.parse(sessionStorage.getItem('email-data'));
    const message = sessionStorage.getItem('full-email');
    // this.contact_number.value = Math.random() * 100000 | 0;
    this.to_email.value = data.user.email
    this.to_name.value = data.user.first_name
    this.destination.value = data.trip.location
    this.hotel.value = data.trip.hotel.hotel_name
    this.start_date.value = data.trip.start_date
    this.end_date.value = data.trip.end_date
    this.message.value = message
    this.from_name.value = 'SightCity Travel';

    emailjs.sendForm('service_e25c33t', 'trip_itinerary', this)
        .then(function() {
            console.log(this);
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
    let fullEmail = `Are you ready for your trip to\n <b>${data.trip.location}</b>?\n You will be staying at ${data.trip.hotel.hotel_name}<hr>Here is your itinerary:<hr><table style="font-size:16px; margin-left: auto; margin-right: auto; display: flex; justify-content: center;" width="auto" height="auto" cellpadding="5px" cellspacing="5px">${activityTable}</table>`
    sessionStorage.setItem('full-email', fullEmail)
}

//include in whatever page this will be implemented in, so probably finalpage.handlebars
//<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>