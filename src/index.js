import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import { onSnapshot } from 'mobx-state-tree';

import { WishList } from "./models/WishList";

let initialState = {
    items: [
        {
            "name": "Chronicales of Narnia Box Set - C.S. Lewis",
            "price": 28.73, 
            "image": "https://github.com/mobxjs/mobx-state-tree/blob/master/docs/mobx-state-tree-logo-gradient.png"
        }, 
        {
            "name": "LEGO Mindstorms EV3",
            "price": 349.95, 
            "image": "https://github.com/mobxjs/mobx-state-tree/blob/master/docs/mobx-state-tree-logo-gradient.png"
        }
    ]
}


if(localStorage.getItem("wishListApp")){
    const json = JSON.parse(localStorage.getItem("wishListApp"))
    //check if the shape of data still valid for localStorage data
    if(WishList.is(json)) initialState = json
}

const wishList = WishList.create(initialState)

onSnapshot(wishList, snapshot => {
    localStorage.setItem("wishListApp", JSON.stringify(snapshot)) 
})

ReactDOM.render(<App wishList={wishList}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
