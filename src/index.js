const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchResults = document.getElementById('searchResults');

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();

    if (searchTerm !== '') {
        searchResults.innerHTML = '';

        fetch(`https://restcountries.com/v2/name/${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    data.forEach(country => {
                        const countryElement = document.createElement('div');
                        countryElement.classList.add('country');

                        const countryName = document.createElement('h2');
                        countryName.innerText = country.name;
                        countryElement.appendChild(countryName);

                        const countryCapital = document.createElement('p');
                        countryCapital.innerText = `Столиця: ${country.capital}`;
                        countryElement.appendChild(countryCapital);

                        const countryFlag = document.createElement('img');
                        countryFlag.src = country.flag;
                        countryElement.appendChild(countryFlag);

                        searchResults.appendChild(countryElement);
                    });
                } else {
                    searchResults.innerText = 'Нічого не знайдено.';
                }
            })
            .catch(error => {
                searchResults.innerText = 'Помилка: ' + error.message;
            });
    }
});
