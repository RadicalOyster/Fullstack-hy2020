import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ ErrorMessage, errorMessage, handleLogin, username, password, setUsername, setPassword }) => (
    <div>
        <h2>Login</h2>
        <ErrorMessage message={errorMessage}></ErrorMessage>
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="username"
                    onChange={({ target }) => setUsername(target.value)}>
                </input>
            </div>
            <div>
                password
            <input
                    type="password"
                    value={password}
                    name="password"
                    onChange={({ target }) => setPassword(target.value)}>
                </input>
            </div>
            <button type="submit" name="login-button">login</button>
        </form>
    </div>
)

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default LoginForm