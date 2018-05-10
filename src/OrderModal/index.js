import React from 'react';
import './style.css';

const OrderModal = (props) => {


  console.log(props, " this is this.props");
  // console.log(this.state, " this is this.state");

  const cssClass = props.modalOpen ? 'Modal-Open' : 'Modal-Closed'
  // const cssClass = 'Modal-Open'

  const list = props.orders.map((order, i) => <li key={i}>{order.notes}</li>)

  return(
    <ul className={cssClass}>{list}</ul>
  )

}

export default OrderModal;
