'use strict';

function isString(string) {
    return string.length > 0 && typeof string === 'string';
}

function isNumber(number) {
    return typeof number === 'number' && !isNaN(number) && isFinite(number) && number > 0;
}

function Product(name, description, price) {
    let shopCartName;
    const _logs = [];

    isString(name) ? this.name = name : console.error('Please, enter correct name');
    typeof description === 'object' ? this.description = description : console.error('Description must be object');
    isNumber(price) ? this.price = price : console.error('Please, enter price>0');

    this.getCart = function () {
        return shopCartName;
    };

    this.getPrice = function () {
        return this.price;
    };

    this.setPrice = function (newPrice) {
        if (isNumber(newPrice) && newPrice > this.price) {
            _logs.push(`change price form ${this.price} to ${newPrice}`);
            this.price = newPrice;
        } else {
            _logs.push(`try to change price form ${this.price} to ${newPrice}`);
            console.log('Cant set smaller price');
        }

        return this;
    };

    this.add = function (sCart) {
        if (sCart instanceof ShoppingCart) {
            if (!this.getCart()) {
                shopCartName = sCart.name;
                _logs.push(`${this.name} is added to ${shopCartName} on ${new Date()}`);
            } else {
                console.error(`You cant do this. This is not your ${this.name}`);
            }
        }

        return this;
    };

    this.removeProduct = function (sCart) {
        if (sCart instanceof ShoppingCart) {
            _logs.push(`${this.name} is removed from ${shopCartName} on ${new Date()}`);
            shopCartName = '';
        }

        return this;
    };

    this.getHistory = function () {
        return _logs;
    };
}

function ShoppingCart(name, owner, maxCount) {
    let _productList = [];
    const _logs = [];

    isString(name) ? this.name = name : console.error('Please, enter the correct name');
    isString(owner) ? this.owner = owner : console.error('Please, enter the correct name');
    isNumber(maxCount) && Number.isInteger(maxCount) ? this.maxCount = maxCount : console.error('Enter correct number');

    this.addNewProduct = function (product) {
        if (product instanceof Product) {
            if (!product.getCart()) {
                if (_productList.length >= this.maxCount) {
                    let indexPrice = 0;
                    let minPrice = _productList[indexPrice].price;

                    for (let i = 1; i < _productList.length; i++) {
                        if (_productList[i].getPrice() < minPrice) {
                            minPrice = _productList[i].getPrice();
                            indexPrice = i;
                        }
                    }
                    _productList.splice(indexPrice, 1);
                }
                product['dateOfAddToCart'] = new Date();
                _productList.push(product);
                product.add(this);
                _logs.push(`${product.name} was added to ${this.name} on ${product['dateOfAddToCart']}`);
            } else {
                console.error(`You cant do this. This is not your ${product.name}`);
            }
        } else {
            console.error('Please try to add Product instance');
        }

        return this;
    };

    this.removeProduct = function (product) {
        if (product instanceof Product) {
            let idOfProduct = _productList.indexOf(product);
            _productList.splice(idOfProduct, 1);
            _logs.push(`${product.name} was removed from ${this.name} on ${new Date()}`);
            product.removeProduct(this);

            return this;
        }
    };

    this.getAveragePrice = function () {
        return this.getTotalPrice() / _productList.length;
    };

    this.getProducts = function () {
        return _productList;
    };

    this.getFormattedListOfProducts = function () {
        return this.getProducts().map(product =>
            `${product.name} - is on ${this.name} from ${product['dateOfAddToCart']}. \
Detailed product description: ${JSON.stringify(product.description)}`);
    };

    this.getTotalPrice = function () {
        let totalPrice = _productList.reduce(function (sum, current) {
            return sum + current.getPrice();
        }, 0);
        return totalPrice;
    };

    this.getHistory = function () {
        return _logs;
    };
}


//Examples of the code
const banana1 = new Product('banana1', {
    color: 'yellow',
    size: 'medium'
}, 40);
const banana2 = new Product('banana2', {
    color: 'yellow',
    size: 'medium'
}, 40);
const banana3 = new Product('banana3', {
    color: 'yellow',
    size: 'medium'
}, 40);
const banana4 = new Product('banana4', {
    color: 'yellow',
    size: 'medium'
}, 40);
const banana5 = new Product('banana5', {
    color: 'yellow',
    size: 'medium'
}, 40);
const apple = new Product('apple', {
    color: 'yellow',
    size: 'medium'
}, 20);
const avocado = new Product('avocado', {
    color: 'green',
    size: 'small'
}, 45);

const stevesShopCart = new ShoppingCart('stevesCart', 'Steve', 5);


stevesShopCart
    .addNewProduct(banana1)
    .addNewProduct(banana2)
    .addNewProduct(apple)
    .removeProduct(banana1);

console.log('average price:', stevesShopCart.getAveragePrice());
console.log('total price:', stevesShopCart.getTotalPrice());

console.log(
    'Cart history:', stevesShopCart.getHistory(),
    'Product history:', banana2.getHistory());

stevesShopCart.addNewProduct('apple string'); //Please try to add Product instance

avocado
    .setPrice(20)
    .setPrice(100);
console.log('Product history:', avocado.getHistory());

console.table(stevesShopCart.getFormattedListOfProducts());

//cheaper product is removed to create space for more bananas
stevesShopCart
    .addNewProduct(banana3)
    .addNewProduct(banana4)
    .addNewProduct(banana5)
    .addNewProduct(banana1);

console.table(stevesShopCart.getFormattedListOfProducts());

//we can't steal products from another cart
const edShoppingCart = new ShoppingCart('Edhard Shopping Cart', 'Edhard', 5);

edShoppingCart.addNewProduct(banana1); //You cant do this. This is not your banana1
console.log('Product history:', banana1.getHistory());
