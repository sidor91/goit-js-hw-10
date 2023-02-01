export function fetchCountries(name) {
    const querySettings = '?fields=capital,population,languages,name,flags';
    return fetch(`https://restcountries.com/v3.1/name/${name}${querySettings}`)
        .then(response => response.json())
}
