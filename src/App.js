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
      modalOpen: false,
      orders: []
    }
  }

  componentDidMount(){
    this.getWaiters()
    .then((response) => {
      console.log(response)
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

    .catch((err) => {
      console.log(err);
    })
  }

  getWaiters = async () => {
    const waitersJson = await fetch('http://localhost:9292/waiters');
    console.log(waitersJson, " waitersJson");
    const waiters = await waitersJson.json();
    console.log(waiters)
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
    console.log(waiterParsed, ".... this is waiter parsed in addWaiter")
    this.setState({waiters: [...this.state.waiters, waiterParsed]})
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

    const id = e.currentTarget.parentNode.id;

    console.log(id, 'this is the id in deleteWaiter');

    const waiter = await fetch('http://localhost:9292/waiters/' + id, {
        method: 'DELETE'
    });

    const parsedResponse = await waiter.json();
    console.log(parsedResponse, "parsedResponse in deleteWaiter");
    
    if(parsedResponse.success) {
      try {

        this.setState({waiters: this.state.waiters.filter(waiter => waiter.id != id)})
      }

      catch(err){
        console.log(err);
      }
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


    // this.getOrdersByWaiterAndOpenModal()
    // .then((response) => {
    //   this.setState({waiterOrderItems: response});
    // })
  getOrdersByWaiterAndOpenModal = async (e) => {
    const id = e.currentTarget.parentNode.id;
    console.log(id, "id for the next thing")
    const resolvedResponsePromise = await fetch('http://localhost:9292/waiters/' + id + '/orders');
    const parsedResponse = await resolvedResponsePromise.json()
    console.log(parsedResponse, "parsedResponse from getOrdersByWaiterAndOpenModal in App")
    this.setState({
      modalOpen: true,
      orders: parsedResponse.orders
    })
  }


  render() {
    console.log(this.state, "this is this.state in App");

    return (
      <div className="App">
        <h4>This is a restaurant app</h4>
        <WaiterList waiters={this.state.waiters}  getOrdersByWaiterAndOpenModal={this.getOrdersByWaiterAndOpenModal} deleteWaiter={this.deleteWaiter} openModal={this.openModal} />
        <CreateWaiter addWaiter={this.addWaiter} />
        <MenuItemList menuItems={this.state.menuItems} deleteMenuItem={this.deleteMenuItem} />
        <CreateMenuItem addMenuItem={this.addMenuItem} />
        <OrderModal modalOpen={this.state.modalOpen} orders={this.state.orders} />
      </div>
    );
  }
}

export default App;
