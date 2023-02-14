import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert';

import { UserContext } from '../App';
import Loading from './Loading';

const Logout = () => {

    const { state, dispatch } = useContext(UserContext);

    const history = useHistory();
    useEffect(() => {
        fetch('/logout', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((res) => {
            dispatch({ type: "USER", payload: false });
            window.localStorage.removeItem("isLoggedIn");
            window.localStorage.removeItem("userDetail");
            console.log("state:", state);
            swal("     ",
                {
                    title: "Loged Out Successfully",
                    icon: "success",
                    buttons: false,
                    timer: 1000
                });
            history.push("/");
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        }).catch((err) => {
            console.log(err);
        })
    })

    return (
        <>
            <Loading caption={`Logging out...`} />
        </>
    )
}

export default Logout