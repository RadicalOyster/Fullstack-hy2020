lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    var mostLikes = 0
    var mostPopular = {}

    for (var i = 0; i < blogs.length; i++) {
        if (blogs[i].likes >= mostLikes) {
            mostLikes = blogs[i].likes
            mostPopular = blogs[i]
        }
    }
    return mostPopular
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}