import React, { Component } from 'react';
import { Transition, animated } from 'react-spring';
import logo from './logo.svg';
import './App.css';

class Panel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.data
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    this.props.onDataChange('bar');
  }

  render() {
    console.log('render');

    return (
      <animated.div style={this.props.style} className="panel">
        <input type="text" value={this.state.value} onChange={this.handleChange} />
      </animated.div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPanel: false,
      data: 'foo'
    };

    this.togglePanel = this.togglePanel.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
  }

  togglePanel() {
    this.setState(prevState => {
      return {
        showPanel: !prevState.showPanel
      };
    });
  }

  handleDataChange(data) {
    this.setState({
      data
    });
  }

  renderPanel() {
    let panel = [];
    let keys = [];

    if (this.state.showPanel) {
      panel.push(({ x }) => (
        <Panel
          key="the-best-panel"
          style={{ transform: x.interpolate(x => `translate3d(${x},0,0)`) }}
          data={this.state.data}
          onDataChange={this.handleDataChange}
        />
      ));
      keys.push('the-best-panel');
    }

    return (
      <Transition native keys={keys} from={{ x: '-100%' }} enter={{ x: '0%' }} leave={{ x: '-100%' }}>
        {panel}
      </Transition>
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <button onClick={this.togglePanel}>Toggle Panel</button>
        </p>
        {this.renderPanel()}
      </div>
    );
  }
}

export default App;
