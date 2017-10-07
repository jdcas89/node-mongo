const expect = require('expect')
const request = require('supertest')

const {
  app
} = require('./../server')
const {
  Todo
} = require('./../models/todo')

const todos = [
  {
    text: "test todo"
  },
  {
    text: "second todo"
  },
  {
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