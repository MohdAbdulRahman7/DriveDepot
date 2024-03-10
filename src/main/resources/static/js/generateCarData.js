/*
Developed by Abdul Rahman Mohammed
*/

// Retrieve the response data from localStorage
var carDealsResponse = localStorage.getItem("carDealsResponse");

if (carDealsResponse) {
    // Parse the JSON data
    carDealsResponse = JSON.parse(carDealsResponse);

    // Get the time taken to get the data
    var timeTaken = carDealsResponse.timeTaken;

    // Display the time taken in the HTML span
    document.getElementById("timeTaken").textContent = timeTaken;

    // Display the total number of cars
    var totalCars = carDealsResponse.cars.length;
    document.getElementById("totalCars").textContent = totalCars;

    // Number of results per page
    var resultsPerPage = 9;

    // Calculate the total number of pages
    var totalPages = Math.ceil(carDealsResponse.cars.length / resultsPerPage);

   

    // Create cards:
    document.addEventListener('DOMContentLoaded', function () {
        const carsData = carDealsResponse;
        const sortBySelect = document.querySelector('.car__filter__option__item--right select');
        // Initial sorting based on default option
    sortCars();

    function sortCars() {
        // const sortBySelect = document.querySelector('.car__filter__option__item--right select');
        const selectedOption = sortBySelect.value;

        // Sort cars based on the selected option
        if (selectedOption === "Price: Highest First") {
            carsData.cars.sort((a, b) => parseFloat(b.carPrice.replace(/[^\d.]/g, '')) - parseFloat(a.carPrice.replace(/[^\d.]/g, '')));
        } else if (selectedOption === "Price: Lowest First") {
            carsData.cars.sort((a, b) => parseFloat(a.carPrice.replace(/[^\d.]/g, '')) - parseFloat(b.carPrice.replace(/[^\d.]/g, '')));
        }
    }

        function updateCarContainer(cars) {
            const carContainer = document.getElementById('carContainer');
            carContainer.innerHTML = ""; // Clear existing content

            cars.forEach(car => {
                const carItem = document.createElement('div');
                carItem.classList.add('col-lg-4', 'col-md-4', 'col-sm-6', 'new');
                carItem.setAttribute('data-details', car.carDetails || ''); // Set data-details attribute
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
                            <h5>${car.carTitle}</h5>
                            <ul>
                                <li><span>${car.carOdometer || '0'}</span> mi</li>
                                <li>${car.carType}</li>
                                <li><span style="color: red;">${car.carPrice}</span></li>
                            </ul>
                            <div class="label-date" style="margin-top: 10px; color: blue;">${car.carLocation}</div>
                        </div>
                    </div>
                </div>
                `;

                carItem.addEventListener('click', function () {
                    const carDetails = carItem.getAttribute('data-details');
                    showCarDetailsModal(carDetails);
                });

                carContainer.appendChild(carItem);
            });
        }

        function updatePagination(currentPage) {
            const paginationContainer = document.getElementById("pagination");
            paginationContainer.innerHTML = ""; // Clear existing content

            for (var i = 1; i <= totalPages; i++) {
                const pageLink = document.createElement("a");
                pageLink.href = "#";
                pageLink.textContent = i;
                pageLink.addEventListener("click", function (e) {
                    e.preventDefault();
                    showPage(parseInt(e.target.textContent));
                });

                if (i === currentPage) {
                    pageLink.classList.add("active");
                }

                paginationContainer.appendChild(pageLink);
            }
        }

        function showPage(pageNumber) {
            const startIdx = (pageNumber - 1) * resultsPerPage;
            const endIdx = startIdx + resultsPerPage;
            const displayedCars = carsData.cars.slice(startIdx, endIdx);

            updateCarContainer(displayedCars);
            updatePagination(pageNumber);
        }
// Event listener for the sorting dropdown
var elementsWithSortingSClass = document.getElementsByClassName('sortingS');

// Loop through the collection of elements (if there are multiple)
for (var i = 1; i < elementsWithSortingSClass.length; i++) {
    elementsWithSortingSClass[i].addEventListener('click', function () {
        console.log('sdfdsf');
        sortCars();
        showPage(1); // Display the first page after sorting

        // Assuming option2 is at index 1 (0-based index)
        var selectElement = document.getElementById('sortCars');
        selectElement.selectedIndex = 1; // Set to the index of the option you want to select
    });
}

         // Display the initial page
            showPage(1);

        const carModal = document.getElementById('carModal');
        const carDetails = document.getElementById('carDetails');

        function showCarDetailsModal(details) {
            carDetails.innerHTML = details;
            carModal.style.display = 'block';
        }

        const closeModal = document.getElementsByClassName('close')[0];
        closeModal.addEventListener('click', function () {
            carModal.style.display = 'none';
        });

        window.addEventListener('click', function (event) {
            if (event.target === carModal) {
                carModal.style.display = 'none';
            }
        });
    });

} else {
    console.error("No carDealsResponse found in localStorage");
}
