function reverseNumber(int) {
    let reverse = parseInt(String(int).split('').reverse().join(''));
    return int < 0 ? -reverse : reverse;
}