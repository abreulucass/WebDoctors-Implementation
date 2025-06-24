/* 
// ============================================= TERCEIRO TESTE ================================================================
// Descreve um conjunto de testes para a funcionalidade de Agendamento de Consulta
describe('Agendamento de Consulta pelo Paciente', () => {

  // Antes de cada teste neste bloco, faz o login do paciente e configura a viewport
  beforeEach(() => {
    // Definir a viewport para um tamanho de desktop onde o menu é visível
    cy.viewport(1280, 720); // Largura de 1280px, Altura de 720px.

    cy.visit('http://localhost:3000'); // Visita a página de login
    cy.get('input[name="email"]').type('teste1@exemplo.com'); // **SEU E-MAIL VÁLIDO**
    cy.get('input[name="pass"]').type('1234567890'); // **SUA SENHA VÁLIDA**
    cy.get('.login100-form-btn').click();
    cy.url().should('include', '/paciente'); // Confirma que logou
  });

  // Define o teste específico para marcar consulta com todos os campos preenchidos
  it('Deve permitir que o paciente marque uma consulta com todos os campos preenchidos', () => {

    // 1. Clicar no link "Marcar Consulta" no menu para abrir o modal
    cy.get('a[href="#marcar"]').click();

    // 2. Verificar se o modal de agendamento está visível
    cy.get('#marcarConsultaModal').should('be.visible');

    // **IMPORTANTE:** O campo "Nome do Paciente" (id="nome-paciente") é `disabled` e preenchido automaticamente.

    // 3. Selecionar Especialidade
    cy.get('#especialidade').select('Clínico geral'); // <--- AJUSTE O VALOR EXATO (texto visível ou 'value' da option)

    // 4. Esperar que os médicos sejam carregados e SELECIONAR Médico
    // O Cypress aguardará até 4 segundos por padrão para #medico ter mais de 1 opção.
    cy.get('#medico option').should('have.length.gt', 1);
    cy.get('#medico').select('Dr. raul'); // <--- AJUSTE O NOME COMPLETO E EXATO DO MÉDICO para 'Clínico geral'

    // 5. Esperar que os horários sejam carregados e SELECIONAR Horário
    // O Cypress aguardará até 4 segundos por padrão para #horario ter mais de 1 opção.
    cy.get('#horario option').should('have.length.gt', 1);
    cy.get('#horario').select('10/01/2025, 07:30:00'); // <--- AJUSTE O HORÁRIO EXATO E DISPONÍVEL para 'Dr. raul'

    // 6. Preencher Motivo da Consulta
    cy.get('#motivo').type('Dor no ombro e avaliação geral.');

    // 7. Lidar com o alerta de sucesso (se seu sistema usa alert() para confirmar agendamento)
    const stubAlert = cy.stub();
    cy.on('window:alert', stubAlert);

    // 8. Clicar no botão "Confirmar Consulta"
    cy.get('#confirmar-consulta').click();

    // 9. Verificar o resultado do agendamento
    cy.wrap(stubAlert).should('have.been.calledWith', 'Consulta marcada com sucesso!');

    // Opcional: Verificar se o modal fechou
    cy.get('#marcarConsultaModal').should('not.be.visible');
  });
});
//==========================================================================================================================
*/


// ============================================= QUARTO TESTE ================================================================

// Descreve um conjunto de testes para a funcionalidade de Agendamento de Consulta
describe('Agendamento de Consulta pelo Paciente', () => {

  // Antes de cada teste neste bloco, faz o login do paciente e configura a viewport
  beforeEach(() => {
    cy.viewport(1280, 720); // Largura de 1280px, Altura de 720px.

    cy.visit('http://localhost:3000'); // Visita a página de login
    cy.get('input[name="email"]').type('teste1@exemplo.com'); // **SEU E-MAIL VÁLIDO**
    cy.get('input[name="pass"]').type('1234567890'); // **SUA SENHA VÁLIDA**
    cy.get('.login100-form-btn').click();
    cy.url().should('include', '/paciente'); // Confirma que logou
  });

  // NOVO TESTE 4: Paciente tentando marcar consulta sem selecionar especialidade
  it('Não deve permitir agendamento sem especialidade e deve exibir alerta de erro', () => {
    // 1. Clicar no link "Marcar Consulta" para abrir o modal
    cy.get('a[href="#marcar"]').click();

    // 2. Verificar se o modal de agendamento está visível
    cy.get('#marcarConsultaModal').should('be.visible');

    // **IMPORTANTE: NÃO SELECIONAMOS A ESPECIALIDADE AQUI**
    // O campo de especialidade permanece na opção padrão.
    cy.get('#especialidade option:selected')
      .should('have.text', 'Selecione uma especialidade');

    cy.get('#especialidade').should('have.value', null); // Garante que o valor do select é null

    // 3. Verificar que os campos Médico e Horário NÃO foram populados (têm apenas a opção padrão)
    cy.get('#medico option').should('have.length', 1);
    cy.get('#medico option:selected').should('have.text', 'Selecione um médico');

    cy.get('#horario option').should('have.length', 1);
    cy.get('#horario option:selected').should('have.text', 'Selecione um horário');

    // 4. Preencher Motivo da Consulta
    cy.get('#motivo').type('Tentativa de agendamento sem especialidade.');

    // 5. Lidar com o alerta de erro que deve aparecer
    const stubAlert = cy.stub();
    cy.on('window:alert', stubAlert);

    // 6. Clicar no botão "Confirmar Consulta"
    cy.get('#confirmar-consulta').click();

    // 7. Verificar o resultado: O sistema deve impedir o agendamento e mostrar um alerta de erro.
    // AJUSTE AQUI: A mensagem de erro que seu sistema exibe é "Preencha todos os campos antes de confirmar a consulta."
    cy.wrap(stubAlert).should('have.been.calledWith', 'Preencha todos os campos antes de confirmar a consulta.'); // <--- AJUSTADO A MENSAGEM ESPERADA

    // 8. Opcional: Verificar que o modal NÃO fechou, indicando falha no agendamento
    cy.get('#marcarConsultaModal').should('be.visible'); // Modal deve continuar visível
  });
});

// ===================================================================================================================================