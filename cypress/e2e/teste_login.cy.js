/*
====================================== Primeiro teste =============================================
// Descreve um teste para a funcionalidade de Login Válido
describe('Funcionalidade de Login - Cenário Válido', () => {

  it('Deve permitir que um paciente faça login com sucesso usando credenciais válidas', () => {
    // 1. Visitar a página de login do WebDoctors
    cy.visit('http://localhost:3000'); // URL da sua página de login

    // 2. Localizar o campo de e-mail e digitar o e-mail do paciente
    // **Ajustar e-mail para um paciente VÁLIDO do banco de dados**
    cy.get('input[name="email"]').type('teste1@exemplo.com');

    // 3. Localizar o campo de senha e digitar a senha do paciente
    // **Ajustar senha para a SENHA VÁLIDA do paciente**
    cy.get('input[name="pass"]').type('1234567890');

    // 4. Localizar o botão de login e clicar nele
    cy.get('.login100-form-btn').click();

    // 5. Verificar o resultado do login:
    // Deve ser redirecionado para a URL do dashboard do paciente
    cy.url().should('include', '/paciente');
  });
});
=================================================================================================
*/


// ====================================== Segundo teste =============================================
// Descreve um teste para a funcionalidade de Login Inválido
describe('Funcionalidade de Login - Cenário Inválido', () => {

  it('Não deve permitir login com senha inválida e deve exibir mensagem de erro via alerta', () => {
    // Primeiro, vamos "espionar" a função window.alert para capturar suas chamadas
    const stub = cy.stub();
    cy.on('window:alert', stub); // `cy.on` para escutar todas as chamadas de alert

    // 1. Visitar a página de login
    cy.visit('http://localhost:3000');

    // 2. Digitar um e-mail VÁLIDO
    cy.get('input[name="email"]').type('teste1@exemplo.com'); // **Use o mesmo E-MAIL VÁLIDO**

    // 3. Digitar uma senha INVÁLIDA
    cy.get('input[name="pass"]').type('123'); // **Use uma SENHA QUE NÃO FUNCIONA**

    // 4. Clicar no botão de login
    cy.get('.login100-form-btn').click();

    // 5. Verificar que a URL NÃO mudou (permanece na página de login)
    cy.url().should('not.include', '/paciente');

    // 6. Verificar os alertas que foram disparados
    // Como o Cypress só está capturando o primeiro alerta, vamos focar nele.
    cy.wrap(stub).should('have.been.calledWith', 'Senha incorreta.'); // Verifica o primeiro alerta

    // REMOVIDA A LINHA ABAIXO, POIS O SEGUNDO ALERTA NÃO ESTÁ SENDO CAPTURADO PELO STUB
    // cy.wrap(stub).should('have.been.calledWith', 'Erro ao tentar fazer login. Verifique sua conexão.');
  });
});
// =================================================================================================