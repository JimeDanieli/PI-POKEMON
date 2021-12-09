import {
    GET_POKEMONS,
    GET_POKE_DETAIL,
    UNMOUNT_GET_POKE,
    CREATE_POKE,
    GET_TYPES,
    FILTER_CREATED,
    ORDER_NAME,
    FILTER_TYPE
} from "../actions/index";



const initialState = {
    pokemons: [],
    allPokemons: [],
    poke: {},
    types: [],

};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload,
            };
        case GET_POKE_DETAIL:
            return {
                ...state,
                poke: action.payload,
            };
        case UNMOUNT_GET_POKE:
            return {
                ...state,
                pokemons: [],
                allPokemons: [],
                poke: {},
               
            };
        case CREATE_POKE:
            return {
                ...state,
                pokemons: state.pokemons.concat(action.payload)
            };
        case GET_TYPES:
            return {
                ...state,
                types: action.payload,
            };
        case FILTER_CREATED:
            const createdFilter = action.payload === 'created' ? state.allPokemons.filter(el => el.createdInBd) : state.allPokemons.filter(el => !el.createdInBd)
            return {
                ...state,
                pokemons: action.payload === 'all' ? state.allPokemons : createdFilter
            };

        case ORDER_NAME:
            let sortedArr = action.payload === 'asc' ?
                state.pokemons.sort((a, b) => {
                    return a.name.toLowerCase().localeCompare(b.name.toLowerCase())

                }) :
                state.pokemons.sort((a, b) => {
                    return b.name.toLowerCase().localeCompare(a.name.toLowerCase())
                })
            return {
                ...state,
                pokemons: sortedArr
            };
        case FILTER_TYPE:
            return {
                ...state,
                pokemons: state.allPokemons.filter((poke) => {
                    return poke.types.some((t) => t.name === action.payload);
                }),
            };
        default:
            return state;
    }

}


export default rootReducer;