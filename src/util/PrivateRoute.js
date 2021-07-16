import { useContext, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { auth } = useContext(AuthContext)
    const isAuth = localStorage.getItem('token')
    // 60ccd578c278f11d3c205bfd


    return (
        < Route {...rest}
            render={props => (localStorage.getItem('token')
                ? (<Component {...props} />)
                : (<Redirect to={{ pathname: "/login" }} />))} />
    )

}


export default PrivateRoute