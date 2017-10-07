const expect = require('expect')
const request = require('supertest')
const {ObjectID}  = require('mongodb')

const {
  app
} = require('./../server')
const {
  Todo
} = require('./../models/todo')

const todos = [
  {
    _id: new ObjectID(),
    text: "test todo"
  },
  {
    _id: new ObjectID(),
    text: "second todo"
  },
  {
    _id: new ObjectID(),
    text: "third todo"
  },
]
beforeEach((done) => {
  Todo.remove({}).then(() =>{
    Todo.insertMany(todos)
  }).then(() => done())
})


describe('POST /todos', () => {
  it('Should create a new todo', (done) => {
    var text = 'test text'

    request(app)
      .post('/todos')
      .send({
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1)
          expect(todos[0].text).toBe(text)
          done()
        }).catch((err) => done(err))
      })
  })

  it('Should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(3)
          done()
        }).catch((err) => done(err))
      })
  })
})



describe('Get /todos', () => {
  it('Should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(3)
      })
      .end(done)
  })
})


describe('Get /todos/:id', () => {
  it('Should return a todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text)
      })
      .end(done)
  } )

  it('Should return a 404 if todo not found', (done) => {
    request(app)
    .get(`/todos/${ new ObjectID().toHexString() }`)
    .expect(404)
    .end(done)
  })

  it('Should return a 404 if invalid id', (done) => {
    request(app)
    .get(`/todos/123`)
    .expect(404)
    .end(done)
   })
})