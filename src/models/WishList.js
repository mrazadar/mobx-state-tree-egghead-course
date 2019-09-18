import { types, getParent, destroy } from "mobx-state-tree"

export const data = {
    "name": "Chronicales of Narnia Box Set - C.S. Lewis",
    "price": 28.73, 
    "image": "https://github.com/mobxjs/mobx-state-tree/blob/master/docs/mobx-state-tree-logo-gradient.png"
}

export const WishListItem = types
    .model ({
        name: types.string,
        price: types.number,
        image: types.optional(types.string, "") //or we can simply assign literal value empty string "", so mobx can figure out type for us. 
    })
    .actions(self => ({
        changeName(name){
            self.name = name
        },
        changePrice(price){
            self.price = price
        },
        changeImage(img){
            self.image = img
        },
        remove(){
            getParent(self, 2).remove(self)
        }
    }));

export const WishList = types
    .model({
        items: types.optional(types.array(WishListItem), [])
    })
    .actions(self => ({
        addItem(item) {
            self.items.push(item)
        },
        remove(item){
            // self.items.splice(self.items.indexOf(item), 1)
            destroy(item)
        }
    }))
    .views(self => ({
        get totalPrice(){
            return self.items.reduce((sum, entry)=> (sum + entry.price), 0)
        }
    }))