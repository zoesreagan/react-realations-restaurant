import React from 'react';

const WaiterList = ({waiters, deleteWaiter, getOrdersByWaiter}) => {
  console.log(waiters);
  const waiterNames = waiters.map((waiter, i) => {

    return (

      <li key={waiter.id}>{waiter.name}
        <button id={waiter.id} onClick={deleteWaiter}>Delete</button>
        <button id={waiter.id}onClick={getOrdersByWaiter}>Show Orders</button>
      </li>)
  })
  return (
    <ul>{waiterNames}</ul>
  )
}

export default WaiterList;
