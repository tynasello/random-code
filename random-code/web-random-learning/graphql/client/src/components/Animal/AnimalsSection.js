import React from 'react';
import { Link } from 'react-router-dom';
import animalImages from '../../assets/images';

function AnimalsSection({ animals }) {
    return (
        <div
            className="flex flex-wrap justify-center my-5"
            style={{ justifyContent: 'center' }}
        >
            {animals.map((animal) => {
                return (
                    <Link className="m-3" to={`/animal/${animal.species}`}>
                        {' '}
                        <h3 className="text-center pb-1">{animal.species}</h3>
                        <img
                            src={animalImages[animal.image]}
                            className="rounded-lg"
                        />
                    </Link>
                );
            })}
        </div>
    );
}

export default AnimalsSection;
