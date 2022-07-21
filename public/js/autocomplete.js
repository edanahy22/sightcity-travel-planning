// courtesy of Geoapify (geoapify.com)
function addressAutocomplete(containerElement, callback, options) {

    const MIN_ADDRESS_LENGTH = 3;
    const DEBOUNCE_DELAY = 300;
    
        // create container for input element
        const inputContainerElement = document.createElement("div");
        inputContainerElement.setAttribute("class", "input-container");
        containerElement.appendChild(inputContainerElement);
    
        // create input element
        const inputElement = document.createElement("input");
        inputElement.setAttribute("type", "text");
        inputElement.setAttribute("placeholder", options.placeholder);
        inputContainerElement.appendChild(inputElement);
    
        // add input field clear button
        const clearButton = document.createElement("div");
        clearButton.classList.add("clear-button");
        addIcon(clearButton);
        clearButton.addEventListener("click", (e) => {
        e.stopPropagation();
        inputElement.value = '';
        callback(null);
        clearButton.classList.remove("visible");
        closeDropDownList();
        });
        inputContainerElement.appendChild(clearButton);
    
        /* We will call the API with a timeout to prevent unneccessary API activity.*/
        let currentTimeout;
    
        /* Save the current request promise reject function. To be able to cancel the promise when a new request comes */
        let currentPromiseReject;
    
        /* Focused item in the autocomplete list. This variable is used to navigate with buttons */
        let focusedItemIndex;
    
        /* Process a user input: */
        inputElement.addEventListener("input", function(e) {
        const currentValue = this.value;
    
        /* Close any already open dropdown list */
        closeDropDownList();
    
        // Cancel previous timeout
        if (currentTimeout) {
            clearTimeout(currentTimeout);
        }
    
        // Cancel previous request promise
        if (currentPromiseReject) {
            currentPromiseReject({
            canceled: true
            });
        }
    
        if (!currentValue) {
            clearButton.classList.remove("visible");
        }
    
        // Show clearButton when there is a text
        clearButton.classList.add("visible");
    
        // Skip empty or short address strings
        if (!currentValue || currentValue.length < MIN_ADDRESS_LENGTH) {
            return false;
        }
    
        /* Call the Address Autocomplete API with a delay */
        currentTimeout = setTimeout(() => {
            currentTimeout = null;
    
            /* Create a new promise and send geocoding request */
            const promise = new Promise((resolve, reject) => {
            currentPromiseReject = reject;
    
            // The API Key provided is restricted to JSFiddle website
            // Get your own API Key on https://myprojects.geoapify.com
            const apiKey = "afcc7f388ad94f8b9d02d924c6f641b9";
    
            var url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(currentValue)}&format=json&limit=5&apiKey=${apiKey}`;
    
            fetch(url)
                .then(response => {
                currentPromiseReject = null;
    
                // check if the call was successful
                if (response.ok) {
                    response.json().then(data => resolve(data));
                } else {
                    response.json().then(data => reject(data));
                }
            });
        });

        promise.then((data) => {
          // here we get address suggestions
            currentItems = data.results;
    
            /*create a DIV element that will contain the items (values):*/
            const autocompleteItemsElement = document.createElement("div");
            autocompleteItemsElement.setAttribute("class", "autocomplete-items");
            inputContainerElement.appendChild(autocompleteItemsElement);
    
            /* For each item in the results */
            data.results.forEach((result, index) => {
                /* Create a DIV element for each element: */
                const itemElement = document.createElement("div");

                /* Set formatted address as item value */
                if(result.country === 'United States'){
                    itemElement.innerHTML = result.address_line1;
                } else {
                    itemElement.innerHTML = result.formatted;
                }
                autocompleteItemsElement.appendChild(itemElement);
    
                /* Set the value for the autocomplete text field and notify: */
                itemElement.addEventListener("click", function(e) {
                    if(currentItems[index].country === 'United States'){
                        inputElement.value = currentItems[index].address_line1;
                    } else {
                        inputElement.value = currentItems[index].formatted;
                    }

                callback(currentItems[index]);
                /* Close the list of autocompleted values: */
                closeDropDownList();
                });
            });

        }, (err) => {
            if (!err.canceled) {
                console.log(err);
            }
        });
        }, DEBOUNCE_DELAY);
    });

    function closeDropDownList() {
        const autocompleteItemsElement = inputContainerElement.querySelector(".autocomplete-items");
        if (autocompleteItemsElement) {
            inputContainerElement.removeChild(autocompleteItemsElement);
        }
    
        focusedItemIndex = -1;
    }

    function addIcon(buttonElement) {
        const svgElement = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        svgElement.setAttribute('viewBox', "0 0 24 24");
        svgElement.setAttribute('height', "24");
    
        const iconElement = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        iconElement.setAttribute("d", "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z");
        iconElement.setAttribute('fill', 'currentColor');
        svgElement.appendChild(iconElement);
        buttonElement.appendChild(svgElement);
    }
    
        /* Close the autocomplete dropdown when the document is clicked. 
        Skip, when a user clicks on the input field */
    document.addEventListener("click", function(e) {
        if (e.target !== inputElement) {
            closeDropDownList();
        } else if (!containerElement.querySelector(".autocomplete-items")) {
            // open dropdown list again
            var event = document.createEvent('Event');
            event.initEvent('input', true, true);
            inputElement.dispatchEvent(event);
        }
    });
    }

    addressAutocomplete(document.getElementById("location"), (data) => {
    console.log("Selected option: ");
    console.log(data);
    }, {
    placeholder: "i.e. Los Angeles"
    });
