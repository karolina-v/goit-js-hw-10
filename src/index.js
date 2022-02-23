import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;


const input = document.querySelector('#search-box');
const ul = document.querySelector('.country-list');
const div = document.querySelector('.country-info');

// 
input.addEventListener('input', debounce(onCountryInput, DEBOUNCE_DELAY));

function onCountryInput() {
  const name = input.value.trim();

  if (input.value) {
    return fetchCountries(name).then(showCountries).catch(error);
  }
  
  function error() {
   if (name !== '') {
     Notiflix.Notify.failure(`Oops, there is no country with that name`);
  }
}
}

function showCountries(countries) {
  
          clearRes() 
  
          if (countries.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            }
          if (countries.length >= 2 && countries.length <= 10) {
            countriesList(countries);
          }
          if (countries.length === 1) {
            countryInfo(countries);
            }
}


function countriesList(countries) {
  const markup = countries
    .map(({ name, flags, capital, population, languages }) => {
      return `
            <li class="country-list__item">
                <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 35 height = 35>
                <h2 class="country-list__name">${name.official}</h2>
            </li>
            `;
    })
    .join('');
  
  ul.innerHTML = markup;
}



function countryInfo(countries) {
  const markup = countries
    .map(({ name, flags, capital, population, languages }) => {
      return `
          <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 35 height = 35>
          <h2 class="country-list__name">${name.official}</h2>

          <ul class="country-info__list">
              <li class="country-info__item"><p><b>Capital: </b>${capital}</p></li>
              <li class="country-info__item"><p><b>Population: </b>${population}</p></li>
              <li class="country-info__item"><p><b>Languages: </b>${Object.values(languages).join(
                ', ',
              )}</p></li>
          </ul>
          `;
    })
    .join('');
  
  div.innerHTML = markup;
}


function clearRes() {
  ul.innerHTML = '';
  div.innerHTML = '';
}