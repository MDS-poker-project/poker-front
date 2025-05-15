describe('Page d\'accueil', () => {
    it('devrait afficher le composant des tables', () => {
        cy.visit('/');
        cy.contains('Tables de jeu disponibles');
    });

    it('devrait afficher le composant de connexion', () => {
        cy.visit('/');
        cy.contains('Connexion');
    });
});
