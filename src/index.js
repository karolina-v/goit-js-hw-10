import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;


const input = document.querySelector('#search-box');
const ul = document.querySelector('.country-list');
const div = document.querySelector('.country-info');

input.addEventListener('input', debounce(onCountryInput, DEBOUNCE_DELAY));

function onCountryInput() {
  const name = input.value.trim();
  if (name === '') {
    return (ul.innerHTML = ''), (div.innerHTML = '');
  }

    fetchCountries(name)
        .then(countries => {
            ul.innerHTML = '';
            div.innerHTML = '';
        
            if (countries.length === 1) {
                ul.insertAdjacentHTML('beforeend', countryList(countries));
                div.insertAdjacentHTML('beforeend', countryInfo(countries));
            } else if (countries.length >= 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            } else {
                ul.insertAdjacentHTML('beforeend', countryList(countries));
            }
        })
        .catch(Notiflix.Notify.failure('Oops, there is no country with that name'));
}

function countryList(countries) {
  const markup = countries
    .map(({ name, flags }) => {
      return `
            <li class="country-list__item">
                <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 35 height = 35>
                <h2 class="country-list__name">${name.official}</h2>
            </li>
            `;
    })
    .join('');
  return markup;
}

function countryInfo(countries) {
  const markup = countries
    .map(({ capital, population, languages }) => {
      return `
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
  return markup;
}