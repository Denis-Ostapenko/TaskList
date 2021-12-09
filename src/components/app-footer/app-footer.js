import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './app-footer.css';

export default class AppFooter extends Component {
  state = {
    all: 'true',
    active: 'false',
    completed: 'false',
  };

  onClickAll = () => {
    const { onClickAll } = this.props;
    this.setState({
      all: 'true',
      active: 'false',
      completed: 'false',
    });
    onClickAll();
  };

  onClickActive = () => {
    const { onClickActive } = this.props;
    this.setState({
      all: 'false',
      active: 'true',
      completed: 'false',
    });
    onClickActive();
  };

  onClickCompleted = () => {
    const { onClickCompleted } = this.props;
    this.setState({
      all: 'false',
      active: 'false',
      completed: 'true',
    });
    onClickCompleted();
  };

  render() {
    const { onClickClear, doneCount } = this.props;

    const { all, active, completed } = this.state;

    return (
      <div className="footer">
        <span className="todo-count">{doneCount} items left</span>
        <div className="filters">
          <button type="button" className="btn" active={all} onClick={this.onClickAll}>
            All
          </button>
          <button type="button" className="btn" active={active} onClick={this.onClickActive}>
            Active
          </button>
          <button type="button" className="btn" active={completed} onClick={this.onClickCompleted}>
            Completed
          </button>
        </div>
        <button type="button" className="clear-completed" onClick={onClickClear}>
          Clear completed
        </button>
      </div>
    );
  }
}

AppFooter.defaultProps = {
  onClickAll: () => {},
  onClickActive: () => {},
  onClickCompleted: () => {},
  onClickClear: () => {},
  doneCount: 1,
};

AppFooter.propTypes = {
  onClickAll: PropTypes.func,
  onClickActive: PropTypes.func,
  doneCount: PropTypes.number,
  onClickCompleted: PropTypes.func,
  onClickClear: PropTypes.func,
};
