import { types, flow } from 'mobx-state-tree'

import { WishList } from './WishList'

export const User = types.model({
    id: types.string, 
    name: types.string, 
    // gender: types.union(types.literal('m'), types.literal('f')),
    gender: types.enumeration('gender', ['m', 'f']),
    wishList: types.optional(WishList, {})
})
.actions(self => ({
    getSuggestions: flow(function * (){
        const results = yield window.fetch(`http://localhost:3001/suggestion_${self.gender}`)
        const suggestions = yield results.json()
        self.wishList.items.push(...suggestions)        
    }),
    
    // async getSuggestions(){
    //     const results = await window.fetch(`http://localhost:3001/suggestion_${self.gender}`)
    //     const suggestions = await results.json()
    //     self.addSuggestions(suggestions)            
    // },
    // addSuggestions(suggestions){
    //     self.wishList.items.push(...suggestions)
    // }

    // async getSuggestions(){
    //     window
    //         .fetch(`http://localhost:3001/suggestion_${self.gender}`)
    //         .then(response =>  response.json())
    //         .then(suggestions => {
    //             self.addSuggestions(suggestions)
    //         })
    // },
    // addSuggestions(suggestions){
    //     self.wishList.items.push(...suggestions)
    // }
}))


export const Group = types.model({
    users: types.map(User)
})


    