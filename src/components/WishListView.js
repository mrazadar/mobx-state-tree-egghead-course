import React, { Fragment } from "react"
import { observer } from 'mobx-react';

import WishListItemView from './WishListItemView'
import WishListItemEntry from './WishListItemEntry'

const WishListView = ({ wishList }) => (
    <div className="list">
        <Fragment>{wishList.items.map((item, idx)=> <WishListItemView key={idx} item={item}/>)}</Fragment>
        Total: {wishList.totalPrice}
        <WishListItemEntry wishList={wishList} />
    </div>
)


export default observer(WishListView)
