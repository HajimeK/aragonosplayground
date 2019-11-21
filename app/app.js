// app/app.js
import Aragon, { providers } from '@aragon/api'

const initializeApp = () => {
    const app = new Aragon(new providers.WindowMessage(window.parent))

    const view = document.getElementById('view')
    const increment = document.getElementById('increment')
    const decrement = document.getElementById('decrement')

    increment.onclick = () => {
        app.increment()
    }
    decrement.onclick = () => {
        app.decrement()
    }

    app.state().subscribe(
        state => {
            // the state is null in the beginning, when there are no event emitted from the contract
            view.innerHTML = `The counter is ${state ? state.count : 0}`
        },
        err => {
            view.innerHTML = 'An error occured, check the console'
            console.log(err)
        }
    )
}

const sendMessageToWrapper = (name, value) => {
    window.parent.postMessage({ from: 'app', name, value }, '*')
}

// handshake between Aragon Core and the iframe,
// since iframes can lose messages that were sent before they were ready
window.addEventListener('message', ({ data }) => {
    if (data.from !== 'wrapper') {
        return
    }
    if (data.name === 'ready') {
        sendMessageToWrapper('ready', true)
        initializeApp()
    }
})