import { gql, useQuery } from '@apollo/client';
import React from 'react';
import animalImages from '../../assets/images';

const CARDS_QUERY = gql`
    {
        mainCards {
            image
            title
        }
    }
`;

function Hero() {
    const { loading, error, data } = useQuery(CARDS_QUERY);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error Querying Data ⌛️ </div>;

    return (
        <div
            className="flex flex-wrap justify-center"
            style={{ justifyContent: 'center' }}
        >
            {data.mainCards.map((card) => {
                return (
                    <div className="m-5">
                        <h3 className="text-center text-lg">{card.title}</h3>
                        <img
                            className="rounded-lg mt-2"
                            src={animalImages[card.image]}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default Hero;
