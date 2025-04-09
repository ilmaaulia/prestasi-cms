import store from './store'

let currentAuth

const listener = () => {
  const previousAuth = currentAuth
  currentAuth = store.getState().auth

  if (currentAuth !== previousAuth) {
    localStorage.setItem('auth', JSON.stringify(currentAuth))
  }
}

const listen = () => {
  store.subscribe(listener)
}

export { listen }
