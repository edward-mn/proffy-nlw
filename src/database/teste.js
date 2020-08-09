const Database = require('./db') // Pegando pasta local
const createProffy = require('./createProffy')

Database.then(async (db) => {
  // Inserir dados
  proffyValue = {
    name: "Edward Moreira",
    avatar: "https://avatars3.githubusercontent.com/u/33128259?s=460&u=a092d4382ee6d42fc11081ecaeb29ed10dfb77f8&v=4",
    whatsapp: "89987654534",
    bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
  }

  classValue = {
    subject: 1,
    cost: "20",
    // O proffy_id virá pelo banco de dados
  }

  classScheduleValues = [
    // O class_id virá pelo banco de dados, após cadastararmos a class 
    {
      weekday: 0,
      time_from: 720,
      time_to: 1220
    },
    {
      weekday: 1,
      time_from: 520,
      time_to: 1220
    }
  ]

  // await createProffy(db, {proffyValue, classValue, classScheduleValues})

  // Consultar os dados inseridos

  // Todos os proffys
  const selectedProffys = await db.all("Select * FROM proffys")

  // Consultar as classes de um determinado professor
  
  // Trazer junto com os dados do professor
  const selectClassesAndProffys = await db.all(`
    SELECT classes.*, proffys.*
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE classes.proffy_id = 1;
  `)

  // horário 8 - 18h
  // time_from =< 8
  // time_to > 18
  
  const selectClassesSchedules = await db.all(`
    SELECT class_schedule.*
    FROM class_schedule
    WHERE class_schedule.class_id = 1
    AND class_schedule.weekday = "0"
    AND class_schedule.time_from <= "620"
    AND class_schedule.time_to > "620"
  `)
})