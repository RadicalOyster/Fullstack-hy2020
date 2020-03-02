const initialState = null

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MESSAGE':
            state = action.message
            return state
        default:
            return state
    }
}

export const setNotification = (message, timeout) => {
    return async dispatch => {
        dispatch({
            type: 'SET_MESSAGE',
            message: message
        })
        setTimeout(() => {
            dispatch({
                type: 'SET_MESSAGE',
                message: null
            })
        }, timeout)
    }
}

export default reducer