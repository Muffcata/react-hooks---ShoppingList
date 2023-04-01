import { Component } from 'react';
import { ShoppingItem } from 'components/ShoppingItem/ShoppingItem';
import style from './ShoppingList.module.css';

//componentDidMount -
//we take with localStorage last saved state
// componentDidUpdate -
// we save changed state to localStorage

// componentWillUnmount -
//   alert informating about removing with list

export class ShoppingList extends Component {
  state = {
    items: [],
    newItemName: '',
  };

  deleteItems = id => {
    this.setState(state => ({
      items: state.items.filter(item => item.id !== id),
    }));
  };

  addItem = evt => {
    evt.preventDefault();

    const { items } = this.state;
    const lastId =
      items.length > 0 ? Math.max(...items.map(item => item.id)) : 0;
    this.setState(state => ({
      items: state.items.concat({ name: state.newItemName, id: lastId + 1 }),
      newItemName: '',
    }));
  };

  handleInputChange = evt => {
    this.setState(state => ({ newItemName: evt.target.value }));
  };
  //method//
  //   shouldComponentUpdate(nextProps, nextState) {
  //     if (nextProps.value > 100) {
  //       return; // props from parents >100 is not render
  //     }
  //   }
  componentDidMount() {
    const list = window.localStorage.getItem('shoppin-list');
    console.log('list');
    if (!list) return; //if list no exist return nothing
    try {
      this.setState({
        items: JSON.parse(list),
      });
    } catch (e) {
      console.error(e);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.items.length !== this.state.length) {
      const shoppingListStringified = JSON.stringify(this.state.items);
      window.localStorage.setItem('shoppin-list', shoppingListStringified);
    }
  }
  render() {
    return (
      <div className={style.list}>
        <h1>Add ingredients:</h1>
        <form className={style.form} onSubmit={this.addItem}>
          <input
            className={style.input}
            value={this.state.newItemName}
            type="text"
            onChange={this.handleInputChange}
          />
          <button className={style.button} type="submit">
            Add to list
          </button>
        </form>
        <h2> List:</h2>
        {this.state.items.map((item, index) => {
          return (
            <ShoppingItem
              item={item}
              deleteItems={this.deleteItems}
              key={index}
            />
          );
        })}
      </div>
    );
  }
}
export default ShoppingList;
