import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

export default class NewTaskForm extends Component {
  state = {
    label: '',
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { addItem } = this.props;
    const { label } = this.state;
    addItem(label);
    this.setState({ label: '' });
  };

  onLabelChenge = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  render() {
    const { label } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onLabelChenge}
          value={label}
        />
      </form>
    );
  }
}

NewTaskForm.defaultProps = {
  addItem: () => {},
};

NewTaskForm.propTypes = {
  addItem: PropTypes.func,
};
