'use strict';

function findType(variable) {
    return typeof variable;
}

function forEach(array, fn) {
    let newArray = [];

    for (let i = 0; i < array.length; i++) {
        newArray.push(fn(array[i]));
    }
    return newArray;
}

function map(array, fn) {
    return forEach(array, fn);
}

function filter(array, fn) {
    let newArray = [];

    forEach(array, function (el) {
        if (fn(el)) {
            newArray.push(el);
        }
    });
    return newArray;
}

function getAdultAppleLovers(data) {
    let adultAppleLovers = map(filter(data, el => el.age > 18 && el.favoriteFruit === 'apple'), el => el.name);

    return adultAppleLovers;
}

function keys(obj) {
    let newArray = [];

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newArray.push(key);
        }
    }
    return newArray;
}

function values(obj) {
    let newArray = [];

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newArray.push(obj[key]);
        }
    }
    return newArray;
}

function showFormattedDate(d) {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return 'It is ' + d.getDate() + ' of ' + months[d.getMonth()] + ', ' + d.getFullYear();
}
