import { Component } from 'react';
import ShoppingList from './ShoppingList/ShoppingList';

export class App extends Component {
  handleLogin = state => {
    console.log(state);
  };
  render() {
    return (
      <div>
        <ShoppingList />
      </div>
    );
  }
}

export default App;
