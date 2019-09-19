import React from 'react';
import logo from '../assets/logo.svg';
import '../assets/App.css';

import WishListView from './WishListView'

class App extends React.Component {
  constructor(){
    super()
    this.state = { selectedUser: null}
  }
  render(){
    const {group} = this.props  
    const selectedUser = group.users.get(this.state.selectedUser)
    return (
      <div className="App">
        <header className="App-header">        
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Learn MST </h1>
        </header>
        <select onChange={this.onSelectUser}>
          <option> - Select User -</option>
          {
            [...group.users.values()].map(user => 
              <option key={user.id} value={user.id}>
                {user.name}
              </option>  
            )
          }
        </select>
        { selectedUser && <WishListView wishList={selectedUser.wishList}/> }
      </div>
    )
  }
  onSelectUser = event => {
    this.setState({
      selectedUser: event.target.value
    })
  }
}

export default App;
