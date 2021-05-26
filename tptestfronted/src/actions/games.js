import { types } from '../types/types';
import { fetchConToken } from '../helpers/fetch';
import {toast} from "react-toastify"

export const eventStartAddNew = ( game ) => {
    return async( dispatch, getState ) => {

        const { uid, username } = getState().auth;

        try {
            const resp = await fetchConToken('games', game, 'POST');
            const body = await resp.json();

            if ( body.ok ) {
                game.id = body.evento.id;
                game.user = {
                    _id: uid,
                    username: username
                }
              
                dispatch( eventAddNew( game ) );
            }


        } catch (error) {
            console.log(error);
        }

        

    }
}


const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});



export const eventStartDelete = (id) => {
    return async ( dispatch ) => {

        try {
            const resp = await fetchConToken(`games/${ id }`, {}, 'DELETE' );
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( eventDeleted() );
            } else {
                toast.error(body.msg);
            }


        } catch (error) {
            console.log(error)
        }

    }
}


const eventDeleted = () => ({ type: types.eventDeleted });

export const eventStartLoading = () => {
    return async(dispatch) => {

        try {
            
            const resp = await fetchConToken( 'games' );
            const body = await resp.json();
            const games = body.games
            dispatch( eventLoaded( body.games ) );


        } catch (error) {
            console.log(error)
        }

    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})


export const eventLogout =() => ({ type: types.eventLogout });