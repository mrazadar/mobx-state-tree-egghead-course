//index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import { getSnapshot, addMiddleware } from 'mobx-state-tree';

import { Group } from "./models/Group";

import logo from './assets/logo.svg'

let initialState = {
    users: {
        "1": {
            "id": "1",
            "name": "Gulu Butt", 
            "gender": 'm'
        }, 
        "2": {
            "id": "2",
            "name": "Shakira Niki", 
            "gender": 'f'
        }
    }
}


if(localStorage.getItem("wishListApp")){
    const json = JSON.parse(localStorage.getItem("wishListApp"))
    //check if the shape of data still valid for localStorage data
    if(Group.is(json)) initialState = json
}

let state = Group.create(initialState)

addMiddleware(state, (call, next) => {
    console.log(`[${call.type}] ${call.name}`)
    return next(call)
})

function renderApp (){
    ReactDOM.render(<App group={state}/>, document.getElementById('root'));
}

renderApp()

if (module.hot){
    module.hot.accept(["./components/App"], () => {
        //new component
        renderApp()
    })

    module.hot.accept(["./models/WishList"], () => {
        //new model definition
        const snapshot = getSnapshot(state)
        state = Group.create(snapshot)
        renderApp()
    })
    module.hot.accept(["./models/Group"], () => {
        //new model definition
        const snapshot = getSnapshot(state)
        state = Group.create(snapshot)
        renderApp()
    })
}
    

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
