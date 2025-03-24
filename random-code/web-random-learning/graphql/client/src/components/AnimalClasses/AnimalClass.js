import React from 'react';
import { Link } from 'react-router-dom';
import animalImages from '../../assets/images';

function AnimalClass({ animalClass }) {
    return (
        <Link
            className="p-3"
            to={`/animalClass/${animalClass.animalClassName}`}
        >
            {' '}
            <h3 className="text-center text-lg">
                {animalClass.animalClassName}
            </h3>
            <img
                src={animalImages[animalClass.image]}
                style={{ borderRadius: '100%' }}
                className="my-3"
            />
        </Link>
    );
}

export default AnimalClass;
