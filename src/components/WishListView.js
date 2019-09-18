import React from "react"
import WishListItemView from './WishListItemView'

import { observer } from 'mobx-react';

const WishListView = ({ wishList }) => (
    <div className="list">
        <div>{wishList.items.map((item, idx)=> <WishListItemView key={idx} item={item}/>)}</div>
        Total: {wishList.totalPrice}
    </div>
)


export default observer(WishListView)
