import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './SearchField.css';

class SearchField extends Component {
  constructor(props){
    super(props);

    this.handleSearch= this.handleSearch.bind(this)
  }

  handleSearch(){
    let searchTerm = document.getElementById('search-field').value;
    this.props.callback(searchTerm)
  }

  render(){
    return(
      <div className="search-field">
        <br />
        Enter a search term:
        <br />
        <input type="text" id="search-field" />
        <input type="button" value="Search" onClick={this.handleSearch}/>
      </div>
    )
  }
}

SearchField.propTypes = {
  callback: PropTypes.func,
}
export default SearchField;
