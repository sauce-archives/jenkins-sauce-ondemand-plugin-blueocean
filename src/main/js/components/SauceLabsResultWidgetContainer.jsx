import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { reducer } from '../actions';
import thunk from 'redux-thunk';

import SauceLabsResultWidget from './SauceLabsResultWidget';

const store = createStore(reducer, applyMiddleware(thunk));

export default class SauceLabsResultWidgetContainer extends Component {
    render() {
        return (
            <Provider store={store}><SauceLabsResultWidget {...this.props} /></Provider>
        );
    }
}
