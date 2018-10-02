'use strict';

function isString(string) {
    return string.length > 0 && typeof string === 'string';
}

function isNumber(number) {
    return typeof number === 'number' && !isNaN(number) && isFinite(number) && number > 0;
}

function Product(name, description, price) {
    let shopCartName = '';
    const _logs = [];

    isString(name) ? this.name = name : console.error('Please, enter correct name');
    typeof description === 'object' ? this.description = description : console.error('Description must be object');
    isNumber(price) ? this.price = price : console.error('Please, enter price>0');

    this.getCart = function () {
        return shopCartName;
    }
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
            if (ShoppingCart === '') {
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
            if (product.getCart() === '') {
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
                _logs.push(`${product.name} was added to ${this.shoppingCartName} on ${product['dateOfAddToCart']}`);
            } else {
                console.error(`You cant do this. This is not your ${this.name}`);
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
