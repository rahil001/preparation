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