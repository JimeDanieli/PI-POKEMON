import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PokeCard from '../PokeCard/PokeCard';
import { getPokemons, unmountGetPoke } from '../../actions/index';
import { useLocation } from 'react-router'
import styles from './Pages.module.css'
import Filters from '../Filters/Filters'


const Pages = () => {
    const query = new URLSearchParams(useLocation().search.slice(1));
    const dispatch = useDispatch();
    const { pokemons } = useSelector(state => state);
    const name = query.get('name');


    const [currentPage, setCurrentPage] = useState(0);
    const pokemonsI = pokemons.slice(currentPage, currentPage + 12);

    const nextPage = () => {
        setCurrentPage(currentPage + 12);
    };
    const prevPage = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 12);
    };


    useEffect(() => {
        name ? dispatch(getPokemons(name)) : dispatch(getPokemons());
        return () => {
            dispatch(unmountGetPoke());
        };
    }, [dispatch, name])


    if (pokemonsI) {
        const pokeComponent = () => (
            <div >
                <Filters />
                <div className={styles.pagination}>
                    {currentPage > 0 ? (
                        <button className={styles.btn} onClick={prevPage}>
                            Prev 
                        </button>
                    ) : null}
                    {currentPage < 36 ? (
                        <button className={styles.btn} onClick={nextPage}>
                            Next 
                        </button>
                    ) : null}
                </div>

                {
                    pokemonsI && (
                        <div className={styles.cardPoke}>
                            {
                                pokemonsI.map(poke => <PokeCard key={poke.id} poke={poke} />)
                            }
                        </div>
                    )
                }
            </div >
        );
        return pokemonsI.length ? pokeComponent() : <div className={styles.loading} />
    }
    
}

export default Pages;