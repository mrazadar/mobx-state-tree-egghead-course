//Group.js
import { types, flow, applySnapshot } from 'mobx-state-tree'

import { WishList } from './WishList'

export const User = types.model({
    id: types.identifier, 
    name: types.string, 
    // gender: types.union(types.literal('m'), types.literal('f')),
    gender: types.enumeration('gender', ['m', 'f']),
    wishList: types.optional(WishList, {}),
    //types.maybe recipient is either null or it's a type of user
    //types.late at the time of the execution of this line const User =  / doesn't have assigned anything yet
    //so we need to defer this statement 
    recipient: types.maybe(types.reference(types.late(() => User)))
})
.actions(self => ({    
    getSuggestions: flow(function * (){
        const response = yield window.fetch(`http://localhost:3001/suggestion_${self.gender}`)
        const suggestions = yield response.json()
        self.wishList.items.push(...suggestions)        
    }),
    
}))


export const Group = types.model({
    users: types.map(User)
})
.actions(self => {
    let controller;
    return {
        afterCreate(){
            self.load()
        },
        load: flow(function*(){
            controller = window.AbortController && new window.AbortController()
            try{

                const response = yield window.fetch(`http://localhost:3001/initial_state`, {
                    signal: controller.signal
                })
                const group = yield response.json()        
                applySnapshot(self, group)
                console.log("success")
            } catch( error ){
                console.log('failed: ', error)
            }
        }),
        reload(){
            if(controller) controller.abort()
            self.load()
        },
        beforeDestroy(){
            if(controller) controller.abort()
        },
        drawLots() {
            const allUsers = Array.from(self.users.values())

            // not enough users, bail out
            if (allUsers.length <= 1) return

            // not assigned lots
            let remaining = allUsers.slice()

            allUsers.forEach(user => {
                // edge case: the only person without recipient
                // is the same as the only remaining lot
                // swap lot's with some random other person
                if (remaining.length === 1 && remaining[0] === user) {
                    const swapWith = allUsers[Math.floor(Math.random() * (allUsers.length - 1))]
                    user.recipients = swapWith.recipient
                    swapWith.recipient = self
                } else
                    while (!user.recipient) {
                        // Pick random lot from remaing list
                        let recipientIdx = Math.floor(Math.random() * remaining.length)

                        // If it is not the current user, assign it as recipient
                        // and remove the lot
                        if (remaining[recipientIdx] !== user) {
                            user.recipient = remaining[recipientIdx]
                            remaining.splice(recipientIdx, 1)
                        }
                    }
            })
        }
    }
})