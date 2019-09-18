import React from "react"
import { observer } from 'mobx-react';

import WishListItemView from './WishListItemView'
import WishListItemEntry from './WishListItemEntry'

const WishListView = ({ wishList }) => (
    <div className="list">
        <div>{wishList.items.map((item, idx)=> <WishListItemView key={idx} item={item}/>)}</div>
        Total: {wishList.totalPrice}
        <WishListItemEntry wishList={wishList} />
    </div>
)


export default observer(WishListView)
