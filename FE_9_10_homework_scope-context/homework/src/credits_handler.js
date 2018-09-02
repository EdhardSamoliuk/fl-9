function userCard(key) {
    let cardOptions = {
        balance: 100,
        transactionLimit: 100,
        historyLogs: [],
        key: key
    }

    function newLog(message, amount) {
        return {
            operationType: message,
            credits: amount,
            operationTime: new Date().toLocaleString('en-GB')
        }
    }
    return {
        getCardOptions: function () {
            return cardOptions;
        },
        putCredits: function (amount) {
            cardOptions.balance += amount;
            cardOptions.historyLogs.push(newLog('Resieved credits', amount));
        },
        takeCredits: function (amount) {
            if (amount < cardOptions.balance && amount < cardOptions.transactionLimit) {
                cardOptions.balance -= amount;
                cardOptions.historyLogs.push(newLog('Withdrawal of credits', amount));
            } else {
                console.log('The transaction limit is exceeded or not enought money on the balance');
            }
        },
        setTransactionLimit: function (amount) {
            cardOptions.transactionLimit = amount;
            cardOptions.historyLogs.push(newLog('Transaction limit change', amount));
        },
        transferCredits: function (amount, card) {
            const tax = 0.005;
            let transfer = amount + amount * tax;
            if (transfer < cardOptions.balance && transfer < cardOptions.transactionLimit) {
                this.takeCredits(transfer);
                card.putCredits(amount);
            } else {
                console.log('The transaction limit is exceeded or not enought money on the balance');
            }
        }
    }
}

class UserAccount {
    constructor(name) {
        this.name = name;
        this.cards = [];
    }

    addCard() {
        const maxCards = 3;
        if (this.cards.length < maxCards) {
            this.cards.push(userCard(this.cards.length + 1));
        } else {
            console.log('Can\'t add card. Card limits reached.');
        }
    }

    getCardByKey(key) {
        return this.cards[key - 1];
    }
}
