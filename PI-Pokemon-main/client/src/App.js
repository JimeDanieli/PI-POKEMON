import React from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import PokeDetail from './components/PokeDetail/PokeDetail';
import CreatePoke from './components/CreatePoke/CreatePoke';



function App() {
  return (
    <div>
      
        <Route exact path="/" component={Landing} />
       {/*  <Route path='/main' component ={NavBar}/> */}
        <Route exact path ='/main' component={Home}/>
       {/*  <Route exact path ='/main' component={SearchBar}/> */}
        <Route exact path ='/main/detail/:id' component={PokeDetail}/>
        <Route exact path ='/main/createPoke' component={CreatePoke}/>
     
    </div>
  );
}

export default App;
