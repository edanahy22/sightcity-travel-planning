//yelp API key and url
const yelpKey = "Bearer E2s8wVOO8KVdTS3aa2P8anoU-k4vGQUsV7ib19zUCgIiAgJ8pP8Hz4I2BBTmP_zycJAocBiY3LhzMusXhK_5TowMCDtq8fj4CWdeVelyfL7gYx4AJRzhOuR0YWzPYnYx";
const yelpURL = "https://api.yelp.com/v3/businesses/search";
//yelp does not support cross origin requests, so this is the work around:
const corsAnywhereUrl = "https://cors-anywhere-bc.herokuapp.com";

let contentBlock = document.getElementById('content')

//Datepickers
const tripStart = datepicker('.start', {
    id:1,
    onSelect: (instance, date) => {
        const start_date = date.toISOString().split('T')[0]
        sessionStorage.setItem('start-date', start_date)
    }
})

const tripEnd = datepicker('.end', {
    id:1,
    onSelect: (instance, date) => {
        const end_date = date.toISOString().split('T')[0]
        sessionStorage.setItem('end-date', end_date)
    }
})
//Sets minDate for second calendar
tripEnd.getRange()

let searchBtnEl = document.getElementById('search-hotel-button')
searchBtnEl.addEventListener('click', searchHotel);

async function searchHotel(event) {
    event.preventDefault();
    contentBlock.textContent = ''
    let priceFil = document.getElementById('price-filter')

    const criteria = {
        location: $("#location").children().children().val().trim(),
        price: priceFil.value,
    }
    
    const start_date = sessionStorage.getItem('start-date')
    const end_date = sessionStorage.getItem('end-date')

    if (criteria.location && start_date && end_date) {
        const response = await fetch('/api/trip' , {
            method: 'POST',
            body: JSON.stringify({
                location: criteria.location, 
                start_date, 
                end_date
            }),
            headers: {'Content-Type': 'application/json'},
        })

        if (response.ok) {
            M.toast({
                html: 'Trip Started!',
                classes: 'teal accent-3'
            })
        } else {
            alert(response.statusText)
        }
    }

    if (criteria.location === "" || criteria.location === null){
        return;
    }

    findHotels(criteria);
}

function findHotels(criteria) {
    let yelpQuery;
    if (!criteria.price) {
        yelpQuery = `${corsAnywhereUrl}/${yelpURL}?term=hotels&location=${criteria.location}`         
    } else {
        yelpQuery = `${corsAnywhereUrl}/${yelpURL}?term=hotels&location=${criteria.location}&price=${criteria.price}`
    }
    
    fetch (yelpQuery, {
        headers: { Authorization: yelpKey }       
    })
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data);
            genHotel(data)
        })
        .catch(function (err) {
            console.error(err)
        })
}

function genHotel(data) {
    console.log(data)
    let rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    
    for (let i = 0; i < 18; i++){
        
        let colDiv = document.createElement('div')
        let hotelDiv = document.createElement('div');
        let imgDiv = document.createElement('div')
        let hotelTitleEl = document.createElement('span')
        let hotelAddressEl = document.createElement('p')
        let hotelPriceEl = document.createElement('p')
        let hotelImgEl = document.createElement('img')
        let hotelBtnEl = document.createElement('button')
        let contentDiv = document.createElement('div')
        let btnDiv = document.createElement('div')


        hotelBtnEl.setAttribute('data-title', data.businesses[i].name)
        hotelBtnEl.setAttribute('data-address', `${data.businesses[i].location.display_address[0]} ${data.businesses[i].location.display_address[1]}`)
        hotelBtnEl.setAttribute('data-price', data.businesses[i].price)
        hotelBtnEl.setAttribute('data-img', data.businesses[i].image_url)

        hotelTitleEl.textContent = data.businesses[i].name
        hotelAddressEl.textContent = `${data.businesses[i].location.display_address[0]} ${data.businesses[i].location.display_address[1]}`
        hotelPriceEl.textContent = data.businesses[i].price
        hotelImgEl.setAttribute('src', data.businesses[i].image_url)
        hotelBtnEl.innerHTML = 'Select'
        hotelBtnEl.setAttribute('href', '/api/hotel')
        hotelBtnEl.addEventListener('click', selectHotel);
        hotelBtnEl.addEventListener('click', searchActivity);
        hotelBtnEl.addEventListener('click', searchActBtn);

        //materialize classes for styling
        colDiv.classList.add('col', 's12', 'm6', 'l4');
        hotelDiv.classList.add('card', 'medium');
        imgDiv.classList.add('card-image');
        hotelImgEl.classList.add('responsive-img');
        hotelTitleEl.classList.add('card-title');
        hotelBtnEl.classList.add('waves-effect', 'waves-light', 'btn');
        contentDiv.classList.add('card-content');
        btnDiv.classList.add('card-action');

        rowDiv.appendChild(colDiv);
        colDiv.appendChild(hotelDiv);
        hotelDiv.appendChild(imgDiv);
        hotelDiv.appendChild(contentDiv);
        hotelDiv.appendChild(btnDiv);
        imgDiv.appendChild(hotelImgEl);
        imgDiv.appendChild(hotelTitleEl);
        contentDiv.appendChild(hotelAddressEl);
        contentDiv.appendChild(hotelPriceEl);
        btnDiv.appendChild(hotelBtnEl);
        contentBlock.appendChild(rowDiv)
    }
};

const searchActBtn = () => {
    searchBtnEl.removeEventListener('click', searchHotel)
    searchBtnEl.textContent = 'Search Activity'
    searchBtnEl.addEventListener('click', searchActivity)
}

const searchActivity = (event) => {
    event.preventDefault();

    let priceFil = document.getElementById('price-filter')
    const criteria = {
        location: $("#location").children().children().val().trim(),
        price: priceFil.value,
    }
    // const location= $("#location").children().children().val().trim();
    if (criteria.location === "" || criteria.location === null){
        alert('Please enter a location');
    }
    findActivities(criteria);
};

function findActivities(criteria) {
    let yelpQuery;
    if (!criteria.price) {
        yelpQuery = `${corsAnywhereUrl}/${yelpURL}?term=activities&location=${criteria.location}`         
    } else {
        yelpQuery = `${corsAnywhereUrl}/${yelpURL}?term=activities&location=${criteria.location}&price=${criteria.price}`
    }
    fetch(yelpQuery, {
        headers: { Authorization: yelpKey }
    })
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data);
            genActivity(data)
        })
        .catch(function (err) {
            console.error(err)
        })
}

async function selectHotel(e) {
    e.preventDefault()
    const hotel_name = this.dataset.title;
    const hotel_address = this.dataset.address;
    const hotel_img = this.dataset.img;
    const hotel_price = this.dataset.price;

    const response = await fetch('/api/hotel', {
        method: 'POST',
        body: JSON.stringify({ hotel_name, hotel_address, hotel_img, hotel_price }),
        headers: {
            'Content-Type': 'application/json'
        },
    })

    if (response.ok) {
        M.toast({
            html: 'Hotel Added!',
            classes: 'teal accent-3'
        })
        contentBlock.textContent= '';
        const location = $("#location").children().children().val().trim();
        let activityTitle = document.createElement('h1')
        activityTitle.textContent = `What would you like to do in ${location}?`
        contentBlock.appendChild(activityTitle)
    } else {
        alert('Failed to post to database')
    }
};

function genActivity(data) {
    let rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    contentBlock.textContent = ''
    for (let i = 0; i < 18; i++){
        let colDiv = document.createElement('col');
        let activityDiv = document.createElement('div');
        let imgDiv = document.createElement('div');
        let btnDiv = document.createElement('div');
        let contentDiv = document.createElement('div');
        let activityTitleEl = document.createElement('span');
        let activityAddressEl = document.createElement('p');
        let activityPriceEl = document.createElement('p')
        let activityImgEl = document.createElement('img')
        let activityBtnEl = document.createElement('button')

        activityBtnEl.setAttribute('data-title', data.businesses[i].name)
        activityBtnEl.setAttribute('data-address', `${data.businesses[i].location.display_address[0]} ${data.businesses[i].location.display_address[1]}`)
        activityBtnEl.setAttribute('data-price', data.businesses[i].price)
        activityBtnEl.setAttribute('data-img', data.businesses[i].image_url)

        activityTitleEl.textContent = data.businesses[i].name
        activityAddressEl.textContent = `${data.businesses[i].location.display_address[0]} ${data.businesses[i].location.display_address[1]}`
        activityPriceEl.textContent = data.businesses[i].price
        activityImgEl.setAttribute('src', data.businesses[i].image_url)
        activityBtnEl.innerHTML = 'Schedule'
        activityBtnEl.setAttribute('href', '/api/activity')
        activityBtnEl.setAttribute('id', 'act-datepicker')
        activityBtnEl.classList.add('datepicker')
        activityBtnEl.addEventListener('focus', scheduleActivity);

        //materialize classes
        colDiv.classList.add('col', 's12', 'm6', 'l4');
        activityDiv.classList.add('card', 'medium');
        imgDiv.classList.add('card-image');
        activityImgEl.classList.add('responsive-img');
        activityTitleEl.classList.add('card-title');
        activityBtnEl.classList.add('waves-effect', 'waves-light', 'btn');
        contentDiv.classList.add('card-content');
        btnDiv.classList.add('card-action');

        rowDiv.appendChild(colDiv);
        colDiv.appendChild(activityDiv);
        activityDiv.appendChild(imgDiv);
        activityDiv.appendChild(contentDiv);
        activityDiv.appendChild(btnDiv);
        imgDiv.appendChild(activityImgEl);
        imgDiv.appendChild(activityTitleEl);
        contentDiv.appendChild(activityAddressEl);
        contentDiv.appendChild(activityPriceEl);
        btnDiv.appendChild(activityBtnEl);
        contentBlock.appendChild(rowDiv)
    }
};

function scheduleActivity(e) {
    // e.preventDefault();
    const elems = document.querySelectorAll('#act-datepicker');
    const start_date = sessionStorage.getItem('start-date');
    const end_date = $("#end-date").val().trim();
    let instances = M.Datepicker.init(elems, {
        autoClose: true,
        onSelect: function(input) {
            console.log(input)
        },
    });
    // selectActivity
}

async function selectActivity(e) {
    e.preventDefault();
    const activity_name = this.dataset.title;
    const activity_address = this.dataset.address;
    const activity_img = this.dataset.img;
    const activity_price = this.dataset.price;
    console.log(this);

    const response = await fetch('/api/activity', {
        method: 'POST',
        body: JSON.stringify({ activity_name, activity_address, activity_img, activity_price }),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    console.log(response)
    if (response.ok) {
        M.toast({
            html: 'Activity Added!',
            classes: 'teal accent-3'
        })
        // document.location.replace('/activity')
    } else {
        alert('Failed to post to database')
    }
};