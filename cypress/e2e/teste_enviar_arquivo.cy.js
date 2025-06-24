/*
// ============================================== SÉTIMO TESTE =====================================================
// Descreve um conjunto de testes para a funcionalidade de Anexar Exame pelo Paciente
describe('Anexar Exame pelo Paciente', () => {

  // Antes de cada teste neste bloco, faz o login do paciente e configura a viewport
  beforeEach(() => {
    cy.viewport(1280, 720); // Definir a viewport para um tamanho de desktop

    // 1. Visitar a página de login
    cy.visit('http://localhost:3000');

    // 2. Digitar e-mail e senha do PACIENTE (Credenciais VÁLIDAS)
    // **Substitua por um e-mail e senha VÁLIDOS do paciente no seu banco de dados**
    cy.get('input[name="email"]').type('teste1@exemplo.com');
    cy.get('input[name="pass"]').type('1234567890');
    cy.get('.login100-form-btn').click();

    // 3. Verificar que logou no dashboard do paciente
    cy.url().should('include', '/paciente');
  });

  // Define o teste específico para anexar um exame PDF com sucesso
  it('Deve permitir que o paciente anexe um exame PDF com sucesso', () => {

    // **ASSUMIMOS QUE JÁ EXISTE UMA CONSULTA MARCADA E VISÍVEL NA TELA DO PACIENTE**
    // Se não houver consulta, este teste falhará ao tentar encontrar o botão.
    // Você precisa garantir que seu paciente de teste tenha ao menos uma consulta marcada
    // (idealmente, use o mesmo agendamento que você fez no teste anterior, se ele ainda existir no BD).

    // 1. Clicar no botão "Enviar Exame" dentro do card da consulta.
    // Usamos `contains('Enviar Exame')` para encontrar o botão pelo texto visível.
    // Se o botão tem uma ID específica (ex: #btnEnviarExameCard), seria mais preciso.
    // Verifique o HTML do card de consulta para o seletor mais específico.
    cy.get('button').contains('Enviar Exame').click(); // <--- SELETOR DO BOTÃO "ENVIAR EXAME" NO CARD DA CONSULTA

    // 2. Verificar se o modal de Enviar Exame está visível
    cy.get('#enviarExameModal').should('be.visible');

    // 3. Anexar o arquivo PDF no input tipo file
    cy.get('#exameFile').selectFile('cypress/fixtures/exame_teste.pdf'); // <--- NOME DO SEU ARQUIVO NO FIXTURES

    // 4. Lidar com o alerta de sucesso
    const stubAlert = cy.stub();
    cy.on('window:alert', stubAlert);

    // 5. Clicar no botão para submeter o formulário de envio de exame
    // O botão de submit tem type="submit" e classe "btn btn-primary" dentro do form#formEnviarExame
    cy.get('#formEnviarExame button[type="submit"]').click();

    // 6. Verificar o resultado do sucesso do envio
    // **AJUSTE A MENSAGEM:** Para a mensagem exata de sucesso que seu sistema exibe.
    cy.wrap(stubAlert).should('have.been.calledWith', 'Exame enviado com sucesso!'); // <--- MENSAGEM DE SUCESSO ESPERADA

    // 7. Verificar se o modal fechou
    cy.get('#enviarExameModal').should('not.be.visible');
  });
});
// ===========================================================================================================================
*/

/*

// ===========================================================================================================================
// Descreve um conjunto de testes para a funcionalidade de Enviar Receita pelo Médico
describe('Enviar Receita pelo Médico', () => {

  // Antes de cada teste neste bloco, faz o login do médico e configura a viewport
  beforeEach(() => {
    cy.viewport(1280, 720); // Definir a viewport para um tamanho de desktop

    // 1. Visitar a página de login
    cy.visit('http://localhost:3000');

    // 2. Digitar e-mail e senha do MÉDICO (Credenciais VÁLIDAS)
    // **Substitua por um e-mail e senha VÁLIDOS do médico no seu banco de dados**
    cy.get('input[name="email"]').type('raul@medico.com'); // Ex: raul@medico.com
    cy.get('input[name="pass"]').type('1234567890'); // Ex: 1234567890
    cy.get('.login100-form-btn').click();

    // 3. Verificar que logou no dashboard do médico
    cy.url().should('include', '/medico');
  });

  // Define o teste específico para enviar receita após a consulta
  it('Deve permitir que o médico envie uma receita após a consulta com sucesso', () => {

    // **ASSUMIMOS QUE JÁ EXISTE UMA CONSULTA MARCADA E VISÍVEL NA TELA DO MÉDICO**
    // Pela sua captura (213626.jpg), a consulta está visível no dashboard do médico.
    // Você precisa garantir que seu médico de teste tenha ao menos uma consulta marcada
    // para que o botão "Criar Receita" seja visível.

    // 1. Encontrar o botão "Criar Receita" de uma consulta específica e clicar nele.
    // Pela sua imagem, o botão "Criar Receita" está lá. Usamos .contains('Criar Receita') para encontrá-lo.
    cy.get('button').contains('Criar Receita').click(); // <--- SELETOR DO BOTÃO "CRIAR RECEITA" NO CARD DA CONSULTA

    // 2. Verificar se o modal de criação de receita está visível
    // O modal de receita tem id="modal-receita" (confirmado pelo seu main_medico.js)
    cy.get('#modal-receita').should('be.visible');

    // 3. Preencher o campo de Medicamento
    // Seletor: <input type="text" id="medicamento" name="medicamento"> (confirmado pelo seu HTML)
    cy.get('#medicamento').type('Dipirona');

    // 4. Preencher o campo de Dosagem
    // Seletor: <input type="text" id="dosagem" name="dosagem"> (confirmado pelo seu HTML)
    cy.get('#dosagem').type('250mg');

    // 5. Preencher o campo de Instruções
    // Seletor: <textarea id="instrucoes" name="instrucoes"> (confirmado pelo seu HTML)
    cy.get('#instrucoes').type('Tomar 2 em 2 dias, após as refeições.');

    // 6. Lidar com o alerta de sucesso (sua função `enviarReceita` usa `alert()`)
    const stubAlert = cy.stub();
    cy.on('window:alert', stubAlert);

    // 7. Clicar no botão "Enviar Receita"
    // O botão de submit tem type="submit" e classe "btn btn-enviar" dentro do form#form-receita
    cy.get('#form-receita button[type="submit"]').click();

    // 8. Verificar o resultado do sucesso do envio
    // A mensagem de sucesso é 'Receita enviada com sucesso!' (confirmado pelo seu main_medico.js)
    cy.wrap(stubAlert).should('have.been.calledWith', 'Receita enviada com sucesso!');

    // Opcional: Verificar se o modal fechou
    cy.get('#modal-receita').should('not.be.visible');
  });
});

// ===========================================================================================================================
*/

// Descreve um conjunto de testes para a funcionalidade de Anexar Exame pelo Paciente
describe('Anexar Exame pelo Paciente', () => {

  // Antes de cada teste neste bloco, faz o login do paciente e configura a viewport
  beforeEach(() => {
    cy.viewport(1280, 720); // Definir a viewport para um tamanho de desktop

    // 1. Visitar a página de login
    cy.visit('http://localhost:3000');

    // 2. Digitar e-mail e senha do PACIENTE (Credenciais VÁLIDAS)
    cy.get('input[name="email"]').type('teste1@exemplo.com'); // Credencial predefinida
    cy.get('input[name="pass"]').type('1234567890'); // Credencial predefinida
    cy.get('.login100-form-btn').click();

    // 3. Verificar que logou no dashboard do paciente
    cy.url().should('include', '/paciente');

    // **IMPORTANTE: Garantir que há uma consulta visível para interagir**
    // Você precisa ter uma consulta marcada e visível no dashboard do paciente para clicar no botão "Enviar Exame".
  });

  // NOVO TESTE 12 (Falha): Não deve permitir que o paciente anexe um arquivo em formato não permitido
  it('Não deve permitir que o paciente anexe um arquivo em formato não permitido e deve exibir alerta de erro', () => {

    // 1. Abrir o modal de Enviar Exame
    // Clica no botão "Enviar Exame" do card da consulta.
    cy.get('button').contains('Enviar Exame').click();
    cy.get('#enviarExameModal').should('be.visible'); // Verifica se o modal está visível

    // 2. Anexar o arquivo TXT (formato não permitido) no input tipo file
    cy.get('#exameFile').selectFile('cypress/fixtures/documento_invalido.txt'); // <--- AQUI ESTÁ O ARQUIVO INVÁLIDO

    // 3. Lidar com o alerta de erro que deve aparecer
    const stubAlert = cy.stub();
    cy.on('window:alert', stubAlert);

    // 4. Clicar no botão para submeter o formulário de envio de exame
    cy.get('#formEnviarExame button[type="submit"]').click();

    // 5. Verificar o resultado do erro do envio
    // **AJUSTE A MENSAGEM:** Você precisa saber a mensagem EXATA que seu sistema exibe
    // quando o formato do arquivo é inválido. Faça um teste manual (tente enviar um .txt)
    // e veja o texto do alert.
    cy.wrap(stubAlert).should('have.been.calledWith', 'Erro ao enviar o exame: Formato de arquivo não permitido. Apenas imagens e PDFs são aceitos.'); // <--- AJUSTE AQUI A MENSAGEM DE ERRO EXATA!

    // 6. Opcional: Verificar que o modal NÃO fechou (indicando falha no upload)
    cy.get('#enviarExameModal').should('be.visible'); // O modal deve continuar visível
  });
});