import { gql, useMutation, useQuery } from '@apollo/client';
import React from 'react';
import AnimalsSection from '../components/Animal/AnimalsSection';
import ClassesSection from '../components/AnimalClasses/ClassesSection';
import Hero from '../components/Hero/Hero.js';

const ANIMALS_QUERY = gql`
    {
        animals {
            image
            species
            family
        }
    }
`;
const ADD_ANIMAL_MUTATION = gql`
    mutation (
        $image: String!
        $species: String!
        $animalClass: String!
        $family: String!
        $desc: [String!]!
    ) {
        addAnimal(
            species: $species
            image: $image
            family: $family
            desc: $desc
            animalClass: $animalClass
        ) {
            species
        }
    }
`;
const REMOVE_ANIMAL_MUTATION = gql`
    mutation ($species: String!) {
        removeAnimal(species: $species)
    }
`;

function LandingPage() {
    const { loading, error, data } = useQuery(ANIMALS_QUERY);
    const [addAnimal] = useMutation(ADD_ANIMAL_MUTATION);
    const [removeAnimal] = useMutation(REMOVE_ANIMAL_MUTATION);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error Querying Data ⌛️ </div>;

    return (
        <div>
            <h1 className="text-center text-blue-700 text-xl mt-5">
                {' '}
                Animal Bank
            </h1>
            <Hero />
            <ClassesSection />
            <AnimalsSection animals={data.animals} />
            <div
                className="flex flex-wrap justify-center my-5"
                style={{ justifyContent: 'center' }}
            >
                <button
                    className="font-bold py-2 px-4 "
                    onClick={() => {
                        window.location.reload();
                        addAnimal({
                            variables: {
                                species: 'Holarctic Tree Frog',
                                image: 'holarctictreefrog',
                                family: 'Hylidae',
                                desc: [
                                    'As traditionally defined, it was a wastebasket genus with more than 300 species found in Europe, Asia, Africa, and across the Americas.',
                                ],
                                animalClass: 'Amphibian',
                            },
                        });
                    }}
                >
                    Add Holarctic Tree Frog
                </button>
                <button
                    className="font-bold py-2 px-4 "
                    onClick={() => {
                        window.location.reload();
                        removeAnimal({
                            variables: {
                                species: 'Holarctic Tree Frog',
                            },
                        });
                    }}
                >
                    Remove Holarctic Tree Frog
                </button>
            </div>
        </div>
    );
}

export default LandingPage;
