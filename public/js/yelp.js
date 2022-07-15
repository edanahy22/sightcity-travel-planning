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

function findHotels(city) {
    fetch(`${corsAnywhereUrl}/${yelpURL}?term=hotels&location=${city}`, {
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

function findActivities(city) {
    fetch(`${corsAnywhereUrl}/${yelpURL}?term=activities&location=${city}`, {
        headers: { Authorization: yelpKey }
    })
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data);
        })
        .catch(function (err) {
            console.error(err)
        })
}

$('#search-hotel-button').on("click", function (event) {
    event.preventDefault();
    var city = $(this).siblings("#city").val();
    console.log(city);

    if ($('#city').val() === "" || $('#city').val() === null){
        return;
    }

    findHotels(city);
});

$('#search-activity-button').on("click", function (event) {
    event.preventDefault();
    var city = $(this).siblings("#cityActivity").val();
    console.log(city);

    if ($('#cityActivity').val() === "" || $('#cityActivity').val() === null){
        return;
    }

    findActivities(city);
});

// var priceRange = document.querySelector("#price-range");
// var rating = document.querySelector("#rating");
// var numberReviews = document.querySelector("#number-of-reviews");

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
        contentBlock.textContent = '\n\nPosted to database!';
        sendMail();
    } else {
        alert('Failed to post to database')
    }
};

async function sendMail() {
    const response = await fetch('/api/hotel', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json())

    return console.log(res.json(response))
}