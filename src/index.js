import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;


const inputField = document.querySelector('#search-box');
const countryRenderedList = document.querySelector('.country-list');

countryRenderedList.style.listStyle = "none";
countryRenderedList.style.margin = '0';
countryRenderedList.style.padding = '0';

inputField.addEventListener('input', debounce(onInputAction, [wait=DEBOUNCE_DELAY]));

function onInputAction(e) {
    countryRenderedList.innerHTML = '';
    let countryName = e.target.value.trim();
    fetchCountries(countryName)
        .then(
            data => {
                if (data.length > 10) {
                    return Notiflix.Notify.failure('Too many matches found. Please enter a more specific name.');
                }
                else if (data.length >= 2 && data.length <= 10) {
                    console.log(data);
                    return renderCountryList(data);
                }
                else if (data.length === 1) {
                    // return renderCountryCard(country);
                    console.log(data);
                }
            }
            
        )
}

function renderCountryList(countries) {
    const markup = countries
        .map(country => {
        return `<li style="display:flex; align-items:center;"><img src=${country.flags.svg} alt=${country.name.official} width="30" style="margin-right:10px;"></img><p><b>${country.name.official}</b></p></li>`;
    }).join("");
    console.log(markup);
  countryRenderedList.innerHTML = markup;
}

function renderCountryCard(country) {
    
}
