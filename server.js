const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importando o cors
const session = require('express-session');
const multer = require('multer'); // <--- IMPORTAR MULTER AQUI

const PORT = 3000;

// ====================================================================================================================

//importar o arquivo do bd
const connectDb = require('./bd')

const loginRoutes = require('./controllers/controller_login'); // Rotas de login
const medicosRoutes = require('./controllers/controller_medico'); // Rotas de médicos
const consultasRoutes = require('./controllers/controller_paciente'); // Rotas de paciente (onde está o /enviar-exame)
const registerRoutes = require('./controllers/controller_register');
// ====================================================================================================================

//app
const app = express();

// Configuração de sessões
app.use(session({
    secret: 'suaChaveSecreta', // Substituir por uma chave segura
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Alterar para `true` se usar HTTPS
}));

// ====================================================================================================================

// Middleware para analisar o corpo da requisição em JSON e habilitar CORS
app.use(cors()); // Habilita CORS
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ====================================================================================================================

// Servir os arquivos estáticos da página de login
app.use('/login-assets', express.static(path.join(__dirname, 'assets', 'login', 'Login_v1')));

// Servir os arquivos estáticos da pasta 'menu'
app.use('/menu', express.static(path.join(__dirname, 'assets', 'menu')));

// Configurar a pasta "views" como estática
app.use(express.static(path.join(__dirname, 'views'))); // Certifique-se de que as views estão sendo servidas corretamente

// Servir arquivos de upload (se houver uma pasta de uploads acessível publicamente)
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // <--- Adicione isto se quiser servir os arquivos de upload

//rotas
app.use('/', consultasRoutes) // Rotas de paciente, incluindo /enviar-exame
app.use('/medicos', medicosRoutes); // Rotas de médicos (subrota para gerenciar horários)
app.use('/', loginRoutes);
app.use('/', registerRoutes);


// ====================================================================================================================
// NOVO MIDDLEWARE DE TRATAMENTO DE ERROS DO MULTER - ADICIONE AQUI
// ESTE CÓDIGO DEVE VIR DEPOIS DE TODAS AS SUAS ROTAS app.use()
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Erro específico do Multer (ex: FILE_FILTER, LIMIT_FILE_SIZE)
        console.error('Multer Error:', err.message);
        // Retorna a mensagem de erro que você definiu no Multer fileFilter
        return res.status(400).json({ success: false, message: err.message });
    } else if (err) {
        // Outros erros que podem ter sido lançados em rotas ou outros middlewares
        console.error('General Upload/Server Error:', err.message);
        return res.status(500).json({ success: false, message: err.message || 'Erro desconhecido do servidor.' });
    }
    next(); // Passa para o próximo middleware se não for um erro de Multer
});
// ====================================================================================================================


//Habilitar conexao com o DB e o servidor da aplicação
connectDb()
.then(() => {
    console.log('>> Banco de dados conectados com sucesso.')
    app.listen(3000, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`)
    }).on('error', err =>
    console.log("erro ao ligar com o servidor: \n", err))
})
.catch(err => console.log("Não foi possivel conectar ao bd \n", err))

// ===================================================================================================================

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'assets', 'login', 'Login_v1', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});