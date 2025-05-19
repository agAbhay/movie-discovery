describe('Movie Detail Page', () => {
  const movieId = 574475; // replace with any valid TMDB movie ID or mock ID

  beforeEach(() => {
    cy.intercept('GET', `**/movie/${movieId}`, { fixture: 'movie.json' }).as('getMovie');
    cy.intercept('GET', `**/movie/${movieId}/credits`, { fixture: 'credits.json' }).as('getCredits');
    cy.intercept('GET', `**/movie/${movieId}/videos`, { fixture: 'videos.json' }).as('getVideos');
    cy.intercept('GET', `**/movie/${movieId}/similar`, { fixture: 'similar.json' }).as('getSimilar');

    cy.visit(`/movie/${movieId}`);
  });

  it('displays the movie title and overview', () => {
    cy.wait(['@getMovie']);
    cy.contains('Fight Club');
    cy.contains('overview'); 
  });

  it('renders genres as chips', () => {
    cy.get('.MuiChip-root').should('have.length.greaterThan', 0);
  });

  it('displays the YouTube trailer if available', () => {
    cy.wait('@getVideos');
    cy.get('iframe').should('have.attr', 'src').and('include', 'youtube.com');
  });

  it('renders the cast section', () => {
    cy.wait('@getCredits');
    cy.get('div').contains('Cast');
    cy.get('img').should('have.length.greaterThan', 0);
  });

  it('renders similar movies and navigates on click', () => {
    cy.wait('@getSimilar');
    cy.get('div').contains('Similar Movies');
    cy.get('.cursor-pointer').first().click();

    // You can spy on route change here if desired
    cy.location('pathname').should('match', /\/movie\/\d+/);
  });

  it('shows loading state initially', () => {
    cy.visit(`/movie/${movieId}`, {
      onBeforeLoad(win) {
        win.fetch = () => new Promise(() => {}); // block all fetches to force loading
      },
    });

    cy.contains('Loading movie details...');
    cy.get('.MuiSkeleton-root').should('exist');
  });
});
