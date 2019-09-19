//index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import { getSnapshot } from 'mobx-state-tree';

import { WishList } from "./models/WishList";

import logo from './assets/logo.svg'

let initialState = {
    items: [
        {
            "name": "Chronicales of Narnia Box Set - C.S. Lewis",
            "price": 28.73, 
            "image": logo
        }, 
        {
            "name": "LEGO Mindstorms EV3",
            "price": 349.95, 
            "image": logo
        }
    ]
}


if(localStorage.getItem("wishListApp")){
    const json = JSON.parse(localStorage.getItem("wishListApp"))
    //check if the shape of data still valid for localStorage data
    if(WishList.is(json)) initialState = json
}

let wishList = WishList.create(initialState)


function renderApp (){
    ReactDOM.render(<App wishList={wishList}/>, document.getElementById('root'));
}

renderApp()

if (module.hot){
    module.hot.accept(["./components/App"], () => {
        //new component
        renderApp()
    })

    module.hot.accept(["./models/WishList"], () => {
        //new model definition
        const snapshot = getSnapshot(wishList)
        wishList = WishList.create(snapshot)
        renderApp()
    })
}
    

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
