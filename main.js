let searchInputEl = document.getElementById("searchInput");
let resultCountriesEl = document.getElementById("resultCountries");
let spinnerEl = document.getElementById("spinner");

let searchInputVal = "";
let countriesList = [];

//adding the spinner
spinnerEl.classList.remove("d-none");

function createAndAppendResult(result) {

    spinnerEl.classList.add("d-none");

    let {
        flag,
        name,
        population
    } = result;

    //creating col container
    let colContainer = document.createElement("div");
    colContainer.classList.add("col-12", "col-md-6");
    resultCountriesEl.appendChild(colContainer);

    //create country card  --country-card
    let countryCard = document.createElement("div");
    countryCard.classList.add("country-card", "d-flex", "m-3");
    colContainer.appendChild(countryCard);

    //adding flag --country-flag
    let countryFlag = document.createElement("img");
    countryFlag.src = flag;
    countryFlag.classList.add("country-flag", "p-1");
    countryCard.appendChild(countryFlag);

    //country details container
    let countryDetails = document.createElement("div");
    countryDetails.classList.add("m-1");
    countryCard.appendChild(countryDetails);

    //adding country name --country-name
    let countryName = document.createElement("p");
    countryName.classList.add("country-name");
    countryName.textContent = name;
    countryDetails.appendChild(countryName);

    //adding country population --country-population
    let countryPopulation = document.createElement("p");
    countryPopulation.classList.add("country-population");
    countryPopulation.textContent = population;
    countryDetails.appendChild(countryPopulation);
}

function displayResults(countriesList) {
    resultCountriesEl.textContent = "";

    for (let country of countriesList) {
        let countryName = country.name;
        if ((countryName.toLowerCase()).includes((searchInputVal).toLowerCase())) { //Use toLowerCase() method to convert the string to lower case
            createAndAppendResult(country);
        }
    }
}

function getCountries() {
    let url = "https://apis.ccbp.in/countries-data";
    let options = {
        method: "GET"
    };

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            countriesList = jsonData;
            displayResults(jsonData);
        });
}

function searchedCountriesDisplayer() {
    searchInputVal = searchInputEl.value;
    getCountries();
}

getCountries();
searchInputEl.addEventListener("keydown", searchedCountriesDisplayer);
