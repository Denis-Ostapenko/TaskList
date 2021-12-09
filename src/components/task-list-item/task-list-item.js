import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import './task-list-item.css';

export default class TaskListItem extends Component {
  handleChange = (event) => {
    event.target.parentNode.querySelector('label').setAttribute('active', 'false');
    event.target.parentNode.querySelector('.edit').setAttribute('active', 'true');
  };

  onSubmit = (event) => {
    const { id, addItem } = this.props;
    if (event.keyCode === 13) {
      const label = event.target.value;
      addItem(label, id);
      event.target.parentNode.querySelector('label').setAttribute('active', 'true');
      event.target.parentNode.querySelector('.edit').setAttribute('active', 'false');
    }
  };

  render() {
    const { label, сompleted, data, itemDelete, itemCompleted } = this.props;

    const dateObj = new Date(data);

    const wasCreated = formatDistanceToNow(dateObj, { includeSeconds: true }, { addSuffix: true });

    let classNames = 'task-list-item';
    if (сompleted) {
      classNames += ' completed';
    }

    return (
      <div className="view">
        <input type="checkbox" className="toggle" onClick={itemCompleted} />
        <label>
          <span className={classNames}>{label}</span>
          <span className="created">created {wasCreated}</span>
        </label>

        <button type="button" className="icon icon-edit" aria-label="Icon input edit" onClick={this.handleChange} />

        <button type="button" className="icon icon-destroy" aria-label="Icon input deleted" onClick={itemDelete} />

        <input type="text" className="edit" defaultValue={label} active="false" onKeyDown={this.onSubmit} />
      </div>
    );
  }
}

TaskListItem.defaultProps = {
  label: 'text',
  сompleted: false,
  data: new Date(),
  itemDelete: () => {},
  itemCompleted: () => {},
  id: 10,
  addItem: () => {},
};

TaskListItem.propTypes = {
  label: PropTypes.string,
  сompleted: PropTypes.bool,
  data: PropTypes.objectOf(PropTypes.number),
  itemDelete: PropTypes.func,
  itemCompleted: PropTypes.func,
  id: PropTypes.number,
  addItem: PropTypes.func,
};
