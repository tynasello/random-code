const { animalClasses } = require('../db');

const Animal = {
    animalClass: (parent, args, { animalClass }) => {
        return animalClasses.find(
            (animalClass) => animalClass.animalClassName == parent.animalClass
        );
    },
};

module.exports = Animal;
