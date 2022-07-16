# SightCity Travel Planning

## Description

A trip planning app where you can enter upcoming travel dates/cities saved to the database to assist travelers to make their own iterneries. It can serve up things to do and places to stay from various api’s like Yelp. The user could select a few options and assign them to dates during the trip. When the user completes their travel itinerary, the application sends them an email with their full itinerary for their trip via gmail

![alt text](/public/images/logo.png)


## Table of Contents 

- [Installation](#installation)
- [Usage](#usage)
- [User Story](#User_Story)
- [Acceptance Criteria](#Acceptance_Criteria)
- [Features](#features)
- [Future Development Goals](#Future_Developemnt_Goals)
- [Links](#Links)
- [Team](#team)


## Installation

In order to run the application, you can clone the repo locally. On the command line, run "npm i" in order to run all necessary package installs. Next, you can start the server using "node server.js" on the commnad line.


## Usage

Provide instructions and examples for use. Include screenshots as needed.

To add a screenshot, create an `assets/images` folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README using the following syntax:

<Insert Link to Demo>


## User_Story

AS a world traveler who likes to plan trips and excursions,
I WANT to be able to login to a trip planner application 
SO THAT I can view planned trips and events, as well as create, update and delete others.
AND SO I can search for things to do and places to stay in your selected city.


## Acceptance_Criteria

GIVEN I am presented with a landing page, 
THEN I am prompted to either login or sign up.

WHEN I login or sign up, 
THEN I am presented with a page with my planned trips listed, with an option to create a new one with a create new trip button.

WHEN I click on a planned trip, 
THEN I am presented with information I have saved for where to stay, dates, and things to do

WHEN I click on “create a new trip”,
THEN I am prompted to fill in the city and dates of travel
THEN I am presented with a search bar to look up different hotels and things to do in that city provided with data from the Yelp api

WHEN I find something I want to add to my itinerary, 
THEN I can click an add button to link to add it to a certain day on my itinerary plan

WHEN I have finished constructing my itinerary,
THEN I can select that I am finished and an email will be sent with the completed plan.


## Features

Technologies and features used in this application are listed below:

- Node.js
- Express.js
- Handlebars.js
- Sequelize
- MySQL
- Bcrypt
- NPM Node Mailer
- Yelp! API to pull in hotel and things to do information and images


## Future_Developemnt_Goals

- Have the application send them a reminder email with the itinerary a couple days before their trip
- Toggle for dark/light theme
- Ability to share itineraries between site members
- Private/Public itineraries


## Links

- Repo: https://github.com/edanahy22/sightcity-travel-planning.git
- Heroku: https://sightcity-travel-planning.herokuapp.com/


## Team

Our team consisted of:

- Elaine Danahy (https://github.com/edanahy22)
- Ian Sieg (https://github.com/ian-sieg)
- Melissa Deven (https://github.com/deven1991)