import { type Request, type Response } from 'express'
import { instance, mock, verify, when } from 'ts-mockito'
import ImagesController from '../../controllers/images.controller'
import ImagesService from '../../services/images.service'

describe('ImagesController', () => {
  let mockImagesService: ImagesService
  let mockReq: Request
  let mockRes: Response
  let imagesController: ImagesController

  beforeEach(() => {
    mockImagesService = mock(ImagesService)
    mockReq = mock<Request>()
    mockRes = mock<Response>()
    imagesController = new ImagesController(instance(mockImagesService))
  })
  it('should save the image and return the result', async () => {
    const testResult = 'test-url'
    when(mockImagesService.saveImage(instance(mockReq))).thenResolve(testResult)

    await imagesController.saveImage(instance(mockReq), instance(mockRes))

    verify(mockImagesService.saveImage(instance(mockReq))).once()
    verify(mockRes.send(testResult)).once()
  })

  it('should get all images and return the result', async () => {
    const testResult = ['test-url']
    when(mockImagesService.getImages()).thenResolve(testResult)

    await imagesController.getImages(instance(mockReq), instance(mockRes))

    verify(mockImagesService.getImages()).once()
    verify(mockRes.send(testResult)).once()
  })
})
