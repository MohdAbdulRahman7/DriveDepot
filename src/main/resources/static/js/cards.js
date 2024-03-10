//To load the top 20 deals based on price and year

document.addEventListener('DOMContentLoaded', function () {
    // Function to make the API call
    function fetchData() {
        fetch('https://drivedepot.onrender.com/inventory/allcars')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {

                // Sort data first by year and then by price
                data.sort((a, b) => {
                    return parseFloat(a.carPrice.replace('$', '')) - parseFloat(b.carPrice.replace('$', ''));
                });

                // Take only the top 8 mixed cars
                const top8MixedCars = data.slice(0, 8);

                // Generate cards dynamically using the top 20 cars
                top8MixedCars.forEach(car => generateCarCard(car));

                
                // Sort data first by year and then by price
                data.sort((a, b) => {
                    // First, compare by year
                    if (a.carYear !== b.carYear) {
                        return b.carYear - a.carYear;
                    }
                    // If years are the same, compare by price
                    return parseFloat(a.carPrice.replace('$', '')) - parseFloat(b.carPrice.replace('$', ''));
                });

                // Take only the top 20 cars
                const top10NewCars = data.slice(0, 12);

                // Generate cards dynamically using the top 20 cars
                top10NewCars.forEach(car => generateCarCard(car));

                

            })
            .catch(error => {
                // Handle errors
                console.error('Error fetching data:', error);
            });
    }

    // Intersection Observer to trigger the API call when the "cars" div is in view
    const carsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Call the API when the "cars" div is in view
                fetchData();
                // Stop observing after the first intersection
                carsObserver.disconnect();
            }
        });
    });

    // Target the "cars" div
    const carsDiv = document.querySelector('.carDeals');

    // Start observing the "cars" div
    if (carsDiv) {
        carsObserver.observe(carsDiv);
    }
});

// Function to generate a car card
function generateCarCard(car) {
    // Assuming you have a container with the id "carContainer" in your HTML
    const carContainer = document.getElementById('carContainer');

    const carItem = document.createElement('div');
    carItem.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'new');
    carItem.innerHTML = `
        <div class="car__item">
        <div class="car__item__pic__slider owl-carousel owl-loaded owl-drag">
                            
        <div class="owl-stage-outer">
        <div class="owl-stage" style="transform: translate3d(-525px, 0px, 0px); transition: all 0s ease 0s; width: 1313px;">
        <div class="owl-item cloned" style="width: 262.5px;"><img src="${car.carImageUrl}" alt="${car.carTitle}"></div>
        <div class="owl-item cloned" style="width: 262.5px;"><img src="${car.carImageUrl}" alt="${car.carTitle}"></div>
        <div class="owl-item active" style="width: 262.5px;"><img src="${car.carImageUrl}" alt="${car.carTitle}"></div>
        <div class="owl-item cloned" style="width: 262.5px;"><img src="${car.carImageUrl}" alt="${car.carTitle}"></div>
        <div class="owl-item cloned" style="width: 262.5px;"><img src="${car.carImageUrl}" alt="${car.carTitle}"></div>
        </div></div>
        <div class="owl-nav disabled"><button type="button" role="presentation" class="owl-prev"><span aria-label="Previous">‹</span></button><button type="button" role="presentation" class="owl-next"><span aria-label="Next">›</span></button></div><div class="owl-dots disabled"><button role="button" class="owl-dot active"><span></span></button></div></div>

            <div class="car__item__text">
                <div class="car__item__text__inner">
                    <div class="label-date">${car.carYear}</div>
                    <h5><a href="#">${car.carTitle}</a></h5>
                    <ul>
                        <li><span>${car.carOdometer || '0'}</span> mi</li>
                        <li>${car.carType}</li>
                        <li><span style="color: red;">${car.carPrice}</span></li>
                    </ul>
                    <div class="label-date" style="margin-top: 10px; color: blue;">${car.carLocation}</div>
                </div>
                </div>
            </div>
        </div>
    `;

    carContainer.appendChild(carItem);
}

//  <p>${car.carDetails}</p>

//To fetch the car deals for user entered query:
$(document).ready(function () {
    $("#carDealsForm").submit(function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Gather selected values
        var selectedLocation = $("#location").val();
        var selectedBrand = $("#brand").val();
        var selectedType = $("#type").val();

         // Basic validation
         if (selectedLocation == "Select Location" || selectedBrand == "Select Make" || !selectedType == "Select Type") {
            alert("Please fill out all required fields.");
            return;
        }

        // Construct the data object
        var postData = {
            carMake: selectedBrand,
            location: selectedLocation,
            carType: selectedType
        };

        // Record the start time
        var startTime = new Date().getTime();

        // Make a POST request
        $.ajax({
            type: "POST",
            url: "https://drivedepot.onrender.com/api/cardeals",
            contentType: "application/json",
            data: JSON.stringify(postData),
            success: function (response) {
                // console.log(response);
               // Calculate the time it took to get the response
               var endTime = new Date().getTime();
               var elapsedTime = endTime - startTime;

            //    console.log("Time taken to get the response: " + elapsedTime + " milliseconds");

               // Add the time as a key-value pair in the response
               response.timeTaken = elapsedTime;

            //    console.log(response);
                // Store the response data in localStorage
    localStorage.setItem("carDealsResponse", JSON.stringify(response));

                // Redirect to a different page
                window.location.href = "https://drivedepot.onrender.com/car.html";
            },
            error: function (error) {
                console.error("Error:", error);
                // Handle errors here
            }
        });
    });
});

