import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './Components/MainComponent';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
            <Main/>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
