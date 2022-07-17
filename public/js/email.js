function emailInit() {
    emailjs.init('FRIz7ePDvgzvEl_Cc');
}
emailInit();

//CHANGE TARGET OF EVENT LISTENER
window.onload = function() {
    document.getElementById('itinerary-form').addEventListener('submit', function(event) {
        event.preventDefault();

        this.contact_number.value = Math.random() * 100000 | 0;
        this.from_name.value = 'SightCity Travel';
        this.message.value = `Are you ready for your trip to <h3 style ="color: purple">${this.destination.value}</h3>\nfrom <b>${this.start_date.value}</b> to <b>${this.end_date.value}</b>\nYou will be staying at\n<h6 style="color: aqua">${this.hotel.value}</h6>`;

        emailjs.sendForm('service_e25c33t', 'trip_itinerary', this)
            .then(function() {
                console.log('SUCCESS!');
            }, function(error) {
                console.log('FAILED...', error);
            });
    });
};

//include in whatever page this will be implemented in, so probably finalpage.handlebars
//<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>