import React from 'react';

const MenuItemList = ({menuItems, deleteMenuItem}) => {
  console.log(menuItems);
  const menuItemName = menuItems.map((menuItem, i) => {

    return (

      <li key={menuItem.id}>{menuItem.name}
        <button id={menuItem.id} onClick={deleteMenuItem}>Delete</button>

      </li>)
  })
  return (
    <ul>{menuItemName}</ul>
  )
}

export default MenuItemList;
