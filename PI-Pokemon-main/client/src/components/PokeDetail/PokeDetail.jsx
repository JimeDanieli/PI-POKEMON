import React,{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import { getPokeDetail,unmountGetPoke } from '../../actions';
import styles from './PokeDetail.module.css'
import { NavLink } from 'react-router-dom';

const PokeDetail= ()=>{
    const dispatch =useDispatch();
    const {poke} =useSelector((state)=> state);
    const {id} =useParams();


    useEffect(()=>{
        dispatch(getPokeDetail(id));
        return() =>{
            dispatch(unmountGetPoke());
        }
    }, [dispatch,id]);

    if(poke.name){
        return(
            <div  className={styles.cont} >
                <NavLink to='/main/createPoke'> 
                <button className={styles.btn}>
                 Create pokemon!
                </button>
                </NavLink>
                <h2 className={styles.title}>{poke.name.toUpperCase()}</h2>

                <div className={styles.cont} key={poke.id}>

                    <div>
                        <img className={styles.imgDetails} sre={poke.img} alt={poke.name}/>
                    </div>

                <div className={styles.detail}>
  
                <h2 className={styles.abilities}>ABILITIES</h2>

                <div className={styles.text}>
                     <p>healthPoints {poke.healthPoints} </p>
                    <meter value={poke.healthPoints} min="0" low="30" high="170" optimum="100" max="200"></meter>
                </div>

                <div className={styles.text}>
                    <p>Attack {poke.attack}</p>
                    <meter value={poke.attack} min="0" low="30" high="170" optimum="100" max="200"></meter>
                </div>

                <div className={styles.text}>
                    <p>Defense {poke.defense}</p>
                    <meter value={poke.defense} min="0" low="30" high="170" optimum="100" max="200"></meter>
                </div>

                <div className={styles.text}>
                    <p>Speed {poke.speed}</p>
                    <meter value={poke.speed} min="0" low="30" high="170" optimum="100" max="200"></meter>
                </div>

                <div className={styles.text}>
                    <p>Height {poke.height} m</p>
                    <meter value={poke.height} min="0" low="30" high="170" optimum="100" max="200"></meter>
                </div>

                <div className={styles.text}>
                   <p>Weight {poke.weight} kg </p>
                   <meter value={poke.weight} min="0" low="30" high="170" optimum="100" max="200"></meter>
                </div>

            <div>
                 {
                 poke.types && poke.types.map((type, k) => {
                     return (
                         <div className={styles.types} key={k}>
                            <img className={styles.typesImg}  src={type.img} alt={type.name} />
                            <p > {type.name.charAt(0).toUpperCase() + type.name.slice(1)} </p>
                        </div>
                    )
                })
               }
            </div>

          </div>
        </div>
    </div>
    )
  } else {
     return null;
  }
}

export default PokeDetail