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