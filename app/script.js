// app/script.js
import '@babel/polyfill'
import Aragon from '@aragon/api'

const app = new Aragon()

const initialState = {
    count: 0,
}
app.store(async (state, event) => {
    if (state === null) state = initialState

    switch (event.event) {
        case 'Increment':
            return { count: await getValue() }
        case 'Decrement':
            return { count: await getValue() }
        default:
            return state
    }
})

async function getValue() {
    // Get current value from the contract by calling the public getter
    // app.call() returns a single-emission observable that we can immediately turn into a promise
    const value = await app.call('value').toPromise()
    return parseInt(value, 10)
}