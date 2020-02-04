let cities_array; // Массив с данными
let found_array = [];
let search_input = document.getElementById('search_input'); // Строка поиска
let cities_url = 'https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json';
let cities_list = document.getElementById('ul');
let result_list = document.getElementById('result');
let clicked_result = document.getElementById('clicked');
let ul = document.querySelector("#ul");
let elCount = []

document.onclick = function(event) {
    if (event.target.tagName == 'SPAN') {
        console.log('Нажат span')
        let id = event.target.parentElement.id
        //console.log(id)
        let geoname_id = found_array[id].geonameid
        let index = elCount.indexOf(geoname_id)
        //console.log(elCount)
        if (index > -1) {
            elCount.splice(index, 1);
        }
    }
}

function getUrl(url) {
    let Httpreq = new XMLHttpRequest();

    Httpreq.open("GET", url, false);
    Httpreq.send(null);

    return JSON.parse(Httpreq.responseText);
}

function getSearchString() {
    let x = search_input.value.toLowerCase().trim();

    if (x == '') {
        return false;
    } else {
        return x;
    }
}

function getFilteredCities(search_string) {

    for (let i = 0; i < cities_array.length; i++) {
        if (cities_array[i].nameLowerCase.indexOf(search_string) == 0) {
            found_array.unshift(cities_array[i]);
        } else if (cities_array[i].nameLowerCase.indexOf(search_string) != -1) {
            found_array.push(cities_array[i]);
        }

    }
    // console.log("getFilteredСities")
    return found_array;
}

function showFilteredCities(arr) {
    let max_visile_items = 10;
    let remains = arr.length - max_visile_items;
    cities_list.innerHTML = "";

    for (let i = 0; i < arr.length; i++) {
        if (i == max_visile_items) {
            let li = document.createElement('li');
            li.setAttribute('id', i)
            li.appendChild(document.createTextNode("Выведено " + max_visile_items + " и еще " + remains + " вариантов"));
            cities_list.appendChild(li);



            break;
        }
        let li = document.createElement('li');

        li.setAttribute('id', i)
        li.appendChild(document.createTextNode(arr[i].name + " в стране: " + arr[i].country));
        cities_list.appendChild(li);
    }

    //console.log("showFilteredCities000")
}


function makeSearchInData() {
    found_array = [];
    let search_string = getSearchString();
    let transform = addLowerCase(cities_array)
    let filtered_cities = getFilteredCities(search_string);
    let result = showFilteredCities(filtered_cities);


    console.log(filtered_cities)
    // console.log("makeSearchInData")
    return filtered_cities;
}
ul.addEventListener('click', function(event) {
    let id = event.target.id;
    //      alert(event.target)
    if (id != "ul") {
        showInfo(id, found_array);
    }
});

function showInfo(index, arr) {
    if (elCount.indexOf(arr[index].geonameid) == -1) {
        if (index != -1 && index != 10) {
            let div = document.createElement('div');
            let span = document.createElement('span');

            div.setAttribute('class', 'alert');
            div.setAttribute('id', index);
            div.appendChild(document.createTextNode('Страна\t -' + arr[index].country + " Город\t-" + arr[index].name + " geonameid\t- " + arr[index].geonameid + " subcountry\t-" + arr[index].subcountry));
            span.setAttribute('class', 'closebtn');
            span.setAttribute('name', 'del');
            span.setAttribute('onclick', `this.parentElement.remove()`);
            //span.setAttribute('onclick', `mf()`);
            span.appendChild(document.createTextNode("x"));
            div.appendChild(span);
            clicked_result.appendChild(div);
            elCount.push(arr[index].geonameid)
        }
    }
    // console.log("showInfo")
}
cities_array = getUrl(cities_url);

function addLowerCase(cities_array) {
    for (let country of cities_array) {
        country['nameLowerCase'] = country.name.toLowerCase();
    }
    // console.log("addLowerCase")
    return cities_array;
}
