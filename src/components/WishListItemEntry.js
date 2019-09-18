import React, { Component } from 'react'
import { observer } from 'mobx-react'

import WishListItemEdit from './WishListItemEdit'
import { WishListItem } from '../models/WishList'

class WishListItemEntry extends Component{
    constructor(){
        super()
        this.state = {
            entry: WishListItem.create({
                name: '', 
                price: 0,
                image: ''
            })
        }
    }
    render(){
        return(
            <div>
                <WishListItemEdit item={this.state.entry} />
                <button onClick={this.onAdd}>Add New</button>
            </div>
        )
    }

    onAdd = event => {
        this.props.wishList.addItem(this.state.entry)
        this.setState({
            entry: WishListItem.create({
                name: '', 
                price: 0,
                image: ''
            })
        })
    }
}

export default observer(WishListItemEntry)