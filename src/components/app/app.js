import React, { Component } from 'react';

import AppHeader from '../app-header/app-header';
import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import AppFooter from '../app-footer/app-footer';

import './app.css';

export default class App extends Component {

  state = {
    taskData: JSON.parse(localStorage.getItem('taskData')) || [],
  };

  itemDelete = (id) => {
    this.setState(({ taskData }) => {
      const i = taskData.findIndex((el) => el.id === id);
      const newArr = [...taskData.slice(0, i), ...taskData.slice(i + 1)];
      return {
        taskData: newArr,
      };
    });
  };

  addItem = (text, id = 0) => {
    if (id !== 0) {
      this.setState(({ taskData }) => {
        const i = taskData.findIndex((el) => el.id === id);
        const oldItem = taskData[i];
        const newItem = { ...oldItem };
        newItem.label = text;
        const newArr = [...taskData.slice(0, i), newItem, ...taskData.slice(i + 1)];
        return {
          taskData: newArr,
        };
      });
    } else {
      const newItem = this.createTaskItem(text);
      this.setState(({ taskData }) => {
        const newArray = [...taskData, newItem];
        return {
          taskData: newArray,
        };
      });
    }
  };

  itemCompleted = (id) => {
    this.setState(({ taskData }) => {
      const i = taskData.findIndex((el) => el.id === id);
      const oldItem = taskData[i];
      const newItem = { ...oldItem, сompleted: !oldItem.сompleted };
      return {
        taskData: [...taskData.slice(0, i), newItem, ...taskData.slice(i + 1)],
      };
    });
  };

  onClickAll = () => {
    this.setState(({ taskData }) => {
      const newArr = taskData.map((element) => ({ ...element, display: true }));
      return {
        taskData: newArr,
      };
    });
  };

  onClickActive = () => {
    this.setState(({ taskData }) => {
      const newArr = taskData.map((element) => {
        if (element['сompleted']) {
          return { ...element, display: false };
        }
        return { ...element, display: true };
      });
      return {
        taskData: newArr,
      };
    });
  };

  onClickCompleted = () => {
    this.setState(({ taskData }) => {
      const newArr = taskData.map((element) => {
        if (element['сompleted']) {
          return { ...element, display: true };
        }
        return { ...element, display: false };
      });
      return {
        taskData: newArr,
      };
    });
  };

  onClickClear = () => {
    this.setState(() => ({
      taskData: [],
    }));
  };

  createTaskItem(label) {
    const { taskData } = this.state;
    let id = 1;
    if ([...taskData][taskData.length - 1]){
      id = [...taskData][taskData.length - 1].id + 1;
    }
    return {
      label,
      сompleted: false,
      display: true,
      data: new Date(),
      id,
    };
  }

  render() {
    const { taskData } = this.state;
    const doneCount = taskData.filter((el) => !el.сompleted).length;
    localStorage.setItem('taskData', JSON.stringify(taskData));
    return (
      <section className="todoapp">
        <header className="header">
          <AppHeader />
          <NewTaskForm addItem={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            todos={taskData}
            itemDelete={this.itemDelete}
            itemCompleted={this.itemCompleted}
            addItem={this.addItem}
          />
          <AppFooter
            onClickAll={this.onClickAll}
            onClickActive={this.onClickActive}
            onClickCompleted={this.onClickCompleted}
            onClickClear={this.onClickClear}
            doneCount={doneCount}
          />
        </section>
      </section>
    );
  }
}
