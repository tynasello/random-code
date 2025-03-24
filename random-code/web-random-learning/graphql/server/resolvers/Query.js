const { mainCards, animals, animalClasses } = require('../db');

const Query = {
    mainCards: () => mainCards,
    animals: () => animals,
    animal: (parent, args, context) => {
        return animals.find((animal) => animal.species == args.species);
    },
    animalClasses: () => animalClasses,
    animalClass: (parent, args, context) => {
        return animalClasses.find(
            (animalClass) => animalClass.animalClassName == args.animalClassName
        );
    },
};

module.exports = Query;
