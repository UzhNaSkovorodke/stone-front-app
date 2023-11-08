import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

const connection: Echo = new Echo({
  broadcaster: 'pusher',
  key: 'sp-app-key',
  wsHost: 'socket.stone-portal.test',
  wsPort: 80,
  wssPort: 443,
  forceTLS: false,
  enabledTransports: ['ws', 'wss'],
  cluster: '',
  authEndpoint: '/api/broadcasting/auth',
  auth: {
    headers: {
      Authorization: 'Bearer 1|QWwIb22gfpl1NlEOV5PJfRU0qP5WWPHQn4XQL1Ac',
    },
  },
  Pusher: Pusher,
} as any)

export const onMessageListener = () =>
  new Promise((resolve) => {
    connection.private('App.Models.User.1').listen('Greetings', (message: any) => {
      resolve(message)
    })
  })
