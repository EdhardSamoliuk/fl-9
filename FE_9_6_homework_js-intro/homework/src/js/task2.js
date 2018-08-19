let sideA = parseFloat(prompt('Enter side a length', '0'));
let sideB = parseFloat(prompt('Enter side b length', '0'));
let angle = parseFloat(prompt('Enter angle', '0'));

const maxAngle = 180;
const minVal = 0.004; //because side.toFixed(2) can't be 0.00
let isValid = sideA > minVal && sideB > minVal && angle > minVal && angle < maxAngle;

if (isValid) {
    const degree = 180;
    let sideC = Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2) -
        2 * sideA * sideB * Math.cos(angle * Math.PI / degree));
    let perimeter = sideA + sideB + sideC;
    let semiPerimeter = 1 / 2 * perimeter;
    let square = Math.sqrt(semiPerimeter * (semiPerimeter - sideA) * (semiPerimeter - sideB) * (semiPerimeter - sideC));
    if (sideC > minVal && square > minVal) { //side or square.toFixed(2) can't be 0.00
        console.log('c length:' + +sideC.toFixed(2) + '\n' +
            'Triangle square:' + +square.toFixed(2) + '\n' +
            'Triangle perimeter:' + +perimeter.toFixed(2));
    } else {
        console.log('Invalid data');
    }
} else {
    console.log('Invalid data');
}
