import { types } from "../types/types";

const initialState = {
  games: [],
  activeEvent: null,
};

export const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventAddNew:
      return {
        ...state,
        games: [...state.games, action.payload],
      };

    case types.eventDeleted:
      return {
        ...state,
        games: state.games.filter((e) => e.id !== state.activeEvent.id),
        activeEvent: null,
      };

    case types.eventLoaded:
      return {
        ...state,
        games: [...action.payload],
      };

    default:
      return state;
  }
};
