import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterCreated, orderName, filterType, getTypes } from '../../actions/index';

import styles from './Filters.module.css'

const Filters = () => {
    const dispatch = useDispatch()//manda la action al reducer
    const { types } = useSelector((state) => state);//me trae una cierta info seleccionada, parecido al mapStateToProps


    useEffect(() => {//toma el valor inicial de mi state y devuelve array con el valor del state y la funcion para setear el nuevo state
        dispatch(getTypes());
    }, [dispatch]);

    const handleFilterCreated = (e) => {
        e.preventDefault();
        dispatch(filterCreated(e.target.value))
    }

    const handleSort = (e) => {
        e.preventDefault();
        dispatch(orderName(e.target.value))

    }

    const handleFilterType = (e) => {
        e.preventDefault();
        dispatch(filterType(e.target.value))

    }

    return (

        <div className={styles.container}>
            <div>
                <h4 className={styles.title}>Order</h4>
                <label className={styles.label} htmlFor="">Alphabetically  </label>
                <select className={styles.select} onChange={e => handleSort(e)} >
                    <option >-</option>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
            </div>
    
            <div>
                <h4 className={styles.title}>Filters</h4>
                <label className={styles.label} htmlFor=""> Created - Api  </label>
                <select className={styles.select} onChange={e => handleFilterCreated(e)} >
                    <option >-</option>
                    <option value="all">All Pokemons </option>
                    <option value="created">Data Base</option>
                    <option value="api">All Api</option>
                </select>



                <label className={styles.label} htmlFor=""> Types  </label>
                <select className={styles.select} onChange={e => handleFilterType(e)} >
                    {
                        types.map((type, k) => (
                            <option value={type.name} key={k}  > {/* funciona como selector */}
                                {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                            </option>
                        ))
                    }
                </select>
            </div>

        </div >


    );
}



export default Filters;
