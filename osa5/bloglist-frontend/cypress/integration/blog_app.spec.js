describe('Blog app ', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            blogs: [],
            name: 'test',
            username: 'test',
            password: 'test'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('Login')
        cy.contains('password')
        cy.contains('username')
    })

    describe('Login', function () {

        it('fails with wrong credentials', function () {
            cy.get('[name=username]').type('test')
            cy.get('[name=password]').type('wrong')
            cy.get('[name=login-button]').click()
            cy.contains('wrong username or password')
        })

        it('succeeds with correct credentials', function () {
            cy.get('[name=username]').type('test')
            cy.get('[name=password]').type('test')
            cy.get('[name=login-button]').click()
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.request('POST', 'http://localhost:3001/api/login', {
              username: 'test', password: 'test'
            }).then(response => {
              localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
              const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
              const user = JSON.parse(loggedUserJSON)

              cy.visit('http://localhost:3000')
            })
          })

        it('A blog can be created', function() {
            cy.get('[name=newblog-button]').click()
            cy.get('[name=title').type('Name of Blog')
            cy.get('[name=author').type('Author Man')
            cy.get('[name=url').type('www.url.url')
            cy.get('[name=submit-button]').click()
            cy.contains('Name of Blog Author Man')
        })

        it('Liking a blog works as intended', function() {
            cy.get('[name=newblog-button]').click()
            cy.get('[name=title').type('Name of Blog')
            cy.get('[name=author').type('Author Man')
            cy.get('[name=url').type('www.url.url')
            cy.get('[name=submit-button]').click()
            cy.get('[name=view-button]').click()
            cy.contains('likes: 0')
            cy.get('[name=like-button]').click()
            cy.contains('likes: 1')
        })

        it.only('User can remove blog', function() {
            cy.get('[name=newblog-button]').click()
            cy.get('[name=title').type('Name of Blog')
            cy.get('[name=author').type('Author Man')
            cy.get('[name=url').type('www.url.url')
            cy.get('[name=submit-button]').click()
            cy.get('[name=view-button]').click()
            cy.get('[name=delete-button]').click()
            cy.wait(5000)
            cy.contains('Name of Blog').should('not.exist')
        })

    })
})