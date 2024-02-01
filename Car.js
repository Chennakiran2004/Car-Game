const createCarButtonElement = document.getElementById("createCarButton");

class Car {

    constructor(containerId, carNumber, isStarted) {
        this.carNumber = carNumber;
        this.isStarted = isStarted;

        this.container = document.createElement('div');
        this.container.classList.add('rectangle');


        const subContainer = document.createElement('div');
        subContainer.classList.add('d-flex', 'flex-row', 'justify-content-between', 'sub-container');


        const carIcon = document.createElement('i');
        carIcon.classList.add('fas', 'fa-car-side', 'fa-7x', 'car');
        const carNumberElement = document.createElement("p");
        carNumberElement.classList.add("car-number");
        carNumberElement.innerHTML = `Car Number: ${this.carNumber}`;


        this.speedElement = document.createElement('h3');
        this.speedElement.classList.add("speed");
        this.speedElement.innerHTML = 'Speed: <span id="speed">10</span> KMPH';


        subContainer.appendChild(carIcon);
        subContainer.appendChild(carNumberElement);
        subContainer.appendChild(this.speedElement);


        const trafficLightContainer = document.createElement('div');
        trafficLightContainer.classList.add('d-flex', 'flex-row', 'justify-content-end', 'm-5');


        this.stopLight = document.createElement('div');
        this.stopLight.classList.add('bulb');

        this.startLight = document.createElement('div');
        this.startLight.classList.add('bulb');

        trafficLightContainer.appendChild(this.stopLight);
        trafficLightContainer.appendChild(this.startLight);


        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('d-flex', 'flex-row', 'justify-content-between', 'm-5');


        const startButton = document.createElement('button');
        startButton.classList.add('button', 'startButton');
        startButton.innerHTML = 'Start';

        startButton.addEventListener('click', () => {
            if (!this.isStarted) {
                this.turnOnGreen();
                this.isStarted = true;
                const spanElement = this.speedElement.querySelector('span');
                if (spanElement) {
                    const speedValue = parseInt(spanElement.textContent);
                    if (speedValue !== 10) {
                        spanElement.textContent = '10';
                    }
                }
            }
        });



        const incrementButton = document.createElement('button');
        incrementButton.classList.add('button');
        incrementButton.innerHTML = '<i class="fas fa-plus"></i>';
        if (this.isStarted === true) {
            incrementButton.addEventListener('click', () => this.increment());
        }

        const decrementButton = document.createElement('button');
        decrementButton.classList.add('button');
        decrementButton.innerHTML = '<i class="fas fa-solid fa-minus"></i>';
        decrementButton.addEventListener('click', () => {
            if (parseInt(this.speedElement.querySelector('span').textContent) >= 1) {
                this.decrement();
            }
        });


        const stopButton = document.createElement('button');
        stopButton.classList.add('button', 'stopButton');
        stopButton.innerHTML = 'Stop';
        stopButton.addEventListener('click', () => {
            this.turnOnRed();
            this.speedElement.querySelector('span').textContent = 0;
        });

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-primary', 'm-4');
        deleteButton.innerHTML = "Delete Car";

        deleteButton.onclick = () => {
            this.onDelteCar();
        };


        buttonContainer.appendChild(startButton);
        buttonContainer.appendChild(incrementButton);
        buttonContainer.appendChild(decrementButton);
        buttonContainer.appendChild(stopButton);

        this.container.appendChild(subContainer);
        this.container.appendChild(trafficLightContainer);
        this.container.appendChild(buttonContainer);
        this.container.appendChild(deleteButton);

        document.getElementById(containerId).appendChild(this.container);

        this.turnOnGreen();

    }

    onDelteCar() {
        this.container.remove();
    }

    increment() {
        if (this.isStarted === true) {
            let speed = parseInt(this.speedElement.querySelector('span').textContent);
            let currentSpeed = speed + 1;
            console.log(currentSpeed);
            this.speedElement.querySelector('span').textContent = currentSpeed;

            if (currentSpeed > 0) {
                this.turnOnGreen();
            }
        }
    }

    decrement() {
        if (this.isStarted === true) {
            let currentSpeed = parseInt(this.speedElement.querySelector('span').textContent);
            currentSpeed -= 1;
            this.speedElement.querySelector('span').textContent = currentSpeed;
        }
    }


    turnOnRed() {
        this.stopLight.style.backgroundColor = "#cf1124";
        this.container.querySelector('.stopButton').style.backgroundColor = "#cf1124";

        this.startLight.style.backgroundColor = "#4b5069";
        this.container.querySelector('.startButton').style.backgroundColor = "#1f1d41";
        this.isStarted = false;



    }

    turnOnGreen() {
        this.stopLight.style.backgroundColor = "#4b5069";
        this.container.querySelector('.stopButton').style.backgroundColor = "#1f1d41";

        this.startLight.style.backgroundColor = "#239b56";
        this.container.querySelector('.startButton').style.backgroundColor = "#239b56";
        this.isStarted = true;

    }
}

let isStarted = true;

let carNumber = 1;


const defaultCar = new Car("carContainer", carNumber, isStarted);



createCarButtonElement.addEventListener("click", function() {
    carNumber += 1;
    const car = new Car("carContainer", carNumber, isStarted);
});