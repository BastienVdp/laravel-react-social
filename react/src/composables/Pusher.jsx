import { useEffect, useState } from "react"
import Pusher from 'pusher-js'
import { useStateContext } from "../contexts/ContextProvider";

export default function usePusher()
{
    const { currentUser, userToken } = useStateContext()
    const [newMessages, setNewMessages] = useState({})
    const [convLists, setConvLists] = useState([])
    const [fetching, setFetching] = useState(false);
    const [conversationId, setConversationId] = useState(null)

    useEffect(() => {
        const pusher = new Pusher('410ba8a0a3914ffb0cdf', {
            authEndpoint: 'http://laravel-react-social.test/api/broadcasting/auth',
            cluster: 'eu',
            auth: {
                headers: {
                    Authorization: 'Bearer ' + userToken
                }
            }
        });

        
        if(conversationId) {
            const channelConversation = pusher.subscribe('private-channel.conv-'+conversationId);
            channelConversation.bind('MessageSent', (res) => {
                setNewMessages(res.message)
                console.log('response from conv channel')
            })
        } else {
            const channelUser = pusher.subscribe('private-channel.user-'+currentUser.id);
            channelUser.bind('MessageSent', (res) => {
                // setConvLists(res.conversations)

                console.log(res, 'response from user channel')
            })
        }

        return () => {
            
            if(conversationId) {
                pusher.unsubscribe('private-channel.conv-'+conversationId)
            } else {
                pusher.unsubscribe('private-channel.user-'+currentUser)
            }
        }

    }, [conversationId])

    return {
        newMessages,
        fetching,
        setConversationId
    }
}
