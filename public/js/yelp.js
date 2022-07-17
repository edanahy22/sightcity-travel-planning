//yelp API key and url
const yelpKey = "Bearer E2s8wVOO8KVdTS3aa2P8anoU-k4vGQUsV7ib19zUCgIiAgJ8pP8Hz4I2BBTmP_zycJAocBiY3LhzMusXhK_5TowMCDtq8fj4CWdeVelyfL7gYx4AJRzhOuR0YWzPYnYx";
const yelpURL = "https://api.yelp.com/v3/businesses/search";
//yelp does not support cross origin requests, so this is the work around:
const corsAnywhereUrl = "https://cors-anywhere-bc.herokuapp.com";

let requestObj = {
    url: yelpURL,
    data: {term: 'hotels', location: '60622'},
    headers: {'Authorization': yelpKey}
}

function findHotels(location) {
    fetch(`${corsAnywhereUrl}/${yelpURL}?term=hotels&location=${location}`, {
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

function findActivities(location) {
    fetch(`${corsAnywhereUrl}/${yelpURL}?term=activities&location=${location}`, {
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

$('#search-hotel-button').on("click", async function (event) {
    event.preventDefault();
    const location = $("#location").val().trim();
    const start_date = $(this).siblings("#start-date").val().trim();
    const end_date = $(this).siblings("#end-date").val().trim();

    if (location && start_date && end_date) {
        const response = await fetch('/api/trip' , {
            method: 'POST',
            body: JSON.stringify({location, start_date, end_date}),
            headers: {'Content-Type': 'application/json'},
        })

        if (response.ok) {
            M.toast({
                html: 'Trip Started!',
                classes: 'amber'
            })
        } else {
            alert(response.statusText)
        }
    }

    if ($('#location').val() === "" || $('#location').val() === null){
        return;
    }

    findHotels(location);
});

const searchActivity = (event) => {
    event.preventDefault();
    let location= $("#location").val().trim();
    console.log(location);

    if (location === "" || location === null){
        return;
    }
    
    findActivities(location);
};

let contentBlock = document.getElementById('content')

function genHotel(data) {
    for (let i = 0; i < 5; i++){
        let hotelDiv = document.createElement('div');
        let hotelTitleEl = document.createElement('h3')
        let hotelAddressEl = document.createElement('h6')
        let hotelPriceEl = document.createElement('h6')
        let hotelImgEl = document.createElement('img')
        let hotelBtnEl = document.createElement('button')

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

        hotelDiv.appendChild(hotelTitleEl)
        hotelDiv.appendChild(hotelAddressEl)
        hotelDiv.appendChild(hotelPriceEl)
        hotelDiv.appendChild(hotelImgEl)
        hotelDiv.appendChild(hotelBtnEl)
        contentBlock.appendChild(hotelDiv)
    }
};

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
    console.log(response)
    if (response.ok) {
        M.toast({
            html: 'Hotel Added!',
            classes: 'amber'
        })
        contentBlock.textContent= '';
        let activityBtn = document.createElement('button');
        contentBlock.appendChild(activityBtn);
        activityBtn.innerHTML = 'Find Activities';
        activityBtn.addEventListener('click', searchActivity);
        
    } else {
        alert('Failed to post to database')
    }
};

function genActivity(data) {
    for (let i = 0; i < 5; i++){
        let activityDiv = document.createElement('div');
        let activityTitleEl = document.createElement('h3')
        let activityAddressEl = document.createElement('h6')
        let activityPriceEl = document.createElement('h6')
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
        activityBtnEl.innerHTML = 'Select'
        activityBtnEl.setAttribute('href', '/api/activity')
        activityBtnEl.addEventListener('click', selectActivity);

        activityDiv.appendChild(activityTitleEl)
        activityDiv.appendChild(activityAddressEl)
        activityDiv.appendChild(activityPriceEl)
        activityDiv.appendChild(activityImgEl)
        activityDiv.appendChild(activityBtnEl)
        contentBlock.appendChild(activityDiv)
    }
};

async function selectActivity(e) {
    e.preventDefault()
    const activity_name = this.dataset.title;
    const activity_address = this.dataset.address;
    const activity_img = this.dataset.img;
    const activity_price = this.dataset.price;

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
            classes: 'amber'
        })
        document.location.replace('/activity')
    } else {
        alert('Failed to post to database')
    }
};