# SightCity Travel Planning

## Description

A trip planning app where you can enter upcoming travel dates/cities saved to the database to assist travelers to make their own iterneries. It can serve up things to do and places to stay from various api’s like Yelp. The user could select a few options and assign them to dates during the trip. When the user completes their travel itinerary, the application sends them an email with their full itinerary for their trip via gmail

![alt text](/public/images/logo.png)

This project was completed over the course of 14 days in a group of three people. To facilitate successful collaboration over the duration of the project, we used a shared Google drive spreadsheet to set ourselves task deadlines, Figma to wireframe our app, GitHub, and Slack to facilitate communication whilst coding.

Below is our Figma wireframe: 

Landing Page
![alt text](/public/images/figmalanding.png)

Entry Page
![alt text](/public/images/figmaentry.png)

Hotel Page
![alt text](/public/images/figmahotels.png)

Activity Page
![alt text](/public/images/figmaactivity.png)

No Trips Planned
![alt text](/public/images/figmanone.png)


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

In order to run the application, you can clone the repo locally. On the command line, run "npm i" in order to run all necessary package installs. Next, you can start the server using "node server.js" on the commnad line. Please see below instructions for step-by-step instructions to successfully run this applicaton. 

NPM Install
![alt text](/public/images/npmi.png)


Start the Server by Running "node server.js"
![alt text](/public/images/nodeserver.png)


## Usage

 The user is initially prompted with a landing page to the SightCity Travel Planning application. The user is prompted to click on the "Start Planning Your Trip" button displayed on the screen. Next, the user is prompted to either "Login" or "Signup" for the first time. On the next page, the user views a navigation bar at the top right with options to visit "Profile," "Plan a New Trip, " "About Us," or "Logout." 

 If the user selects "Profile," the user is presented with trips previously planned and saved. If the user selects "Plan a New Trip," the user is prompted to type a city wtih an autocomplete option, pick start and end dates of the hotel stay, and filter for specific pricing based on Yelp. The user selects one hotel to add to its itinerary. Next the user is taken to a screen to pick activities. The user has the capability to select multiple activities. Next, the user is displayed with a summary of the trip. If the user goes to "About Us," they can view LinkedIn and Github profiles for project contributors. 

Demo Video
Link: https://drive.google.com/file/d/1yvlHUFmcNX6Qz0o5logSqNMdSWFYx3gW/view

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

Additionally, the application is mobile friendly. Once the browser is shrunk, the navigation bar disappears and a menu button appears in the top left corner as shown in the below image.

![alt text](/public/images/mobile.png)


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