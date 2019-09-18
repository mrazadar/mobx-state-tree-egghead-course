import React, { Component } from "react"
import { observer } from 'mobx-react'
import { clone, getSnapshot, applySnapshot } from 'mobx-state-tree'
import WishListItemEdit from './WishListItemEdit'


class WishListItemView extends Component {
    constructor(){
        super()
        this.state = { isEditing : false }
    }
    render(){
        const { item } = this.props;
        return this.state.isEditing ? (
            this.renderEditable()
        ) : (
            <div className="item">
                {item.image && <img src={item.image} alt="img"/>}
                <h3>{item.name}</h3>
                <span>{item.price}</span>
                <span>
                    <button onClick={this.toggleEdit}>Edit</button>
                    <button onClick={item.remove}>Delete</button>
                </span>
            </div>
        )
    }
    renderEditable(){
        return (
            <div className="item">
                <WishListItemEdit item ={this.state.clone} />
                <span>
                    <button onClick={this.onSave}>Save</button>
                    <button onClick={this.onCancelEditing}>Cancel</button>
                </span>
            </div>
        )
    }
    toggleEdit = () => {
        this.setState({
            isEditing : true,
            clone: clone(this.props.item)
        })
    }
    onCancelEditing = () => {
        this.setState({
            isEditing : false
        })
    }
    onSave = () => {
        applySnapshot(this.props.item, getSnapshot(this.state.clone))
        this.setState({
            isEditing: false,
            clone: null
        })
    }
}

export default observer(WishListItemView)