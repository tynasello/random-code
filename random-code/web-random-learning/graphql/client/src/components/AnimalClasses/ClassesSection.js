import { gql, useQuery } from '@apollo/client';
import React from 'react';
import AnimalClass from './AnimalClass';

const CLASSES_QUERY = gql`
    {
        animalClasses {
            animalClassName
            image
        }
    }
`;

function ClassesSection(props) {
    const { loading, error, data } = useQuery(CLASSES_QUERY);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error Querying Data ⌛️ </div>;

    return (
        <div className="flex flex-wrap " style={{ justifyContent: 'center' }}>
            {data.animalClasses.map((animalClass) => {
                return <AnimalClass animalClass={animalClass}></AnimalClass>;
            })}
        </div>
    );
}

export default ClassesSection;
