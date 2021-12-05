import React from 'react';
import styles from './Landing.module.css';
import { useHistory } from 'react-router-dom';

const Landing = () => {
    const history = useHistory();
    const handleOnClick = () => history.push('/main');
    return (
        <div className={styles.ctn}>
            <h1 className={styles.tittle} onClick={handleOnClick}>WELCOME TO THE POKEAPP</h1>
        </div>
    )
};

export default Landing;