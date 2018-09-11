const cars = [];
const searchInput = document.querySelector('.search');

const endpoint = 'https://gist.githubusercontent.com/johnazre/115199c10540824c3dd45a86cf634e38/raw/81722d3ad7505ed64cec6e000df57c40d4a34664/cars.json';



async function fetchCars(){
    const response = await fetch(endpoint);
    car = await response.json();
    cars.push(...car);
    // cars.map((car,index) => {
    //     cars[index].name = `${car.make} ${car.model}`;
    // });
}

function numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
}

function findMatches(word, cars){
    return cars.filter(car => {
        console.log(car);
        const regex = new RegExp(word, 'gi');
        return car.model.match(regex) || car.make.match(regex);
    });
}

function displayMatches(){
    const matchArray = findMatches(searchInput.value, cars);
    const suggestions = document.querySelector('.suggestions');
    if(searchInput.value===""){
        suggestions.innerHTML = ""
        return false;
    }
    
    const html = matchArray.map(car => {
        const regex = new RegExp(searchInput.value, 'gi');
        const carMake = car.make.replace(regex, `<span class="hl">${searchInput.value}</span>`);
        const carModel = car.model.replace(regex, `<span class="hl">${searchInput.value}</span>`);
        return ` 
        <li> 
            <span class="name">${carMake} ${carModel} (${car.year})</span>
            <span class="price" style="float: right">$${numberWithCommas(car.price)}</span>
        </li>
        `
    }).join('');
    suggestions.innerHTML = html;
}

fetchCars();
searchInput.addEventListener('keyup', displayMatches);