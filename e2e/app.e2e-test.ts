import request from 'supertest'
import server from '../src'

const TEST_IMAGE = '/app/src/tests/assets/test_images/encenadaport.jpg'

describe('Images routes', () => {
  let consoleError: any
  beforeEach(() => {
    consoleError = console.error
    console.error = jest.fn()
  })
  afterAll((done) => {
    server.close(done)
  })
  afterEach(() => {
    jest.restoreAllMocks()
    console.error = consoleError
  })
  it('should save an image', async () => {
    const response = await request(server)
      .post('/api/v1/images')
      .attach('image', TEST_IMAGE)
      .expect(200)
  })
  it('should get all images', async () => {
    const response = await request(server).get('/api/v1/images').expect(200)
    expect(Array.isArray(response.body)).toBe(true)
  })
  it('should get a resized image', async () => {
    const response = await request(server)
      .get('/api/v1/images/resize?name=encenadaport.jpg&width=300&height=200')
      .expect(200)
    expect(response).toBeDefined()
  })
  it('should return 500 if a wrong image is requested', async () => {
    const response = await request(server)
      .get('/api/v1/images/resize?name=wrong.jpg&width=300&height=200')
      .expect(500)
  })
})
