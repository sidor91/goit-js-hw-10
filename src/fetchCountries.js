export function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=capital,population,languages,name,flags`)
        .then(response => response.json())
}


