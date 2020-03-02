const initialState = ""

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTER':
            const newFilter = action.filter
            state = newFilter
            return state
        default:
            return state
    }
}

export default reducer