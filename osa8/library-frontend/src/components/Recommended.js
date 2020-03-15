import React from 'react'


const Recommended = (props) => {
    if (!props.show || props.user === null) {
        return null
    }

    const recommendations = props.books.filter(book => book.genres.includes(props.user.favoriteGenre))

    return (
        <div>
            <h2>recommendations</h2>
            books in your favorite genre <b>{props.user.favoriteGenre}</b>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            author
                        </th>
                        <th>
                            published
                     </th>
                    </tr>
                    {recommendations.map(
                        a =>
                            <tr key={a.title}>
                                <td>{a.title}</td>
                                <td>{a.author.name}</td>
                                <td>{a.published}</td>
                            </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Recommended