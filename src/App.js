import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import SearchField from './components/SearchField.js'

let apiKey = "E3c9Wv2kVbdZeIzAstEXrhfOeprnt6Ik";

class RenderGifs extends Component {
  constructor(props){
    super(props);
    this.state = {
      filterArray: this.props.inputArray,
      defaultArray: []
    }
  }

  componentDidMount(){
    axios.get('http://api.giphy.com/v1/gifs/trending?api_key=' + apiKey)
      .then(res => {
        console.log("Loading trending gifs");
        let trendingArray = res.data.data;
        let filtered = trendingArray.map(({images}) => images);
        let imagesOnly = filtered.map(({original}) => original);
        let urlsOnly = imagesOnly.map(({url}) => url);
        this.setState((state, props) => state.filterArray = urlsOnly);
        this.setState((state, props) => state.defaultArray = trendingArray);
      })
  }

  render(){
    return (
      <div>
        <ul id="imageList">
          {this.state.filterArray.map(url => <li><img src={url} alt={url} key={url} /></li>)}
        </ul>
      </div>
    );
  }
}


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      inputArray: [],
      filterArray: []
    }
    this.fetchGifs = this.fetchGifs.bind(this);
  }

  fetchGifs(searchTerm){
    let searchLink = "http://api.giphy.com/v1/gifs/search?q="+searchTerm+"&api_key="+apiKey;
    console.log("Loading gifs that match: " + searchTerm);
    axios.get(searchLink)
      .then(res => {
        let trendingArray = res.data.data;
        let filtered = trendingArray.map(({images}) => images);
        let imagesOnly = filtered.map(({original}) => original);
        let urlsOnly = imagesOnly.map(({url}) => url);
        this.setState((state, props) => state.filterArray = urlsOnly);
        this.setState((state, props) => state.defaultArray = trendingArray);
      })
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          GIPHY API Search
        </header>
        <SearchField callback={this.fetchGifs}/>
        <RenderGifs inputArray={this.state.filterArray} />
      </div>
    );
  }
}

export default App;
