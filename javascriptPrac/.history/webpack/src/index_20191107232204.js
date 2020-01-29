require('./style.scss');
import react from 'react';
class Car {
    constructor(name) {
        this.name = name
    }
    getCarName() {
        return this.name;
    }
}

const car = new Car('bmw');


document.write(car.getCarName());
document.write(car.getCarName());
document.write(car.getCarName());