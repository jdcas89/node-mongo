const expect = require('expect')
const request = require('supertest')
const {
  ObjectID
} = require('mongodb')
const {
  todos,
  populateTodos,
  users,
  populateUsers
} = require('./seed/seed')

const {
  app
} = require('./../server')
const {
  Todo
} = require('./../models/todo')

const {
  User
} = require('./../models/user')


beforeEach(populateUsers)
beforeEach(populateTodos)


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

        Todo.find({
          text
        }).then((todos) => {
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
  })

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



describe('Delete /todos/:id', () => {
  it('Should remove a todo', (done) => {
    request(app)
      .delete(`/todos/${todos[1]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(todos[1]._id.toHexString())
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.findById(todos[1]._id).then((todo) => {
          expect(todo).toBe(null)
          done()
        }).catch((err) => done(err))
      })
  })

  it('Should return a 404 if todo not found', (done) => {
    request(app)
      .delete(`/todos/${ new ObjectID().toHexString() }`)
      .expect(404)
      .end(done)
  })

  it('Should return a 404 if invalid id', (done) => {
    request(app)
      .delete(`/todos/123`)
      .expect(404)
      .end(done)
  })
})


describe('Update /todos/:id', () => {
  it('Should update a todo', (done) => {
    var hexId = todos[0]._id.toHexString()
    var text = 'This is an updated text'

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: true,
        text: text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text)
        expect(res.body.todo.completed).toBe(true)
        expect(res.body.todo.completedAt).toBeA('number')
      })
      .end(done)
  })

  it('Should clear completedAt when todo is not complete', (done) => {
    var hexId = todos[1]._id.toHexString()
    var text = 'This is an updated text'

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: false,
        text: text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text)
        expect(res.body.todo.completed).toBe(false)
        expect(res.body.todo.completedAt).toNotExist()
      })
      .end(done)
  })

  it('Should return a 404 if invalid id', (done) => {
    request(app)
      .delete(`/todos/123`)
      .expect(404)
      .end(done)
  })
})

describe('Get /users/me', () => {
  it('Should return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString())
        expect(res.body.email).toBe(users[0].email)
      })
      .end(done)

  })

  it('Should return 401 if not authentiated', (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({})
      })
      .end(done)
  })
})

describe('POST /users', () => {
  it('Should create a user', (done) => {
    var email = 'test1@test.com'
    var password = '123456'

    request(app)
      .post('/users')
      .send({
        email,
        password
      })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist()
        expect(res.body._id).toExist()
        expect(res.body.email).toBe(email)
      })
      .end((error) => {
        if (error) {
          return done(error)
        }

        User.findOne({
          email
        }).then((user) => {
          expect(user).toExist()
          expect(user.password).toNotBe(password)
          done()
        }).catch((e) => done(e))
      })

  })
  it('Should return validation errors if request invalid', (done) => {

    request(app)
      .post('/users')
      .send({
        email: 'test',
        password: '12356'
      })
      .expect(400)
      .end(done)
  })
  it('Should not create a user if email in use', (done) => {
    var password = '123456'

    request(app)
      .post('/users')
      .send({
        email: users[0].email,
        password
      })
      .expect(400)
      .end(done)
  })
})

describe('Post /users/login', () => {
  it('Should login user and return auth token', (done) => {

    request(app)
      .post('/users/login')
      .send({
        email:users[1].email,
        password: users[1].password
      })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist()
      })
      .end((err, res) =>{
        if(err){
          return done(err)
        }

        User.findById(users[1]._id).then((user) => {
          expect(user.tokens[0]).toInclude({
            access: 'auth',
            token: res.headers['x-auth']
          })
          done()
        }).catch((e) => done(e))
      })
  })

  it('Should reject invalid login', (done) => {
    
    request(app)
    .post('/users/login')
    .send({
      email:users[1].email,
      password: users[1].password + 'test'
    })
    .expect(400)
    .expect((res) => {
      expect(res.headers['x-auth']).toNotExist()
    })
    .end((err, res) =>{
      if(err){
        return done(err)
      }

      User.findById(users[1]._id).then((user) => {
        expect(user.tokens.length).toBe(0)
        done()
      }).catch((e) => done(e))
    })

  })
})

describe('DELETE /users/me/token', () => {
  it('Should remove auth token on logout', (done) => {
    request(app)
      .delete('/users/me/token')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .end((err, res) =>{
        if(err){
          return done(err)
        }
  
        User.findById(users[0]._id).then((user) => {
          expect(user.tokens.length).toBe(0)
          done()
        }).catch((e) => done(e))
      })
  })
})