import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 1000;
const refs = {
    input: document.querySelector("#search-box"),
    ul: document.querySelector(".country-list"),
    div: document.querySelector(".country-info")
}
function listMarkup(data) {
    return data.map(({ name, flags }) =>
        `<li><img src="${flags.png}" alt="${name.official}" width="20" height="20">${name.official}</li>`,
    )
        .join('');
};
function listMarkupinfo(data) {
    return data.map(
        ({ name, capital, population, flags, languages }) =>
            `<h1><img src="${flags.png}" alt="${name.official}" width="40" height="40">${name.official
            }</h1>
      <p>Capital: ${capital}</p>
      <p>Population: ${population}</p>
      <p>Languages: ${Object.values(languages)}</p>`,
    );

};

function addMarkup(data) {
    if (refs.input.value.length > 10) {
        return Notify.info('Too many matches found. Please enter a more specific name');
    }
    if (refs.input.value.length < 3 && refs.input.value.length !== 0) {
        refs.ul.innerHTML = "";
        return Notify.failure('Oops, there is no country with that name');
    }
    if (refs.input.value.length === 3) {
        refs.div.innerHTML = "";
        return refs.ul.innerHTML = listMarkup(data);
    }
    if (refs.input.value.length > 3 && refs.input.value.length < 10) {
        refs.ul.innerHTML = "";
        return refs.div.innerHTML = listMarkupinfo(data)
    }
}
refs.input.addEventListener("input", debounce((e) => {
    const textInput = e.target.value.trim();
    fetchCountries(textInput).then(addMarkup);
}), DEBOUNCE_DELAY);