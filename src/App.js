import React, { Component } from 'react';
import './App.css';
import WaiterList from './WaiterList';
import CreateWaiter from './CreateWaiter';
import MenuItemList from './MenuItemList';
import CreateMenuItem from './CreateMenuItem';
import OrderModal from './OrderModal';

class App extends Component {
  constructor(){
    super();

    this.state = {
      waiters: [],
      // waiterOrders: [],
      menuItems: [],
      // edited_waiter: '',
      // edited_menu_item: ''
      modalOpen: false

    }
  }

  componentDidMount(){
    this.getWaiters()
    .then((response) => {
      this.setState({waiters: response});
    })

    .catch((err) => {
      console.log(err);
    })

    this.getMenuItems()
    .then((response) => {
      this.setState({menuItems: response});
    })

    .catch((err) => {
      console.log(err);
    })

    this.getOrdersByWaiter()
    .then((response) => {
      this.setState({waiterOrderItems: response});
    })

    .catch((err) => {
      console.log(err);
    })
  }

  getWaiters = async () => {
    const waitersJson = await fetch('http://localhost:9292/waiters');
    const waiters = await waitersJson.json();
    return waiters

  }

  getMenuItems = async () => {
    const menuItemsJson = await fetch('http://localhost:9292/menuitems');
    const menuItems = await menuItemsJson.json();
    return menuItems
  }

  addWaiter = async (name) => {
    const waiter = await fetch('http://localhost:9292/waiters', {
      method: 'POST',
      body: JSON.stringify({name: name})
    });

    const waiterParsed = await waiter.json();
    this.setState({waiter: [...this.state.waiter, waiterParsed]})
    return waiterParsed;
  }

  addMenuItem = async (name) => {
    const menuItem = await fetch('http://localhost:9292/menuitems', {
      method: 'POST',
      body: JSON.stringify({name: name})
    });

    const menuItemParsed = await menuItem.json();
    this.setState({menuItem: [...this.state.menuItem, menuItemParsed]})
    return menuItemParsed;
  }

  deleteWaiter = async (e) => {
    console.log("is delete item being clicked?");

    const id = e.currentTarget.id;

    console.log(id, 'this is the id in deleteWaiter');

    const waiter = await fetch('http://localhost:9292/waiters/' + id, {
        method: 'DELETE'
    });
    try {
      await waiter.json();
      this.setState({waiters: this.state.waiters.filter((waiter) => waiter.id !== id)})
    }

    catch(err){
      console.log(err);
    }

  }

  deleteMenuItem = async (e) => {
    console.log("is delete item being clicked?");

    const id = e.currentTarget.id;

    console.log(id, 'this is the id in deleteItem');

    const menuItem = await fetch('http://localhost:9292/menuitems/' + id, {
        method: 'DELETE'
    });

    const response = await menuItem.json();
    if(response.success){
      this.setState({menuItems: this.state.menuItems.filter((menuItem) => menuItem.id !== id)})
    } else {

    }
  }

  getOrdersByWaiter = async (e) => {
    console.log("orders button is being clicked");
    //need to launch modal that shows order
  }

  openModal = (e) => {

    this.setState({
      modalOpen: true,
    })
  }

  render() {
    console.log(this.state, "this is this.state in JS");

    return (
      <div className="App">
        <h4>This is a restaurant app</h4>
        <WaiterList waiters={this.state.waiters}  getOrdersByWaiter={this.getOrdersByWaiter} deleteWaiter={this.deleteWaiter} openModal={this.openModal} />
        <CreateWaiter addWaiter={this.addWaiter} />
        <MenuItemList menuItems={this.state.menuItems} deleteMenuItem={this.deleteMenuItem} />
        <CreateMenuItem addMenuItem={this.addMenuItem} />
        <OrderModal modalState={this.state.modalOpen} />
      </div>
    );
  }
}

export default App;
