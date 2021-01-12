"use strict";function asyncGeneratorStep(n,t,e,o,a,c,r){try{var l=n[c](r),s=l.value}catch(n){return void e(n)}l.done?t(s):Promise.resolve(s).then(o,a)}function _asyncToGenerator(n){return function(){var t=this,e=arguments;return new Promise((function(o,a){var c=n.apply(t,e);function r(n){asyncGeneratorStep(c,o,a,r,l,"next",n)}function l(n){asyncGeneratorStep(c,o,a,r,l,"throw",n)}r(void 0)}))}}var countriesEl=document.getElementById("countries"),toggleBtn=document.getElementById("toggle"),headerEl=document.querySelector(".header"),input=document.querySelector(".filter__search__input"),select=document.querySelector(".filter__continent"),btn=document.querySelector(".header__button"),modal=document.querySelector(".modal"),searchEl=document.getElementById("search"),filterContinent=document.querySelectorAll("option"),modalBtn=document.querySelector(".modal__button"),modalIcon=document.querySelector(".modal__icon"),filterIcon=document.querySelector(".filter__icon"),getCountries=function(){var n=_asyncToGenerator(regeneratorRuntime.mark((function n(){var t,e;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,fetch("https://restcountries.eu/rest/v2/all");case 2:return t=n.sent,n.next=5,t.json();case 5:e=n.sent,displayCountries(e);case 7:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();getCountries();var displayCountries=function(n){n.forEach((function(n){var t=document.createElement("div");t.classList.add("country"),t.innerHTML='\n\n<div class="country__image">\n    <img src='.concat(n.flag,' class="country__img" style=" width:100%;height:20rem" alt=').concat(n.name,'>\n</div>\n<div class="country__info">\n    <h3 class="country__name">').concat(n.name,'</h3>\n    <h4 class="country__population">Population:<span class="country__span">').concat(n.population,'</span></h4>\n    <h4 class="country__region">Region:<span class="country__span__region">').concat(n.region,'</span></h4>\n    <h4 class="country__capital">Capital:<span class="country__span">').concat(n.capital,"</span></h4>\n\n</div>\n\n"),t.addEventListener("click",(function(){modal.style.display="block",showCountryDetails(n)})),countriesEl.appendChild(t)}))},showCountryDetails=function(n){var t=modal.querySelector(".modal__body");modal.querySelector("img").src=n.flag,t.innerHTML='\n\t    <h2 class="modal__name">'.concat(n.name,'</h2>\n\t<div class="modal__info">\n\t<div class="modal__info__col1" >\n    \n        <p class="modal__native__name">\n            <strong>Native Name:</strong>\n            ').concat(n.nativeName,'\n        </p>\n        <p class="modal__population">\n            <strong>Population:</strong>\n            ').concat(n.population,'\n        </p>\n        <p class="modal__region">\n            <strong>Region:</strong>\n            ').concat(n.region,'\n        </p>\n        <p class="modal__subregion">\n            <strong>Sub Region:</strong>\n            ').concat(n.subregion,'\n        </p>\n        <p class="modal__capital">\n            <strong>Capital:</strong>\n            ').concat(n.capital,'\n\t\t</p>\n\t\t\n\t\t</div>\n\n\t\t<div class="modal__info__col2">\n       \n        <p class="modal__domain">\n            <strong>Top Level Domain:</strong>\n            ').concat(n.topLevelDomain[0],'\n\t\t</p>\n \n\t\t<p class="modal__languages" >\n\t\t    <strong>Languages:</strong>\n\t     \t').concat(n.languages.map((function(n){return n.name})),'\n\t\t</p>\n\n\t\t<p class="modal__currencies" >\n\t\t     <strong>Currencies:</strong>\n\t     \t').concat(n.currencies.map((function(n){return n.code})),"\n\t\t</p>\n\t\n      </div>\n\t\t<div>\n\t\t\n    ")};toggleBtn.addEventListener("click",(function(){document.body.classList.toggle("dark"),headerEl.classList.toggle("dark"),input.classList.toggle("dark"),select.classList.toggle("dark"),btn.classList.toggle("dark"),modal.classList.toggle("dark"),modalIcon.classList.toggle("dark"),filterIcon.classList.toggle("dark")})),modalBtn.addEventListener("click",(function(){modal.style.display="none"})),searchEl.addEventListener("input",(function(n){var t=n.target.value;document.querySelectorAll(".country__name").forEach((function(n){n.innerText.toLowerCase().includes(t.toLowerCase())?n.parentElement.parentElement.style.display="block":n.parentElement.parentElement.style.display="none"}))}));var continentSelect=document.querySelector("select");continentSelect.onchange=function(n){Array.from(document.querySelectorAll(".country__span__region")).forEach((function(n){n.innerHTML.toLowerCase().trim()==continentSelect.value||"all"===continentSelect.value?n.parentElement.parentElement.parentElement.style.display="block":n.parentElement.parentElement.parentElement.style.display="none"}))};
//# sourceMappingURL=main.js.map