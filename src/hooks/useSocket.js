import { useEffect, useState, useCallback, createContext, useContext } from 'react';
import io from 'socket.io-client';
import { env } from '../utilities/function';
import { useUser, useOrganization } from './Authorize';
import axios from 'axios';

const SocketContext = createContext();
export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState({});
    const [chatList, setChatList] = useState([])
    const [contacts, setContacts] = useState([]);
    const [totalNewCount, setTotalNewCount] = useState(0);
    const [totalNotification, setTotalNotification] = useState([]);
    const [visibleTab, setVisibleTab] = useState('chat');

    const platformUser = useUser();
    const currentOrganization = useOrganization();
    let currentOrg = localStorage.getItem("org");
    if (currentOrg) {
        currentOrg = JSON.parse(currentOrg);
    }

    const fetchContactList = useCallback(async () => {
        // setJobs(null);
        try {
            const response = await axios.get(
                `/hr/message/contact?page=1&limit=200`
            );
            const data = response.data;
            setContacts(data.contact);
        } catch (e) {
            console.warn(e);
        }
    }, []);

    const fetchChatList = useCallback(
        async () => {
            // setJobs(null);
            try {
                const response = await axios.get(
                    `/hr/message?page=1&limit=200`
                );
                const data = response.data;
                if (data.success) {
                    window.chatList = data.messages;
                    setChatList(data.messages)
                }
            } catch (e) {
                console.warn(e);
            }
        },
        []
    );

    const getUnreadNotification = useCallback(async () => {
        try {
            const response = await axios.get(
                `/hr/message/unreadnotification`
            );
            setTotalNotification(response?.data?.totalUnread);

            console.log('response?.data?.totalUnread',response?.data?.totalUnread)
        } catch (e) {
            console.log(e);
        }
    }, [setTotalNotification]);
   

    const getReceiverName = (sender, receiver, message, createdAt, allcontacts, _id = "") => {
        let receiverName = allcontacts.find((contact) => contact._id === receiver._id);
        const tempChatList = window.chatList || chatList;

        // let newChatList = tempChatList.filter(chat => chat?.receiver._id !== sender._id);

       
        const chatNewData = [
            {
                "_id": _id,
                "sender": sender,
                "receiver": (receiver && receiver.firstName) ? receiver : receiverName,
                "content": message,
                "isViewed": false,
                createdAt
            }]
            

        const filteredChatList = tempChatList.filter(
            (chat) =>
                !(
                    (chat.sender._id === chatNewData[0].sender._id &&
                        chat.receiver._id === chatNewData[0].receiver._id) ||
                    (chat.sender._id === chatNewData[0].receiver._id &&
                        chat.receiver._id === chatNewData[0].sender._id)
                )
        );

        // Add the new chat item at the start and append the rest of the filtered chat list
        const updatedChatList = [chatNewData[0], ...filteredChatList];

        // console.log('updatedChatList', updatedChatList);
        // Set the updated chat list
        window.chatList = updatedChatList;
        setChatList(updatedChatList);
    }
    // useEffect(() => {
    //     console.log('platformUser',platformUser);
    // }, [platformUser]);

    useEffect(() => {
        // console.log('currentOrganization 3',Object.keys(currentOrganization).length);
        if (currentOrganization && platformUser && Object.keys(currentOrganization).length > 1) {
            // Initialize the socket connection
            const newSocket = io(env('SERVER')); // Replace with your server URL
            setSocket(newSocket);

            // Register the user once on connection
            if (currentOrg && currentOrg._id) {
                newSocket.emit('registerUser', currentOrg._id);
                getUnreadNotification();
                fetchContactList();
                fetchChatList();
            }

            // Handle incoming messages
            newSocket.on('receiveChat', ({ _id = "", sender, receiver, content }) => {
                let createdAt = new Date()
                setMessages((prevMessages) => {
                    const previousChat = prevMessages[sender] || [];
                    // return { ...prevMessages, [sender]: [...previousChat, { sender, receiver, content  , createdAt : createdAt}] };
                    return [...previousChat, { sender, receiver, content, createdAt }];
                });
                const newNotificationData = 
                    {
                        "_id": _id,
                        "sender": sender._id,
                        "receiver": receiver._id,
                        "content": content,
                        "isViewed": false,
                        createdAt
                    }
                setTotalNotification((prevNotifications) => [newNotificationData, ...prevNotifications]);
                setTotalNewCount(prev => prev + 1);
                getReceiverName(sender, receiver, content, createdAt, contacts, _id)
                // setMessages({...messages ,  [sender]  : [...periouseChat, { sender, receiver, content }]})
                // setMessages((prevMessages) => [...prevMessages, message]);
            });

            // Cleanup on unmount
            return () => {
                newSocket.disconnect();
            };
        }
    }, [platformUser, currentOrganization]);

    // Function to send a private message
    const sendMessage = useCallback((receiver, content) => {
        if (socket) {
            socket.emit('sendChat', {
                sender: currentOrg._id,
                receiver,
                adminId: currentOrg._id,
                content: content,
            });
            let createdAt = new Date()

            // let periouseChat  = messages[receiver] || []
            // setMessages({...messages , [receiver] : [...periouseChat, { sender : currentOrg._id, receiver, content }]})
            setMessages((prevMessages) => {
                const previousChat = prevMessages[receiver] || [];
                return { ...prevMessages, [receiver]: [...previousChat, { sender: currentOrg._id, receiver, content, createdAt }] };
            });
            // getReceiverName(receiver ,content ,createdAt )
            getReceiverName(currentOrg, { _id: receiver }, content, createdAt, contacts)

        }
    }, [socket, contacts]);

    const setMessage = useCallback((oldMessage, receiverId) => {
        setMessages({ ...messages, receiverId: [...oldMessage, ...messages[receiverId]] })
    }, [socket]);
    //return { messages, sendMessage,  setMessage,  contacts, chatList, totalNewCount, fetchChatList,setMessages };
    return (
        <SocketContext.Provider
            value={{
                messages,
                sendMessage,
                setMessages,
                contacts,
                chatList,
                totalNewCount,
                setTotalNewCount,
                setMessage,
                fetchChatList,
                totalNotification,
                setTotalNotification,
                getUnreadNotification,
                visibleTab, setVisibleTab
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    return useContext(SocketContext);
};
// export useSocket;