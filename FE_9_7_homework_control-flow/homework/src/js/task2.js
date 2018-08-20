'use strict'
if (confirm('Do you want to play a game?')) {
    game();
} else {
    alert('You did not become a millionaire, but can.');
    game();
}

function getRandomInt(min, max) {
    max++;
    return Math.floor(Math.random() * (max - min)) + min;
}

function yourChoose(minN, maxN, attempts, totalPrize, possiblePrize) {
    return prompt('Enter a number from ' + minN + ' to ' + maxN + '\n' +
        'Attempts left: ' + attempts + '\n' +
        'Total prize: ' + totalPrize + '$ \n' +
        'Possible prize on current attempt: ' + possiblePrize + '$');
}

function game() {
    let minN = 0;
    let maxN = 5;
    let prize = {
        1: 2,
        2: 5,
        3: 10
    };
    let number = getRandomInt(minN, maxN);
    console.log(number); //for check the game
    let totalPrize = 0;
    let attempts = 3;
    let possiblePrize = prize[attempts];
    for (attempts; attempts > 0; attempts--) {
        let choose = parseInt(yourChoose(minN, maxN, attempts, totalPrize, possiblePrize));
        if (choose === number) {
            totalPrize += prize[attempts];
            prize['3'] *= 3; //can use for(), but prize has only 3 value
            prize['2'] *= 3; //and for() has 3 row too
            prize['1'] *= 3;
            maxN *= 2;
            possiblePrize = prize[3] + totalPrize;
            number = getRandomInt(minN, maxN);
            console.log(number); //for check the game
            attempts = 4;
            if (!confirm('Congratulation!   Your prize is: ' + totalPrize + '$ Do you want to continue?')) {
                newGame(totalPrize);
            }
        } else {
            let nextPrize = attempts;
            nextPrize--;
            possiblePrize = prize[nextPrize] + totalPrize;
        }
    }
    if (!attempts) {
        prize['2'] = 10;
        prize['1'] = 5;
        prize['0'] = 2;
        totalPrize = 0;
        possiblePrize = 0;
        attempts = 3;
        newGame(totalPrize);
    }
}

function newGame(totalPrize) {
    alert('Thank you for a game. Your prize is: ' + totalPrize + '$');
    if (confirm('Do you want to play again?')) {
        game();
    }
}
