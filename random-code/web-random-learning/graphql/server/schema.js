const { gql } = require('apollo-server');

const typeDefs = gql`
    type MainCard {
        title: String!
        image: String!
    }
    type Animal {
        image: String!
        species: String!
        family: String!
        desc: [String!]!
        animalClass: AnimalClass!
    }
    type AnimalClass {
        animalClassName: String!
        image: String!
        animals: [Animal!]!
    }
    type Query {
        mainCards: [MainCard]
        animals: [Animal]
        animal(species: String!): Animal
        animalClasses: [AnimalClass!]!
        animalClass(animalClassName: String!): AnimalClass
    }
    # since no db, added animals will not persist
    type Mutation {
        addAnimal(
            image: String!
            species: String!
            family: String!
            desc: [String!]!
            animalClass: String!
        ): Animal!
        removeAnimal(species: String!): Boolean
        updateAnimal(
            image: String
            species: String
            family: String
            desc: [String]
            animalClass: String
        ): Boolean
    }
`;

module.exports = typeDefs;
