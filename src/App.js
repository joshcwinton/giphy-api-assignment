import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import SearchField from './components/SearchField.js'

class App extends Component {
  fetchGifs(searchTerm){
    console.log(searchTerm)
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          GIPHY API Search
        </header>
        <SearchField callback={this.fetchGifs}/>
      </div>
    );
  }
}

export default App;
