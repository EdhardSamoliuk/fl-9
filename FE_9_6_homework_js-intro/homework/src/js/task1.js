let price = parseFloat(prompt('Enter amount of money', '0'));
let discount = parseFloat(prompt('Enter discount', '0'));

let isValid = price >= 0 && 0 <= discount && discount <= 100;

if (isValid) {
    let saved = price / 100 * discount;
    let result = price - saved;
    console.log('Price without discount: ' + +price.toFixed(2) + '\n' +
        'Discount: ' + +discount.toFixed(2) + '%\n' +
        'Price with discount: ' + +result.toFixed(2) + '\n' +
        'Saved: ' + +saved.toFixed(2));
} else {
    console.log('Invalid data');
}
