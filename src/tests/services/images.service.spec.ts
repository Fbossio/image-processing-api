import { type Request } from 'express'
import 'reflect-metadata'
import { instance, mock, verify } from 'ts-mockito'
import { type ImageHandler } from '../../repositories/ports/image-handler'
import ImagesService from '../../services/images.service'

describe('ImagesService', () => {
  let imageHandlerMock: ImageHandler
  let imagesService: ImagesService

  beforeEach(() => {
    imageHandlerMock = mock<ImageHandler>()
    imagesService = new ImagesService(instance(imageHandlerMock))
  })

  describe('saveImage', () => {
    it('should save the image using imageHandler', async () => {
      const mockRequest: Partial<Request> = {}
      await imagesService.saveImage(mockRequest as Request)
      verify(imageHandlerMock.saveImage(mockRequest as Request)).once()
    })
  })
})
