import React from "react";
import styles from './PokeCard.module.css';
import {Link} from 'react-router-dom';

const PokeCard =({poke}) =>{
    return(
        <div className={styles.card} key={poke.id}>
            <Link className={styles.title} to={`/main/detail/${poke.id}`}>
            <div>
                <img className={styles.img} src={poke.img} alt={poke.name}/>
            </div>
            <div className={styles.cardText}>
                <div>
                    <h2>{poke.name.charAt(0).toUpperCase()+ poke.name.slice(1)}</h2>
                </div>
                {
                    poke.types &&poke.types.map((t,k) =>{
                        return(
                            <div className={styles.icon} key={k}>
                                <img className={styles.typesImg} src={t.img} alt={t.name}/>
                                <p className={styles.text}>{t.name.charAt(0).toUpperCase() + t.name.slice(1)}</p>
                            </div>
                        )
                    })
                }
            </div>
                </Link>
        </div>
    )
}

export default PokeCard;