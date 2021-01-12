const countriesEl = document.getElementById("countries");
const toggleBtn = document.getElementById("toggle");
const headerEl = document.querySelector(".header");
const input = document.querySelector(".filter__search__input");
const select = document.querySelector(".filter__continent");
const btn = document.querySelector(".header__button");
const modal = document.querySelector(".modal");
const searchEl = document.getElementById("search");
const filterContinent = document.querySelectorAll("option");
const modalBtn = document.querySelector(".modal__button");
const modalIcon = document.querySelector(".modal__icon");
const filterIcon = document.querySelector(".filter__icon");

const getCountries = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();
  displayCountries(countries)
}
getCountries();

const displayCountries = (countries) => {
  countries.forEach((country) => {
    const countryEl = document.createElement("div");
    countryEl.classList.add("country");
    countryEl.innerHTML = `

<div class="country__image">
    <img src=${country.flag} class="country__img" style=" width:100%;height:20rem" alt=${country.name}>
</div>
<div class="country__info">
    <h3 class="country__name">${country.name}</h3>
    <h4 class="country__population">Population:<span class="country__span">${country.population}</span></h4>
    <h4 class="country__region">Region:<span class="country__span__region">${country.region}</span></h4>
    <h4 class="country__capital">Capital:<span class="country__span">${country.capital}</span></h4>

</div>

`;
    countryEl.addEventListener("click", function () {
      modal.style.display = "block";
      showCountryDetails(country);
    });
    countriesEl.appendChild(countryEl);
  });
};

const showCountryDetails = (country) => {
  const modalBody = modal.querySelector(".modal__body");
  const modalImg = modal.querySelector("img");

  modalImg.src = country.flag;

  modalBody.innerHTML = `
	    <h2 class="modal__name">${country.name}</h2>
	<div class="modal__info">
	<div class="modal__info__col1" >
    
        <p class="modal__native__name">
            <strong>Native Name:</strong>
            ${country.nativeName}
        </p>
        <p class="modal__population">
            <strong>Population:</strong>
            ${country.population}
        </p>
        <p class="modal__region">
            <strong>Region:</strong>
            ${country.region}
        </p>
        <p class="modal__subregion">
            <strong>Sub Region:</strong>
            ${country.subregion}
        </p>
        <p class="modal__capital">
            <strong>Capital:</strong>
            ${country.capital}
		</p>
		
		</div>

		<div class="modal__info__col2">
       
        <p class="modal__domain">
            <strong>Top Level Domain:</strong>
            ${country.topLevelDomain[0]}
		</p>
 
		<p class="modal__languages" >
		    <strong>Languages:</strong>
	     	${country.languages.map((language) => language.name)}
		</p>

		<p class="modal__currencies" >
		     <strong>Currencies:</strong>
	     	${country.currencies.map((currency) => currency.code)}
		</p>
	
      </div>
		<div>
		
    `;
};

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  headerEl.classList.toggle("dark");
  input.classList.toggle("dark");
  select.classList.toggle("dark");
  btn.classList.toggle("dark");
  modal.classList.toggle("dark");
  modalIcon.classList.toggle("dark");
  filterIcon.classList.toggle("dark");
});

modalBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

searchEl.addEventListener("input", (e) => {
  const { value } = e.target;
  const countryName = document.querySelectorAll(".country__name");

  countryName.forEach((name) => {
    if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
  
      name.parentElement.parentElement.style.display = "block";
    } else {
      name.parentElement.parentElement.style.display = "none";
    }
  });
});

const continentSelect = document.querySelector("select");

continentSelect.onchange = (evt) => {
  const availableCountries = Array.from(
    document.querySelectorAll(".country__span__region")
  );
  availableCountries.forEach((country) => {
    const myCountry = country.innerHTML.toLowerCase().trim();

    if (myCountry == continentSelect.value || continentSelect.value === "all") {
      country.parentElement.parentElement.parentElement.style.display = "block";
    } else {
      country.parentElement.parentElement.parentElement.style.display = "none";
    }
  });
 
};
