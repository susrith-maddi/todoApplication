const express = require('express')
const path = require('path')

const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const app = express()

const dbPath = path.join(__dirname, 'todoApplication.db')

let db = null
app.use(express.json())
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server Running at http://localhost:3000/')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}

initializeDBAndServer()
app.get('/todos/', async (request, response) => {
  const {status} = request.query
  const api1 = `select * from todo where status like '${status}';`
  const api1t = await db.all(api1)
  response.send(api1t)
})
app.get('/todos/', async (request, response) => {
  const {priority} = request.query
  const api2 = `select * from todo where priority = '${priority}' ;`
  const api2t = await db.all(api2)
  response.send(api2t)
})
app.get('/todos/', async (request, response) => {
  const {priority, status} = request.query
  const api3 = `select * from todo where priority='${priority}' and status='${status}';`
  const api3t = await db.all(api3)
  response.send(api3t)
})
app.get('/todos/', async (request, response) => {
  const {search_q} = request.query
  const api4 = `select * from todo where todo = '${search_q}';`
  const api4t = await db.all(api4)
  response.send(api4t)
})
app.get('/todos/:todoID/', async (request, response) => {
  const {todoId} = request.params
  const api21 = `select * from todo where id=${todoId};`
  const api21t = await db.get(api21)
  response.send(api21t)
})
app.post('/todos/', async (request, response) => {
  const todoDetails = request.body
  const {id, todo, priority, status} = todoDetails
  const api31 = `insert into todo(id,todo,priotiy,status) values(${id},'${todo}','${priotiy}','${status}');`
  const api31t = await db.run(api31)
  response.send('Todo Successfully Added')
})
app.put('/todos/:todoId/', async (request, response) => {
  const todoDetails = request.body
  const {todoId} = request.params
  const {status} = todoDetails
  const api41 = `update todo set status='${status}' where id=${todoId};`
  const api41t = await db.run(api41)
  response.send('Status Updated')
})
app.put('/todos/:todoId/', async (request, response) => {
  const todoDetails = request.body
  const {todoId} = request.params
  const {priority} = todoDetails
  const api42 = `update todo set priority='${priority}' where id=${todoId};`
  const api42t = await db.run(api42)
  response.send('Priority Updated')
})
app.put('/todos/:todoId/', async (request, response) => {
  const todoDetails = request.body
  const {todoId} = request.params
  const {todo} = todoDetails
  const api43 = `update todo set todo='${todo}' where id=${todoId};`
  const api43t = await db.run(api43)
  response.send('Todo Updated')
})
app.delete('/todos/:todoId/', async (request, response) => {
  const {todoId} = request.params
  const api51 = `delete from todo where id=${todoId};`
  const api51t = await db.run(api51)
  response.send('Todo Deleted')
})
module.exports = app
