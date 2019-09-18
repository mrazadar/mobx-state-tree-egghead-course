import React from "react"

const WishListItemView = ({ item }) => (
    <div className="item">
        {item.image && <img src={item.image} alt="img"/>}
        <h3>{item.name}</h3>
        <span>{item.price}</span>
    </div>
)


export default WishListItemView