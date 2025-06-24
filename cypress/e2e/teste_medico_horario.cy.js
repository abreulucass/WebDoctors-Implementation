/*
// ========================================== QUINTO TESTE ================================================
// Descreve um conjunto de testes para a funcionalidade de Adicionar Horário como Médico
describe('Adicionar Horário Disponível pelo Médico', () => {

  // Antes de cada teste neste bloco, faz o login do médico e configura a viewport
  beforeEach(() => {
    cy.viewport(1280, 720); // Definir a viewport para um tamanho de desktop

    // 1. Visitar a página de login
    cy.visit('http://localhost:3000');

    // 2. Digitar e-mail e senha do MÉDICO (Credenciais VÁLIDAS)
    // **Substitua por um e-mail e senha VÁLIDOS do médico no seu banco de dados**
    cy.get('input[name="email"]').type('raul@medico.com');
    cy.get('input[name="pass"]').type('1234567890');
    cy.get('.login100-form-btn').click();

    // 3. Verificar que logou no dashboard do médico
    cy.url().should('include', '/medico'); // <--- AJUSTE PARA A URL DO DASHBOARD DO MÉDICO
  });

  // Define o teste específico para adicionar horário com sucesso
  it('Deve permitir que o médico adicione um novo horário e data disponíveis com sucesso', () => {

    // 1. Clicar no link "Adicionar Horário Disponível" no menu para abrir o modal
    cy.get('a[href="#adicionarHorario"]').click();

    // 2. Verificar se o modal de adição de horário está visível
    cy.get('#adicionarHorarioModal').should('be.visible');

    // 3. Interagir com o campo de Data (mini-calendário)
    // O input tem id="data-horario". Clicar nele para abrir o calendário.
    cy.get('#data-horario').click();

    // **AJUSTE AQUI**: Interação com o mini-calendário
    // Isso é a parte mais dependente da sua implementação.
    // Você precisa inspecionar o HTML do mini-calendário para saber como selecionar uma data futura.
    // Exemplo: Clicar em um botão "Próximo Mês" ou selecionar um dia específico.
    // Para simplificar agora, vamos simular a seleção de uma data no futuro.
    // Se o mini-calendário abre um input de texto onde você pode digitar, cy.type() ainda funcionaria.
    // Mas se é uma UI de calendário, geralmente você clica em um elemento de dia.

    // Exemplo comum para um calendário simples (ajuste o seletor para o SEU calendário):
    // Digamos que o calendário abra e o dia 15 do próximo mês seja clicável:
    // cy.get('.flatpickr-day.nextMonthDay:contains("15")').click(); // Exemplo para Flatpickr
    // Ou, se for um input date padrão do navegador, o `.type()` é o que preenche.
    // Se o seu `input type="date"` abre um calendário NATIVO do navegador, o `.type(formattedFutureDate)`
    // que eu passei no código anterior *ainda é a forma correta* de interagir com ele no Cypress,
    // pois o Cypress manipula o valor do input diretamente e o navegador renderiza a data.
    // Se for um calendário customizado (como Bootstrap Datepicker, jQuery UI Datepicker, etc.),
    // você precisará de seletores específicos.

    // Pelo seu HTML, o input é `type="date"`. Normalmente, para `type="date"`, `.type()` funciona
    // para preencher o valor, e o navegador então o renderiza no mini-calendário.
    // Vamos manter a lógica de `type()` para a data, pois é o padrão para `input type="date"`
    // a menos que você tenha uma biblioteca de calendário customizada que exija cliques em elementos visuais.
    const today = new Date();
    const futureDate = new Date(today.setDate(today.getDate() + 7)); // Adiciona 7 dias à data atual
    const year = futureDate.getFullYear();
    const month = String(futureDate.getMonth() + 1).padStart(2, '0');
    const day = String(futureDate.getDate()).padStart(2, '0');
    const formattedFutureDate = `${year}-${month}-${day}`;
    cy.get('#data-horario').type(formattedFutureDate);

    // 4. Interagir com o campo de Horário (seletor de hora/minuto)
    // O input tem id="hora-horario" e é type="time".
    // Para type="time", .type() é o método padrão para preencher HH:MM.
    // Se ele abre um seletor visual complexo (com "rodinhas" ou menus suspensos),
    // você precisaria de interações mais complexas. Mas para `type="time"`, `.type()` é o esperado.
    cy.get('#hora-horario').type('09:00'); // <--- AJUSTE O HORÁRIO SE PREFERIR OUTRO (HH:MM)

    // 5. Lidar com o alerta de sucesso
    const stubAlert = cy.stub();
    cy.on('window:alert', stubAlert);

    // 6. Clicar no botão "Adicionar"
    cy.get('button').contains('Adicionar').click();

    // 7. Verificar o resultado do sucesso da adição
    cy.wrap(stubAlert).should('have.been.calledWith', 'Horário adicionado com sucesso!');

    // Opcional: Verificar se o modal fechou
    cy.get('#adicionarHorarioModal').should('not.be.visible');
  });
});
// =============================================================================================================
*/


/*
// =============================================================================================================
// Descreve um conjunto de testes para a funcionalidade de Adicionar Horário como Médico
describe('Adicionar Horário Disponível pelo Médico', () => {

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

  // NOVO TESTE 6: Médico tentando adicionar horário já existente
  it('Não deve permitir que o médico adicione um horário já existente e deve exibir alerta de erro', () => {

    // 1. Clicar no link "Adicionar Horário Disponível" no menu para abrir o modal
    cy.get('a[href="#adicionarHorario"]').click();

    // 2. Verificar se o modal de adição de horário está visível
    cy.get('#adicionarHorarioModal').should('be.visible');

    // 3. Preencher o campo de Data com uma data EXISTENTE no banco de dados para o Dr. Raul
    // Usaremos '2025-06-29' com base na sua captura de tela do BD.
    const existingDate = '2025-06-29'; // Data no formato YYYY-MM-DD
    cy.get('#data-horario').type(existingDate);

    // 4. Preencher o campo de Horário com um horário EXISTENTE para a data acima
    // Usaremos '00:30' com base na sua captura de tela do BD.
    const existingTime = '00:30'; // Horário no formato HH:MM
    cy.get('#hora-horario').type(existingTime);

    // 5. Lidar com o alerta de erro que deve aparecer
    const stubAlert = cy.stub();
    cy.on('window:alert', stubAlert);

    // 6. Clicar no botão "Adicionar"
    cy.get('button').contains('Adicionar').click();

    // 7. Verificar o resultado: O sistema deve exibir um alerta de erro
    // Pelo seu `main_medico.js`, em caso de erro, ele mostra `Erro ao adicionar horário: ${error.message}`
    // Você precisa saber qual a `error.message` que seu backend envia para horário duplicado.
    // Faça um teste manual (tente adicionar 2025-06-29 00:30 novamente) e veja o texto exato do alert.
    cy.wrap(stubAlert).should('have.been.calledWith', 'Erro ao adicionar horário: Este horário já está disponível.'); // <--- **AJUSTE AQUI A MENSAGEM DE ERRO EXATA!**

    // 8. Opcional: Verificar que o modal de adição de horário NÃO fechou (ou que ele continua visível)
    cy.get('#adicionarHorarioModal').should('be.visible'); // O modal deve continuar visível
  });
});
// =============================================================================================================
*/

// Descreve um conjunto de testes para a funcionalidade de Remoção de Horário pelo Médico
describe('Remover Horário Disponível pelo Médico', () => {

  // Antes de cada teste neste bloco, faz o login do médico e configura a viewport
  beforeEach(() => {
    cy.viewport(1280, 720); // Definir a viewport para um tamanho de desktop

    // 1. Visitar a página de login
    cy.visit('http://localhost:3000');

    // 2. Digitar e-mail e senha do MÉDICO (Credenciais predefinidas)
    cy.get('input[name="email"]').type('raul@medico.com'); // Ex: raul@medico.com
    cy.get('input[name="pass"]').type('1234567890'); // Senha para o médico
    cy.get('.login100-form-btn').click();

    // 3. Verificar que logou no dashboard do médico
    cy.url().should('include', '/medico');
  });

  // Teste 15.1: Não deve exibir horários com consulta marcada no modal de remoção
  it('Não deve exibir horários com consulta marcada no modal de remoção', () => {

    // 1. Clicar no link "Remover Horário Disponível" no menu para abrir o modal
    cy.get('a[href="#removerHorario"]').click();

    // 2. Verificar se o modal de remoção de horário está visível
    cy.get('#removerHorarioModal').should('be.visible');

    // 3. Verificar se um horário ESPECÍFICO QUE ESTÁ MARCADO/RESERVADO NÃO APARECE na lista
    // **CRÍTICO: Pegue a data e hora EXATA de uma consulta MARCADA (que está 'reservado'/'Agendada')
    // para o seu médico de teste, no formato que aparece na UI do site (ex: '10/01/2025, 07:30:00')**
    // Use um horário que você sabe que tem uma consulta AGENDADA para o médico.
    const horarioMarcado = '2025-06-29, 00:30:00.000Z'; // <--- AJUSTE COM A DATA E HORA DE UMA CONSULTA *MARCADA* DO SEU MÉDICO

    // A asserção 'not.contain' verifica que o elemento #lista-horarios-disponiveis
    // NÃO contém o texto do horário marcado. Isso valida a regra de negócio da UI.
    cy.get('#lista-horarios-disponiveis').should('not.contain', horarioMarcado);

    // Opcional: Se você quiser garantir que HÁ horários DISPONÍVEIS na lista (para remover)
    cy.get('#lista-horarios-disponiveis li').should('have.length.gt', 0); // Verifica que há pelo menos 1 item na lista (disponível)

    // 4. Fechar o modal após a verificação
    cy.get('#removerHorarioModal .close').click(); // Botão de fechar (X)
    cy.get('#removerHorarioModal').should('not.be.visible');
  });

  // Teste 15.2: Deve permitir que o médico remova um horário disponível com sucesso
  it('Deve permitir que o médico remova um horário disponível com sucesso', () => {

    // 1. Clicar no link "Remover Horário Disponível" no menu para abrir o modal
    cy.get('a[href="#removerHorario"]').click();

    // 2. Verificar se o modal de remoção de horário está visível
    cy.get('#removerHorarioModal').should('be.visible');

    // 3. Verificar se há horários disponíveis para remover
    cy.get('#lista-horarios-disponiveis li').should('have.length.gt', 0);

    // 4. Selecionar o primeiro horário disponível na lista (clicar no item <li>)
    // Clica no primeiro item da lista de horários disponíveis.
    cy.get('#lista-horarios-disponiveis li').first().click();

    // 5. Verificar se a confirmação de remoção aparece
    cy.get('#confirmacao-remocao').should('be.visible');

    // 6. Lidar com o alerta de sucesso
    const stubAlert = cy.stub();
    cy.on('window:alert', stubAlert);

    // 7. Clicar no botão "Sim" para confirmar a remoção
    cy.get('#confirmar-remocao').click();

    // 8. Verificar o resultado do sucesso da remoção
    cy.wrap(stubAlert).should('have.been.calledWith', 'Horário removido com sucesso.');

    // 9. Verificar se o modal fechou
    cy.get('#removerHorarioModal').should('not.be.visible');

    // Opcional: Verificar se o horário removido não aparece mais na lista (se houver essa atualização dinâmica)
  });
});