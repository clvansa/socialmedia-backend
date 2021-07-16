import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { AuthContext } from './AuthContext'
import { io } from 'socket.io-client';
import Peer from 'simple-peer'

const SocketContext = createContext();
const socket = io("ws://localhost:5100");

const SocketContextProvider = ({ children }) => {
    const [stream, setStream] = useState();
    const [me, setMe] = useState('');
    const [call, setCall] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState('');
    const [videoUsersId, setVideoUsersId] = useState([]);
    const [startCall, setStartCall] = useState(false);

    const [onlineUsers, setOnlineUsers] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [tempMessages, setTempMessages] = useState([]);
    const [arrivalNotification, setArrivalNotification] = useState(null);
    const [conversationId, setConversationId] = useState('');





    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();


    const randomId = () => Math.floor(Math.random() * 999999999999999);


    //Get Messages from Socket
    useEffect(() => {
        socket.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
                isRead: false,
                _id: randomId(),
            });
            console.log(data, "ArrivalMessage");
        });

        //Send req to socket that msg is readed
        socket.on("sendSeenMsg", (data) => {
            setTempMessages({
                userId: data.userId,
                receiverId: data.receiverId,
                messages: data.messages,
            });
            console.log(data.conversationId)
            setConversationId(data.conversationId)
        });


        // Get Notification from socket to user 
        socket.on("getNotification", (data) => {
            setArrivalNotification({
                notifyType: data.notifyType,
                postId: data.postId,
                sender: data.sender,
                recipient: data.receiverId,
                isRead: false,
                createdAt: data.createdAt,
                _id: Date.now(),
            });
        })
    }, []);



    useEffect(() => {
        socket.on('me', id => setMe(id));

        socket.on('callUser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal })
        });

    }, []);


    // useEffect(() => {
    //         navigator.mediaDevices.getUserMedia({ video: false, audio: true })
    //             .then((currentStream) => {
    //                 setStream(currentStream);
    //                 if (myVideo) {
    //                     myVideo.current.srcObject = currentStream;
    //                 }
    //             })
    //     console.log(callAccepted, "callAccepted")
    // }, [callAccepted])


    const sendMessageToSocket = (data) => {
        socket.emit("sendMessage", data);
    }

    const seenMsg = (data) => {
        socket.emit("seenMsg", data);
    }

    const sendNotificationToSocket = (data) => {
        socket.emit("sendNotifiction", data);

    }

    const answerCall = () => {
        setCallAccepted(true);
        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: call.from })
        })

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
            console.log(currentStream, "CurrentStream answer")

        })

        peer.signal(call.signal)

        connectionRef.current = peer
    };

    const callUser = (id) => {
        setStartCall(true)
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('callUser', { userToCall: id, signalData: data, from: me, name })
        })

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        })

        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);
            console.log(signal, "accept")

            peer.signal(signal)
        })



        connectionRef.current = peer
    };

    const leaveCall = () => {
        setCallEnded(true);
        stream.getTracks().forEach(function (track) {
            track.stop();
        });
        console.log(stream)
        setStream(null)
        // connectionRef.current.destroy();

        // window.location.reload()

    };



    return (
        <SocketContext.Provider value={{
            call,
            callAccepted,
            myVideo,
            userVideo,
            stream,
            name,
            setName,
            callEnded,
            me,
            callUser,
            leaveCall,
            answerCall,
            setVideoUsersId,
            videoUsersId,
            onlineUsers,
            setOnlineUsers,
            conversations,
            setConversations,
            arrivalMessage,
            setArrivalMessage,
            tempMessages,
            setTempMessages,
            arrivalNotification,
            setArrivalNotification,
            sendMessageToSocket,
            seenMsg,
            sendNotificationToSocket,
            conversationId

        }}>
            {children}
        </SocketContext.Provider>
    )
}

export { SocketContextProvider, SocketContext }
