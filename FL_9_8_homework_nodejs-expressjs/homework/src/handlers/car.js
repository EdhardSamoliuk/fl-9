const fs = require('fs');
const dirname = 'db/data.json';

function getJson() {
    const items = fs.readFileSync(dirname);

    return JSON.parse(items);
}

const create = function (req, res) {
    const carsList = getJson();
    const newCar = req.body;

    if (carsList.find(el => el.id === newCar.id)) {
        res.status(409).send({
            'message': 'Car already exists.'
        });
    } else {
        fs.writeFile(dirname, JSON.stringify(carsList));
        res.status(201).json(newCar);
    };
};

const getAll = function (req, res) {
    const carsList = getJson();

    res.status(200).send(JSON.stringify(carsList));
};

const getById = function (req, res) {
    const carsList = getJson();
    const searchId = parseInt(req.params.id);
    const foundCar = carsList.find(el => el.id === searchId);

    if (foundCar) {
        res.status(200).json(foundCar);
    } else {
        res.status(404).send();
    };
};

const update = function (req, res) {
    const carsList = getJson(); //mb let
    const searchId = parseInt(req.params.id);
    const uppCar = req.body;
    const foundCarIndex = carsList.findIndex(el => el.id === searchId);

    if (foundCarIndex === -1) {
        res.status(404).send();
    } else {
        carsList[foundCarIndex] = uppCar;
        fs.writeFile(dirname, JSON.stringify(carsList));
        res.status(200).json(uppCar);
    };
};

const remove = function (req, res) {
    const carsList = getJson();
    const searchId = parseInt(req.params.id);
    const foundCarIndex = carsList.findIndex(el => el.id === searchId);

    if (foundCarIndex === -1) {
        res.status(404).send();
    } else {
        carsList.splice(foundCarIndex, 1);
        fs.writeFile(dirname, JSON.stringify(carsList));
        res.status(200).send({
            'message': 'The car has been successfully removed'
        });
    }
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove
}
