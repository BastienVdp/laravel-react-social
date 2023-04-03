import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'


import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
 
window.Pusher = Pusher;
 
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '410ba8a0a3914ffb0cdf',
    cluster: 'eu',
    forceTLS: true
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)
