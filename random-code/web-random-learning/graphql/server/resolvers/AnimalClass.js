const { animals } = require('../db');

const AnimalClass = {
    animals: (parent, args, context) => {
        return animals.filter(
            (animal) => animal.animalClass == parent.animalClassName
        );
    },
};

module.exports = AnimalClass;
