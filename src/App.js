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

  componentDidUpdate(){
  }

  componentDidMount(){
    axios.get('http://api.giphy.com/v1/gifs/trending?api_key=' + apiKey)
      .then(res => {
        console.log("response", res);
        let trendingArray = res.data.data;
        let urlsOnly = trendingArray.map(({embed_url}) => embed_url);
        this.setState((state, props) => state.filterArray = urlsOnly);
        this.setState((state, props) => state.defaultArray = trendingArray);
      })
  }

  render(){
    console.log("rendering", this.state.filterArray)
    return (
      <div>
        <p>
          {this.state.filterArray.map(url => <img src={url} alt={url} key={url} />)}
        </p>
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
  }

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
        <RenderGifs inputArray={this.state.filterArray} />
      </div>
    );
  }
}

export default App;
