import { type Request } from 'express'
import fs from 'fs'
import 'reflect-metadata'
import { instance, mock, when } from 'ts-mockito'
import { DiskImageHandlerAdapter } from '../../../repositories/adapters/disk-image-handler.adapeter'

describe('DiskImageHandlerAdapter', () => {
  let diskImageHandler: DiskImageHandlerAdapter
  let mockFs: typeof fs.promises
  let mockReq: Request

  beforeEach(() => {
    mockFs = mock<typeof fs.promises>()
    mockReq = mock<Request>()

    diskImageHandler = new DiskImageHandlerAdapter()
  })

  afterEach(() => {
    if (jasmine.isSpy(fs.promises.writeFile)) {
      ;(fs.promises.writeFile as jasmine.Spy).and.callThrough()
    }
  })

  describe('saveImage', () => {
    it('should throw an error if no file is uploaded', async () => {
      when(mockReq.file).thenReturn(undefined)

      try {
        await diskImageHandler.saveImage(instance(mockReq))
        fail('Expected error to be thrown')
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).toBe('No file uploaded')
        }
      }
    })

    it('should save the image file to disk when a file is provided', async () => {
      const mockFile = {
        originalname: ' Test File.jpg ',
        buffer: Buffer.from('test data'),
      }
      const mockHost = 'example.com'
      const mockProtocol = 'https'
      const formattedName = 'test-file.jpg'

      when(mockReq.file).thenReturn(mockFile as any)
      when(mockReq.get('host')).thenReturn(mockHost)
      when(mockReq.protocol).thenReturn(mockProtocol)

      spyOn(fs.promises, 'writeFile').and.returnValue(Promise.resolve())

      await diskImageHandler.saveImage(instance(mockReq))

      expect(fs.promises.writeFile).toHaveBeenCalledWith(
        jasmine.any(String),
        mockFile.buffer,
      )
    })

    it('should return a correctly formatted URL when the file is saved successfully', async () => {
      const mockFile = {
        originalname: ' Test File.jpg ',
        buffer: Buffer.from('test data'),
      }
      const mockHost = 'example.com'
      const mockProtocol = 'https'
      const formattedName = 'test-file.jpg'

      spyOn(fs.promises, 'writeFile').and.returnValue(Promise.resolve())

      when(mockReq.file).thenReturn(mockFile as any)
      when(mockReq.get('host')).thenReturn(mockHost)
      when(mockReq.protocol).thenReturn(mockProtocol)

      const result = await diskImageHandler.saveImage(instance(mockReq))

      expect(result).toBe(`${mockProtocol}://${mockHost}/full/${formattedName}`)
    })
  })
})
