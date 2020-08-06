/* Quando usar console.log lembrar que o terminal do code irá apresentar a informação e não o browser */
// Dados
const proffys = [
  {
    name: "Edward Moreira",
    avatar: "https://avatars3.githubusercontent.com/u/33128259?s=460&u=a092d4382ee6d42fc11081ecaeb29ed10dfb77f8&v=4",
    whatsapp: "89987654534",
    bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
    subject: "Química",
    cost: "20",
    weekday: [0],
    time_from: [720],
    time_to: [1220]
  },
  {
    name: "Josuel da vida",
    avatar: "https://avatars3.githubusercontent.com/u/33128259?s=460&u=a092d4382ee6d42fc11081ecaeb29ed10dfb77f8&v=4",
    whatsapp: "89987654534",
    bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
    subject: "Química",
    cost: "15",
    weekday: [1],
    time_from: [720],
    time_to: [1220]
  }
]

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
]

// Funcionalidades

function getSubject(subjectNumber) {
  const arrayPositon = +subjectNumber -1;
  return subjects[arrayPositon];
}

function pageLanding(req, res) {
  return res.render("index.html")
}

function pageStudy(req, res) {
  const filters = req.query
  return res.render("study.html", { proffys, filters, subjects, weekdays })
}

function pageGiveClasses(req, res) {
    const data = req.query

    const isNotEmpty = Object.keys(data).length > 0
    if (isNotEmpty) {
      // Utilizando a função que transforma número em texto
      data.subject = getSubject(data.subject)

      // Adicionar dados a lista de proffys
      proffys.push(data);
      
      return res.redirect('/study')
    }
  return res.render("give-classes.html", { subjects, weekdays })
}

// Servidor
const express = require('express')
const server = express()

// Configurar nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
  express: server,
  noCache: true,
})

// Início e Configuração do servidor 
server
// Configurar arquivos estáticos (css, scripts, imagens)
.use(express.static("public"))
// rotas da aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
// Start do servidor 
.listen(5500)
