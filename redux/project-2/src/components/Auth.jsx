import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../redux/actions/authActions'



const Auth = () => {
    const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);
    const dispatch = useDispatch();



    return (
        <div>
            <h2>
                {isAuthenticated ? 'Logged In' : 'Logged out'}

            </h2>

            {isAuthenticated ? (<button onClick={() => dispatch(logout())}>Logout</button>)
                :
                (<button onClick={() => dispatch(login())}>login</button>)}

        </div>
    )
}

export default Auth