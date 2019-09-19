import { types } from 'mobx-state-tree'

import { WishList } from './WishList'

export const User = types.model({
    id: types.string, 
    name: types.string, 
    // gender: types.union(types.literal('m'), types.literal('f')),
    gender: types.enumeration('gender', ['m', 'f']),
    wishList: types.optional(WishList, {})
})


export const Group = types.model({
    users: types.map(User)
})


    