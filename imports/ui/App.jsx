import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Tasks } from '../api/tasks.js';
import { Meteor } from 'meteor/meteor';
import Task from './Task.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import ReactDOM from 'react-dom';

console.log("###");
console.log(Tasks.find({}, { sort: { createdAt: -1 } }).fetch());
window.Tasks = Tasks;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideCompleted: false,
    };
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Tasks.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });

    ReactDOM.findDOMNode(this.refs.textInput).value = '';// clear form
  }
  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1> Todo List {this.props.incompleteCount}</h1>
          <label className="hide-completed">
            <input
              type="checkBox"
              readOnly
              checked={this.state.hideComplete}
              onClick={this.toggleHideCompleted.bind(this)}
               />
             Hide Completed Tasks
          </label>
          <AccountsUIWrapper />
          <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
            <input
              type="text"
              ref="textInput"
              placeholder="Please type your new task"/>
          </form>
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
};

export default createContainer(() => ({
  tasks: [{ _id: 1, text: 'This is task 1' },{ _id: 2, text: 'This is task 2' }],
  //Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
  incompleteCount: Tasks.find({ checked: { $ne: false } }).count(),
  currentUser: PropTypes.object,
}), App);
