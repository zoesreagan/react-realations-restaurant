import React, { Component } from 'react';

class CreateWaiter extends Component {
  constructor(){
    super();

    //keeps track of what is going in the input field
    this.state =  {
      name: ''

    }
  }

  updateWaiter = (e) => {
    const name = e.currentTarget.value; //adding value of input field to title variable
    this.setState({
      name: name
    })
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.addWaiter(this.state.name);
    //adding an item to database and make a POST request to Sinatra server
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <label form="waiter" />
        <input type="text" onChange={this.updateWaiter}/>
        <input type="submit" />
      </form>
    )
  }
}

export default CreateWaiter;
