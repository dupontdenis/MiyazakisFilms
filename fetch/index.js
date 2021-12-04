
async function getFilms() {
    try {
        const url = 'https://ghibliapi.herokuapp.com/films';
        const filmsResponse = await fetch(`${url}`);
        const films = await filmsResponse.json();

        //Hayao Miyazaki
        films.forEach(({ director, title }) =>
            document
                .querySelector("#filmsBy")
                .insertAdjacentHTML('afterbegin', `<li ${"Hayao Miyazaki" == director ? 'class="selected"' : ""}> ${title} : ${director} </li>`))


        //find directors
        const directors = films.map(({ director }) => director);

        [... new Set(directors)]
            .sort((a, b) => {
                if (a.split(" ")[1] > b.split(" ")[1])
                    return -1;
                else
                    return 1;
            })
            .forEach((director) => {
                document
                    .querySelector("#directors")
                    .insertAdjacentHTML('afterbegin', `<li> ${director} </li>`)
            })

        //directors's films
        const directorsFilms = films.reduce((a, { director, title }) => {
            if (!a[director]) a[director] = [];
            a[director].push(title);
            return a;
        }, []);


        //views
        Object.entries(directorsFilms).forEach(([director, films]) => {
            const tempLi = document.createElement('li')
                , tempUl = document.createElement('ul');

            films.forEach((film) => tempUl.insertAdjacentHTML('afterbegin', `<li> ${film} </li>`))
            
            tempLi.insertAdjacentElement('beforeend', tempUl)
                .insertAdjacentText('beforebegin', `${director}`)

            document
                .querySelector("#directorsfilmsList")
                .insertAdjacentElement('afterbegin', tempLi)

        })

    } catch (error) {
        console.log(error);
    }
}

getFilms();




