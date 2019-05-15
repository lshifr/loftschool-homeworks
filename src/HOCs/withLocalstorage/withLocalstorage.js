import React, { Component } from 'react';
import { load, save } from '../../localstorage';

const withLocalstorage = (key, initialData) => BaseComponent =>
  class extends Component {
    componentWillMount() {
      if (!this.getData()) {
        this.saveData(initialData);
      }
    }

    getData = () => load(key);
    saveData = data => {
      save(key, data);
      this.forceUpdate();
    };

    render() {
      return (
        <BaseComponent
          {...this.props}
          savedData={this.getData()}
          saveData={this.saveData}
        />
      );
    }
  };

export default withLocalstorage;
