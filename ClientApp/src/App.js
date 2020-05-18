import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { FileUpload } from './components/FileUpload';
import { Placeholder } from './components/Placeholder';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={FileUpload} />
        <Route path='/placeholder' component={Placeholder} />
      </Layout>
    );
  }
}
