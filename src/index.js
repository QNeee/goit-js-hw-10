import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;
const refs = {
    input: document.querySelector("#search-box"),
    ul: document.querySelector(".country-list"),
    div: document.querySelector(".country-info")
}
function listMarkup(data) {
    return data.reduce(((acc, data) =>
        `${acc}<li class="ulclass"><img src="${data.flags.png}" alt="${data.name.official}" width="20" height="20">${data.name.official}</li>`), "")

};
function listMarkupinfo(data) {
    return data.reduce(
        ((acc, data) =>
            `<h1><img src="${data.flags.png}" alt="${data.name.official}" width="40" height="40">${data.name.official
            }</h1>
      <p>Capital: ${data.capital}</p>
      <p>Population: ${data.population}</p>
      <p>Languages: ${Object.values(data.languages)}</p>`), {},
    );


};
function onError() {
    Notify.failure('Oops, there is no country with that name');
}
function addMarkup(data) {
    if (data.length >= 2 && data.length < 10) {
        refs.div.innerHTML = "";
        return refs.ul.innerHTML = listMarkup(data);
    }
    if (data.length > 10) {
        return Notify.info('Too many matches found. Please enter a more specific name');

    }
    if (data.length === 1) {
        refs.ul.innerHTML = "";
        return refs.div.innerHTML = listMarkupinfo(data);
    }

}
function onInput(e) {
    const textInput = e.target.value.trim();
    if (refs.input.value.length > 0) {
        fetchCountries(textInput).then(addMarkup).catch(onError);
    }
    refs.ul.innerHTML = "";
    refs.div.innerHTML = "";
}
refs.input.addEventListener("input", debounce(onInput, DEBOUNCE_DELAY));