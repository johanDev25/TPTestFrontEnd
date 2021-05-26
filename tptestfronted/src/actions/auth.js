import { fetchSinToken, fetchConToken } from '../helpers/fetch';
import { types } from '../types/types';
import { toast } from "react-toastify";



export const startLogin = ( email, password ) => {
    return async( dispatch ) => {

        const resp = await fetchSinToken( 'users', { email, password }, 'POST' );
        const body = await resp.json();

        if( body.ok ) {
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login({
                uid: body.uid,
                username: body.username
            }) )
        } else {
            toast.error(body.msg);
        }
        

    }
}

export const startRegister = ( email, password, username ) => {
    return async( dispatch ) => {

        const resp = await fetchSinToken( 'users/new', { email, password, username }, 'POST' );
        const body = await resp.json();

        if( body.ok ) {
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login({
                uid: body.uid,
                username: body.username
            }) )
        } else {
            toast.error(body.msg);
        }


    }
}

export const startChecking = () => {
    return async(dispatch) => {

        const resp = await fetchConToken( 'users/renew' );
        const body = await resp.json();

        if( body.ok ) {
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login({
                uid: body.uid,
                username: body.username
            }) )
        } else {
            dispatch( checkingFinish() );
        }
    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish });



const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});

const logout = () => ({ type: types.authLogout })

const eventLogout =() => ({ type: types.eventLogout });

export const startLogout = () => {

    return ( dispatch ) => {

        localStorage.clear();
        dispatch( eventLogout() );
        dispatch( logout() );
    }
}
