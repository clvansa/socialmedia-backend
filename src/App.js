import './App.css';
import { useContext, useEffect, useState } from 'react';
import Home from './pages/Home';
// import Profile from './pages/Profile';
import Profile from './pages/ProfileCopy';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './util/PrivateRoute';
import Loading from './components/Loading';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { SocketContext } from './context/SocketContext'
import { GetUser, GetOwnUser } from './context/AuthActions';
import { io } from "socket.io-client";
import PostPage from './pages/PostPage';
import Chat from './pages/Chat';
import Video from './pages/Video';
import Bookmark from './pages/BookMark';
import VideoNotifications from './components/Chat/VideoNotifications';
import Covid from './pages/Covid';
import Setting from './pages/Setting';

const socket = io("http://localhost:5100")



const App = () => {
  const { user, dispatch, isFetching, } = useContext(AuthContext)
  const { me, setVideoUsersId, setOnlineUsers } = useContext(SocketContext)
  const [token, setToken] = useState(null);



  useEffect(() => {
    const getToken = localStorage.getItem('token');
    setToken(getToken)
  }, [])


  useEffect(() => {
    const getUser = async () => {
      if (!isFetching && token) {
        await GetOwnUser(dispatch)
      } else {
        console.log(token)

      }

    }
    getUser()
  }, [token])





  useEffect(() => {

    socket.emit("addUser", user?._id);
    socket.emit("getUsersSocket", { userId: user?._id, socketId: me })
    socket.on('onlineUsers', (data) => {
      setVideoUsersId(data)
    })
    socket.on("getUsers", (users) => {
      setOnlineUsers(
        user &&
        user?.followings?.filter((follow) =>
          users.some((user) => user.userId === follow)
        )
      );
    });
  }, [user, me]);


  // if (isFetching && token) return <Loading />
  // return (
  //   <div className="App">
  //     <Router>
  //       <VideoNotifications />
  //       <Switch>
  //         <Route exact path="/" component={Home} >
  //           {user && !isFetching ? <Home /> ? !user && <Login /> : <Loading /> : <Login />}
  //         </Route>
  //         <Route path="/login" >
  //           {user && !isFetching ? <Redirect to="/" /> : <Login />}
  //         </Route>
  //         <Route path="/profile/:username" >
  //           {user && !isFetching ? <Profile /> : <Login />}
  //         </Route>

  //         <Route path="/register"  >
  //           {user ? <Redirect to="/" /> : <Register />}
  //         </Route>
  //         <Route path="/post/:id">
  //           {user ? <PostPage /> : <Login />}
  //         </Route>

  //         <Route path="/chat">
  //           {user ? <Chat /> : <Login />}
  //         </Route>
  //         <Route path="/video">
  //           {user ? <Video /> : <Login />}
  //         </Route>

  //         <Route path="/bookmark">
  //           {user ? <Bookmark /> : <Login />}
  //         </Route>

  //         <Route path="/covid">
  //           {user ? <Covid /> : <Login />}
  //         </Route>
  //       </Switch>
  //     </Router>
  //   </div>
  // );
  return (
    <div className="App">
      <Router>
        <VideoNotifications />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/" render={() => {
            return (
              token ?
                <Redirect to="/home" /> :
                <Redirect to="/login" />
            )
          }}
          />
          {user && !isFetching && (<>
            <PrivateRoute exact path="/home" component={Home} />
            <Route exact path="/profile/:username" component={Profile} />
            <PrivateRoute exact path="/post/:id" component={PostPage} />
            <PrivateRoute exact path="/chat" component={Chat} />
            <PrivateRoute exact path="/video" component={Video} />
            <PrivateRoute exact path="/bookmark" component={Bookmark} />
            <PrivateRoute exact path="/covid" component={Covid} />
            <PrivateRoute exact path="/setting" component={Setting} />
          </>)


          }


        </Switch>
      </Router>
    </div>
  );
}

export default App;
