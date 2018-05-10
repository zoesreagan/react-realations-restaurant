import React, { Component } from 'react';
import './style.css';

class OrderModal extends Component {
  constructor(){
    super();

    this.state = {

    }
  }

  render(){
    const cssClass = this.props.modalState ? 'Modal-Open' : 'Modal-Closed'
    return(
            <div className={cssClass}>
            </div>)

    const orderList = ({waiters, getOrdersByWaiter}) => {
      console.log(waiters);
      const orderItems = orderItems.map((orders, i) => {
        return (
          <li key={orders.id}>{orders}
            </li>)
            })
        return (
            <ul>{orderList}</ul>
          )}
        }
    }



export default OrderModal;
