import React,{useState } from 'react';
import {useHistory} from 'react-router';
import styles from './SearchBar.module.css'

const SearchBar =()=>{
    const history =useHistory();
    const [name,setName] =useState('');


const handleOnClick=()=>{
    setName('');
    history.push(`/main?name=${name}`);

};
return (
    <div>
        <input className= {styles.input} onChange={({target:{value}})=> setName(value)} value={name} type='text' placeholder='Search by name'/>
        <button className={styles.btn} type='submit' onClick={handleOnClick}>Search</button>
    </div>
)
}

export default SearchBar;