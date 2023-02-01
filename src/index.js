import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;


const inputField = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

countryList.style.listStyle = "none";
countryList.style.margin = '0';
countryList.style.padding = '0';

inputField.addEventListener('input', debounce(onInputAction, [DEBOUNCE_DELAY]));

function onInputAction(e) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    let countryName = e.target.value.trim();
    fetchCountries(countryName)
        .then(
            data => {
                if (data.length > 10) {
                    console.log(data);
                    return Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.');
                }
                else if (data.length >= 2 && data.length <= 10) {
                    console.log(data);
                    return renderCountryList(data);
                }
                else if (data.length === 1) {
                    console.log(...data);
                    return renderCountryCard(...data);
                } else if (data.status === 404) {
                    console.log(data);
                    return Notiflix.Notify.failure('Oops, there is no country with that name');
                }
            }
    )
}

function renderCountryList(countries) {
    const countryListMarkup = countries
        .map(country => {
        return `<li style="display:flex; align-items:center;"><img src=${country.flags.svg} alt=${country.name.official} width="30" style="margin-right:10px;"></img><p><b>${country.name.official}</b></p></li>`;
    }).join("");
  countryList.innerHTML = countryListMarkup;
}

function renderCountryCard(country) {
    console.log(`rendering ${country.name.official}`)
    const countryMarkup = `<div style="display:flex; align-items:center;">
        <img src=${country.flags.svg} alt=${country.name.official} width="60" style="margin-right:15px;">
        <h1>${country.name.official}</h1>
      </div>
      <ul style="list-style:none; margin:0; padding:0">
        <li><b style="margin-right:10px;">Capital: </b>${country.capital}</li>
        <li><b style="margin-right:10px;">Population: </b>${country.population}</li>
        <li><b style="margin-right:10px;">Languages: </b>${Object.values(country.languages)}</li>
      </ul>`;
    countryInfo.innerHTML = countryMarkup;
}
