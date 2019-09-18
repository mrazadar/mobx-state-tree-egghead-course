import { getSnapshot, onSnapshot, onPatch } from 'mobx-state-tree';
import { data, WishList, WishListItem } from './WishList';

import { reaction } from 'mobx';
import { list } from 'postcss';

it(`can create an instance of a WishListItem model.`, () => {
    const item = WishListItem.create(data);

    expect (item.price).toBe(28.73);
    item.changePrice(33)
    expect (item.price).toBe(33)
})


it(`can create an instance of a WishList model.`, () => {
    const wishList = WishList.create({
        items: [data]
    });

    expect (wishList.items.length).toBe(1);
    expect (wishList.items[0].price).toBe(28.73);
})



it(`can also add item in the WishList`, ()=> {
    
    const wishList = WishList.create();
    const states = [];
    const patches = [];

    onSnapshot(wishList, snapshot => {
        states.push(snapshot);
    });
    onPatch(wishList, patch => {
        patches.push(patch);
    });

    wishList.addItem(data);
    expect (wishList.items.length).toBe(1);

    wishList.addItem({
        name: 'Monogram', 
        price: 23,
    })
    expect (wishList.items.length).toBe(2);
    expect (wishList.items[1].price).toBe(23);
    wishList.items[1].changePrice(72.15);
    expect (wishList.items[1].price).toBe(72.15);

    expect (getSnapshot(wishList)).toEqual({
        items: [
            data, 
            {
                name: 'Monogram', 
                price: 72.15,
                image: ""
            }
        ]
    })
    expect (getSnapshot(wishList)).toMatchSnapshot()

    expect (states).toMatchSnapshot()

    expect (patches).toMatchSnapshot()
})


it(`can also add item in the WishList - patches`, ()=> {
    
    const wishList = WishList.create();
    const patches = [];

    onPatch(wishList, patch => {
        patches.push(patch);
    });

    wishList.addItem(data);
    expect (wishList.items.length).toBe(1);

    wishList.addItem({
        name: 'Monogram', 
        price: 23,
    })
    wishList.items[1].changePrice(72.15);    
    expect (patches).toMatchSnapshot()
})

it(`can also test views with computed properties`, ()=> {
    const wishList = WishList.create({
        items: [
            data,
            {
                name: 'Monogram', 
                price: 72.15,
                image: ""
            }
        ]
    });
    expect(wishList.totalPrice).toBe((72.15+data.price))
    let changed = 0;
    reaction(() => wishList.totalPrice, () =>  changed++)
    expect(changed).toBe(0)
    wishList.items[0].changeName("Test");
    expect(changed).toBe(0)
    wishList.items[0].changePrice(3)
    expect(changed).toBe(1)
})