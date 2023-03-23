import { useState } from "react"
import axiosClient from "../axios"
import { useNavigate } from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider"
import toast from "react-hot-toast"

export default function useFriends()
{
    const navigate = useNavigate()
    const { currentUser } = useStateContext()

    const [friends, setFriends] = useState([])
    const [friendsRequest, setFriendsRequest] = useState([])
    const [friendsBlocked, setFriendsBlocked] = useState([])
    const [loading, setLoading] = useState(true)

    const getFriendsRequest = async () => {
        await axiosClient.get(`/friendship/pending/${currentUser.id}`)
            .then(({data}) => {
                setFriendsRequest(data.data)
                setLoading(false)
            })
            .catch((err) => console.log(err))
    }

    const acceptFriendRequest = async (sender) => {
        await axiosClient.post(`/friendship/accept`,
        {
            recipient : currentUser.id,
            sender
        })
        .then(({data}) => {
            setFriends(data.friends.data)
            setFriendsRequest(data.pending_requests.data)
        }).catch((err) => console.log(err))
    }

    const denyFriendRequest = async (id) => {
        await axiosClient.post(`/friendship/deny`,
        {
            recipient: currentUser.id,
            sender: id,
        })
        .then(({data}) => {
            setFriends(data.friends)
            setFriendsRequest(data.pending_requests)
        }).catch((err) => console.log(err))
    }

    const unfriend = async (id) => {
        await axiosClient.post(`/friendship/remove`,
        {
            sender: currentUser.id,
            recipient: id
        })
        .then(({data}) => {
            setFriends(data.data)
            toast.success('Vous avez supprimé cet ami.')
        })
        .catch(err => console.log(err))

    }

    const blockfriend = async (id) => {
        await axiosClient.post(`/friendship/block`,
        {
            sender: currentUser.id,
            recipient: id
        })
        .then(({data}) => {
            console.log(data)
            setFriends(data.friends.data)
            setFriendsBlocked(data.blocked_requests.data)
            toast.success('Vous avez bloqué cet ami.')
        })
        .catch(err => console.log(err))
    }

    const unblockfriend = async (id) => {
        await axiosClient.post(`/friendship/unblock`,
        {
            sender: currentUser.id,
            recipient: id
        })
        .then(({data}) => {
            setFriendsBlocked(data.blocked_requests.data)
            toast.success('Vous avez débloqué cet ami.')
        })
        .catch(err => console.log(err))
    }

    const addFriend = async (id) => {
        await axiosClient.post(`/friendship/send`, {
            sender: currentUser.id,
            recipient: id
        })
        .then(() => {
            toast.success('Demande envoyée.')
            setLoading(false)
        })
        .catch(err => console.log(err))
    }

    const getFriends = async (id = currentUser.id) => {
        await axiosClient.get(`/friendship/mine/${id}`)
            .then(({data}) => {
                setFriends(data.data)
                setLoading(false)
            })
            .catch(err => console.log(err));
    }

    const getFriendsBlocked = async () => {
        await axiosClient.get(`/friendship/blocked/${currentUser.id}`)
        .then(({data}) => {
            setFriendsBlocked(data.data)
            setLoading(false)
        })
        .catch(err => console.log(err));
    }

    return {
        friends, getFriends,
        friendsRequest, getFriendsRequest,
        friendsBlocked, getFriendsBlocked,
        acceptFriendRequest, denyFriendRequest,
        addFriend, unfriend, blockfriend, unblockfriend,
        loading, setLoading
    }
}
