import React from 'react';
import PropTypes from 'prop-types';

import TaskListItem from '../task-list-item/task-list-item';

import './task-list.css';

const TaskList = (task) => {
  const { todos, itemDelete, itemCompleted, addItem } = task;
  const elements = todos.map((item) => {
    const { id, display, ...itemProps } = item;
    let classNames = '';
    if (!display) {
      classNames = 'display-none';
    }
    return (
      <li key={id} className={classNames}>
        <TaskListItem
          {...itemProps}
          id={id}
          itemDelete={() => itemDelete(id)}
          itemCompleted={() => itemCompleted(id)}
          addItem={addItem}
        />
      </li>
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

TaskList.defaultProps = {
  todos: [],
  itemDelete: () => {},
  itemCompleted: () => {},
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  itemDelete: PropTypes.func,
  itemCompleted: PropTypes.func,
};

export default TaskList;
