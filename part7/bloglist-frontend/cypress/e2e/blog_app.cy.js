describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    const user = {
      name: 'Me',
      username: 'root',
      password: 'secret',
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/user`, user);
    cy.visit('');
  });

  it('front page can be opened', function () {
    cy.contains('blogs');
  });

  it('login form an be opened', function () {
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('[data-cy="username"]').type('root');
      cy.get('[data-cy="password"]').type('secret');
      cy.get('[data-cy="loginButton"]').click();

      cy.contains('Me logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('[data-cy="username"]').type('fail');
      cy.get('[data-cy="password"]').type('fail');
      cy.get('[data-cy="loginButton"]').click();

      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');

      cy.get('html').should('not.contain', 'Me logged in');
    });

    describe('When logged in', function () {
      beforeEach(function () {
        cy.login({ username: 'root', password: 'secret' });
      });

      it('a new blog can be created', function () {
        cy.get('[data-cy="newBlogButton"]').click();
        cy.get('[data-cy="titleInput"]').type('title');
        cy.get('[data-cy="authorInput"]').type('cypress');
        cy.get('[data-cy="urlInput"]').type('url');
        cy.get('[data-cy="addNewBlogButton"]').click();

        cy.get('.success')
          .should('contain', 'a new blog title by cypress added')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid');
      });

      it('a blog can be liked', function () {
        cy.addNewBlog({
          title: 'title',
          author: 'cypress',
          url: 'url',
        });
        cy.contains('like').click();
        cy.contains('likes 1');
      });

      it('a blog can be deleted', function () {
        cy.addNewBlog({
          title: 'title',
          author: 'cypress',
          url: 'url',
        });
        cy.contains('remove').click();
        cy.get('html').should('not.contain', 'title');
      });

      it('a blog can be only deleted by the creator of the blog', function () {
        cy.addNewBlog({
          title: 'title',
          author: 'cypress',
          url: 'url',
        });
        cy.get('[data-cy="removeButton"]').should(
          'have.id',
          `${JSON.parse(localStorage.getItem('loginCredentials')).id}`,
        );
      });

      it('the blogs are sorted by the number of likes after clicking sort', function () {
        cy.addNewBlog({
          title: 'first',
          author: 'cypress',
          url: 'first url',
        });
        cy.addNewBlog({
          title: 'second',
          author: 'cypress',
          url: 'second url',
        });
        cy.get('[data-cy="likeButton"]').eq(0).click();
        cy.get('[data-cy="likeButton"]').eq(1).click();
        cy.get('[data-cy="likeButton"]').eq(1).click();
        cy.contains('sort').click();
        cy.get('[data-cy="blogTitle"]').eq(0).should('contain', 'second');
        cy.get('[data-cy="blogTitle"]').eq(1).should('contain', 'first');
      });
    });
  });
});
