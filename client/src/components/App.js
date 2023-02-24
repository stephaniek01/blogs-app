import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import * as actions from '../redux/actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import BlogNew from './blogs/BlogNew';
import BlogShow from './blogs/BlogShow';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <ChakraProvider>
        <Router>
          <Header />
          <div className='container'>
            <Routes>
              <Route path='/blogs/new' element={<BlogNew />} />
              <Route exact path='/blogs/:_id' element={<BlogShow />} />
              <Route path='/blogs' element={<Dashboard />} />
              <Route path='/' element={<Landing />} />
            </Routes>
          </div>
        </Router>
      </ChakraProvider>
    );
  }
}

export default connect(null, actions)(App);
