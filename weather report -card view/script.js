// Store the API URL and API key in separate variables
let apiurl="https://restcountries.com/v3.1/all"
const apikey = "19a8470a463433487b03f8f82158f8e9";
const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

const loadCountryApi = () => {
 fetch(apiurl)
    .then((res) => res.json())
    .then((data) => displayCountries(data))
    .catch((err) => {
      console.log("Error:", err);
    });
};

const displayCountries = (countries) => {
 //console.log(countries);
 const countriesHTML = countries.map((country) => getCountry(country));
 const container = document.getElementById("countries");
 container.innerHTML = countriesHTML.join(" ");

 // Attach event listeners to all the buttons
 const buttons = container.querySelectorAll("button");
 buttons.forEach((button) => {
    button.addEventListener("click", handleButtonClick);
 });
};

const getCountry = (country) => {
 //console.log(country)
 return `
    <div class="card mb-5" style="max-width: 18rem;">
      <div class="card-header">${country.name.common}</div>
      <div class="card-body">
        <img src="${country.flags.png}">
        <label for="capital">Capital :${country.capital}</label><br>
        <label for="region">Region :${country.region}</label><br>
        <label for="code">Country code :${country.cca3}</label><br>
        <button class="btn btn-primary" onclick="handleButtonClick()">Click for weather</button><br>
        <label id="details"></label> 
      </div>
    </div>
 `
}
loadCountryApi()

function handleButtonClick(event) {
    const card = event.target.parentElement;
    const capital = card.querySelector("label[for='capital']").textContent.split(":")[1].trim();
   
    fetch(`${weatherApiUrl}${capital}&appid=${apikey}`)
       .then((res) => res.json())
       .then((data) => {
         const weatherDetails = `
           <label for="weather">Weather :${data.weather[0].description}</label><br>
           <label for="temp">Temperature :${data.main.temp} K</label><br>
         `;
         card.querySelector("#details").innerHTML = weatherDetails;
       })
       .catch((err) => {
         console.log("Error:", err);
       });
   }