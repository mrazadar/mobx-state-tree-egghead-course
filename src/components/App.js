import React from 'react';
import logo from '../assets/logo.svg';
import '../assets/App.css';

import WishListView from './WishListView'

class App extends React.Component {
  render(){
    console.log("wishList", this.props.wishList)
    return (
      <div className="App">
        <header className="App-header">        
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Learn MST </h1>
        </header>
        <WishListView wishList={this.props.wishList}/>
      </div>
    )
  }
}

export default App;
