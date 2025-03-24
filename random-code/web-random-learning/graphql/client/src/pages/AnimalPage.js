import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import animalImages from '../assets/images';

const ANIMAL_QUERY = gql`
    query ($species: String!) {
        animal(species: $species) {
            species
            image
            family
            desc
            animalClass {
                animalClassName
            }
        }
    }
`;

function AnimalPage() {
    const { species } = useParams();

    const { loading, error, data } = useQuery(ANIMAL_QUERY, {
        variables: { species: species },
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error Querying Data ⌛️ </div>;

    const animal = data.animal;

    return (
        <div>
            <h3>{animal.species}</h3>
            <img src={animalImages[animal.image]} />
            <h5>{animal.animalClass.animalClassName}</h5>
            <h5>{animal.family}</h5>
            <p>{animal.desc}</p>
        </div>
    );
}

export default AnimalPage;
