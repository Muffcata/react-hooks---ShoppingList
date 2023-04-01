import { Component } from 'react';
import style from './ShoppingItem.module.css';

export class ShoppingItem extends Component {
  deleteThisItem = () => {
    const { item, deleteItems } = this.props;
    const { id } = item;
    deleteItems(id);
  };

  componentWillUnmount() {
    alert(`${this.props.item.name} is going to be removed`);
    console.warn('Why do you hate me?');
  }
  // componentDidUpdate(prevProps) {
  //   console.log('previous:', prevProps.item);
  //   console.log('current:', this.props.item);
  //   console.log('Is it the same?:', prevProps.item === this.props.item);
  // }
  render() {
    const { item } = this.props;

    return (
      <>
        <div className={style.list}>
          {item.name}

          <button
            className={style.button}
            type="button"
            onClick={this.deleteThisItem}
          >
            Delete
          </button>
        </div>
      </>
    );
  }
}
export default ShoppingItem;
