import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PokeCard from '../PokeCard/PokeCard';
import { getPokemons, unmountGetPoke } from '../../actions/index';
import { useLocation } from 'react-router'
import styles from './Pages.module.css'
import Filters from '../Filters/Filters'
import SearchBar from '../SearchBar/SearchBar'



const Pages = () => {
    const query = new URLSearchParams(useLocation().search.slice(1));
    const dispatch = useDispatch();
    const { pokemons } = useSelector(state => state);
    const name = query.get('name');
    const [currentPage, setCurrentPage] = useState(0);
    const allPokemons = pokemons.slice(currentPage, currentPage + 12);

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


    if (allPokemons) {
        const pokeComponent = () => (
            <div >
                <SearchBar/>
                
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
                    allPokemons && (
                        <div className={styles.cardPoke}>
                            {
                                allPokemons.map(poke => <PokeCard key={poke.id} poke={poke} />)
                            }
                        </div>
                    )
                }
            </div >
        );
        return allPokemons.length ? pokeComponent() : <div className={styles.loading}>   L O A D I N G ... </div>
    }
    
}

export default Pages;


