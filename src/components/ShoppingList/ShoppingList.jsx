// import { Component } from 'react';
import { ShoppingItem } from 'components/ShoppingItem/ShoppingItem';
import style from './ShoppingList.module.css';

import React from 'react';
import { useEffect, useState } from 'react';
//componentDidMount -
//we take with localStorage last saved state
// componentDidUpdate -
// we save changed state to localStorage

// componentWillUnmount -
//   alert informating about removing with list

// export class ShoppingList extends Component {
//   state = {
//     items: [],
//     newItemName: '',
//   };

export const ShoppingList = () => {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');

  const deleteItems = id => {
    const newItemState = items.filter(item => item.id !== id);
    setItems(newItemState);
  };

  const addItem = evt => {
    evt.preventDefault();
    const lastId =
      items.length > 0 ? Math.max(...items.map(item => item.id)) : 0;
    const newItemsState = items.concat({ name: newItemName, id: lastId + 1 });
    setItems(newItemsState);
    setNewItemName('');
  };

  // handleInputChange = evt => {
  //   this.setState(state => ({ newItemName: evt.target.value }));
  // };

  const handleInputChange = evt => setNewItemName(evt.target.value);

  //method//
  //   shouldComponentUpdate(nextProps, nextState) {
  //     if (nextProps.value > 100) {
  //       return; // props from parents >100 is not render
  //     }
  //   }
  //   componentDidMount() {
  //     const list = window.localStorage.getItem('shoppin-list');
  //     console.log('list');
  //     if (!list) return; //if list no exist return nothing
  //     try {
  //       this.setState({
  //         items: JSON.parse(list),
  //       });
  //     } catch (e) {
  //       console.error(e);
  //     }
  // }

  useEffect(() => {
    const list = window.localStorage.getItem('shoppin-list');
    console.log('list');
    if (!list) return; //if list no exist return nothing
    try {
      setItems(JSON.parse(list));
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    const shoppingListStringified = JSON.stringify(items);
    window.localStorage.setItem('shoppin-list', shoppingListStringified);
  }, [items]);
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.items.length !== this.state.length) {
  //     const shoppingListStringified = JSON.stringify(this.state.items);
  //     window.localStorage.setItem('shoppin-list', shoppingListStringified);
  //   }
  // }

  return (
    <div className={style.list}>
      <h1>Add ingredients:</h1>
      <form className={style.form} onSubmit={addItem}>
        <input
          className={style.input}
          value={newItemName}
          type="text"
          onChange={handleInputChange}
        />
        <button className={style.button} type="submit">
          Add to list
        </button>
      </form>
      <h2> List:</h2>
      {items.map((item, index) => {
        return (
          <ShoppingItem item={item} deleteItems={deleteItems} key={index} />
        );
      })}
    </div>
  );
};

export default ShoppingList;
