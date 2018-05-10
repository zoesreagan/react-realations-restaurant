import React, { Component } from 'react';

class CreateMenuItem extends Component {
  constructor(){
    super();

    //keeps track of what is going in the input field
    this.state =  {
      name: ''

    }
  }

  updateMenuItem = (e) => {
    const name = e.currentTarget.value; //adding value of input field to title variable
    this.setState({
      name: name
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.addMenuItem(this.state.name);
    //adding an item to database and make a POST request to Sinatra server
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <label form="menu item" />
        <input type="text" onChange={this.updateMenuItem}/>
        <input type="submit" />
      </form>
    )
  }
}

export default CreateMenuItem;
