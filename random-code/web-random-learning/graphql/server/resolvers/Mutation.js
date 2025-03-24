const { animals, animalClasses } = require('../db');

const Mutation = {
    addAnimal: (
        parent,
        { image, species, family, desc, animalClass },
        context
    ) => {
        const newAnimal = {
            image,
            species,
            family,
            desc,
            animalClass,
        };
        animals.push(newAnimal);
        return newAnimal;
    },
    removeAnimal: (parent, { species }, context) => {
        const animalIndex = animals.findIndex((animal) => {
            return animal.species == species;
        });
        if (animalIndex != -1) {
            animals.splice(animalIndex, 1);
            return true;
        }
        return false;
    },
    updateAnimal: (
        parent,
        { image, species, family, desc, animalClass },
        context
    ) => {
        const animalIndex = animals.findIndex((animal) => {
            return animal.species == species;
        });
        let classExists = false;

        animalClasses.forEach((class_) => {
            if (class_.animalClassName == animalClass) classExists = true;
        });
        if (
            animalIndex == -1 ||
            !classExists ||
            animals[animalIndex].species != species ||
            animals[animalIndex].animalClass != animalClass
        )
            return false;

        animals[animalIndex] = {
            image,
            species,
            family,
            desc,
            animalClass,
        };
        return true;
    },
};

module.exports = Mutation;
