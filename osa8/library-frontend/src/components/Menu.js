import React from 'react'

const Menu = (props) => {
    if (!props.token) {
        return (
            <div>
                <button onClick={() => props.setPage('authors')}>authors</button>
                <button onClick={() => props.setPage('books')}>books</button>
            </div>
        )
    }
    return (
        <div>
            <button onClick={() => props.setPage('authors')}>authors</button>
            <button onClick={() => props.setPage('books')}>books</button>
            <button onClick={() => props.setPage('add')}>add book</button>
            <button onClick={() => props.setPage('recommended')}>recommended</button>
            <button onClick={() => props.logout()}>logout</button>
        </div>
    )
}

export default Menu