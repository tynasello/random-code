import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import animalImages from '../assets/images';

const CLASS_QUERY = gql`
    query ($animalClassName: String!) {
        animalClass(animalClassName: $animalClassName) {
            animals {
                species
                image
            }
        }
    }
`;

function AnimalClassPage() {
    const { animalClassName } = useParams();
    const { loading, error, data } = useQuery(CLASS_QUERY, {
        variables: { animalClassName: animalClassName },
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error Querying Data ⌛️ </div>;

    const animals = data.animalClass.animals;

    return (
        <div className="flex flex-wrap">
            {animals.map((animal) => {
                return (
                    <Link to={`/animal/${animal.species}`}>
                        {' '}
                        <h3>{animal.species}</h3>
                        <img src={animalImages[animal.image]} />
                    </Link>
                );
            })}
        </div>
    );
}

export default AnimalClassPage;
