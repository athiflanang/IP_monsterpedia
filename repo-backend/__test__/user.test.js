const request = require('supertest')
const app = require('../app')
const { signToken } = require('../helper/jwt')
const { passwordHash } = require('../helper/bcrypt')
const { sequelize } = require('../models')

let access_token
beforeAll(async () => {
  const seedUser = require('../data/DataUser.json')
  seedUser.forEach(el => {
    el.password = passwordHash(el.password)
    el.updatedAt = el.createdAt = new Date()
  })

  sequelize.queryInterface.bulkInsert('Users', seedUser, {})

  const payload = {
    id: 1,
    username: "User1",
    email: "user1@mail.com",
    password: "user1"
  }

  access_token = signToken(payload)
})

afterAll(async () => {
  sequelize.queryInterface.bulkDelete('Users', null, { truncate: true, cascade: true, restartIdentity: true })
})

describe('POST /login', () => {
  //login normal
  describe('POST /login - succeed', () => {
    it('should return a message attach', async () => {
      const body = { username: "User1", email: 'user1@mail.com', password: "user1" }
      const response = await request(app).post('/login').send(body)

      expect(response.status).toBe(200)
      expect(response.body).toBeInstanceOf(Object)
      expect(response.body).toHaveProperty('access_token', expect.any(String))
    })
  })

  //login error - missing email
  describe('POST /login - fail', () => {
    it('should return an error attach', async () => {
      const body = { username: "User1", email: "", password: "user1" }
      const response = await request(app).post('/login').send(body)

      expect(response.status).toBe(401)
      expect(response.body).toBeInstanceOf(Object)
      expect(response.body).toHaveProperty('message', expect.any(String))
    })
  })

  //login error - missing password
  describe('POST /login - fail', () => {
    it('should return an error attach', async () => {
      const body = { username: "User1", email: "user1@mail.com", password: "" }
      const response = await request(app).post('/login').send(body)

      expect(response.status).toBe(401)
      expect(response.body).toBeInstanceOf(Object)
      expect(response.body).toHaveProperty('message', expect.any(String))
    })
  })

  //login error - invalid email
  describe('POST /login - fail', () => {
    it('should return an error attach', async () => {
      const body = { username: "User1", email: "dummy@mail.com", password: "user1" }
      const response = await request(app).post('/login').send(body)

      expect(response.status).toBe(401)
      expect(response.body).toBeInstanceOf(Object)
      expect(response.body).toHaveProperty('message', expect.any(String))
    })
  })

  //login error - invalid password
  describe('POST /login - fail', () => {
    it('should return an error attach', async () => {
      const body = { username: "User1", email: "user1@mail.com", password: "dummy_password" }
      const response = await request(app).post('/login').send(body)

      expect(response.status).toBe(401)
      expect(response.body).toBeInstanceOf(Object)
      expect(response.body).toHaveProperty('message', expect.any(String))
    })
  })
})