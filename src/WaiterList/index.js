import React from 'react';

// const WaiterList = ({waiters, deleteWaiter, getOrdersByWaiter}) => {
const WaiterList = (props) => {

  const waiters = props.waiters;
  const deleteWaiter = props.deleteWaiter;
  const getOrdersByWaiterAndOpenModal = props.getOrdersByWaiterAndOpenModal;



  console.log(waiters);
  const waiterNames = waiters.map((waiter, i) => {

    return (

      <li id={waiter.id} key={waiter.id}>{waiter.name}
        <button onClick={deleteWaiter}>Delete</button>
        <button onClick={getOrdersByWaiterAndOpenModal}>Show Orders</button>
      </li>)
  })
  return (
    <ul>{waiterNames}</ul>
  )
}

export default WaiterList;
