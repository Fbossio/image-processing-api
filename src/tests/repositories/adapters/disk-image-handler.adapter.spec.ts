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

  describe('getImagesList', () => {
    it('should return a list of images', async () => {
      const mockFiles = ['test1.jpg', 'test2.jpg', 'test3.jpg']

      spyOn(fs, 'readdir' as any).and.callFake(
        (path: any, callback: (arg0: null, arg1: string[]) => void) => {
          callback(null, mockFiles)
        },
      )

      const result = await diskImageHandler.getImagesList()

      expect(result).toEqual(mockFiles)
    })

    it('should throw an error if there is a problem reading the directory', async () => {
      const mockError = new Error('Test error')

      spyOn(fs, 'readdir' as any).and.callFake(
        (path: any, callback: (arg0: Error, arg1: null) => void) => {
          callback(mockError, null)
        },
      )

      try {
        await diskImageHandler.getImagesList()
        fail('Expected error to be thrown')
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).toBe(
            `Error retrieving files: ${mockError.message}`,
          )
        }
      }
    })
  })

  describe('getImage', () => {
    it('should return a thumbnail if the image already exists', async () => {
      const mockName = 'test.jpg'
      const mockWidth = 100
      const mockHeight = 100
      const mockPath = `full/${mockName}`
      const mockThumbName = `${mockWidth}x${mockHeight}_${mockName}`
      const mockThumbPath = `thumb/${mockThumbName}`
      const mockHost = 'example.com'
      const mockProtocol = 'https'

      when(mockReq.query).thenReturn({
        name: mockName,
        width: mockWidth,
        height: mockHeight,
      } as any)
      when(mockReq.get('host')).thenReturn(mockHost)
      when(mockReq.protocol).thenReturn(mockProtocol)

      spyOn(fs.promises, 'writeFile').and.returnValue(Promise.resolve())
      spyOn(fs.promises, 'readFile').and.returnValue(
        Promise.resolve('test data'),
      )
      spyOn(fs, 'existsSync').and.returnValue(true)

      const result = await diskImageHandler.getImage(instance(mockReq))

      expect(result).toBe(`${mockProtocol}://${mockHost}/${mockThumbPath}`)
    })

    it('should return a thumb image if the thumbnail does not exist', async () => {
      const mockName = 'test.jpg'
      const mockWidth = 100
      const mockHeight = 100
      const mockPath = `full/${mockName}`
      const mockThumbName = `${mockWidth}x${mockHeight}_${mockName}`
      const mockThumbPath = `thumb/${mockThumbName}`
      const mockHost = 'example.com'
      const mockProtocol = 'https'

      when(mockReq.query).thenReturn({
        name: mockName,
        width: mockWidth,
        height: mockHeight,
      } as any)
      when(mockReq.get('host')).thenReturn(mockHost)
      when(mockReq.protocol).thenReturn(mockProtocol)

      spyOn(fs.promises, 'writeFile').and.returnValue(Promise.resolve())
      spyOn(fs.promises, 'readFile').and.returnValue(
        Promise.resolve('test data'),
      )
      spyOn(fs, 'existsSync').and.returnValue(true)

      const result = await diskImageHandler.getImage(instance(mockReq))

      expect(result).toBe(`${mockProtocol}://${mockHost}/${mockThumbPath}`)
    })

    it('should return an error if the image does not exist', async () => {
      const mockName = 'test.jpg'
      const mockWidth = 100
      const mockHeight = 100
      const mockPath = `full/${mockName}`
      const mockThumbName = `${mockWidth}x${mockHeight}_${mockName}`
      const mockThumbPath = `thumb/${mockThumbName}`
      const mockHost = 'example.com'
      const mockProtocol = 'https'

      when(mockReq.query).thenReturn({
        name: mockName,
        width: mockWidth,
        height: mockHeight,
      } as any)
      when(mockReq.get('host')).thenReturn(mockHost)
      when(mockReq.protocol).thenReturn(mockProtocol)

      spyOn(fs.promises, 'writeFile').and.returnValue(Promise.resolve())
      spyOn(fs.promises, 'readFile').and.returnValue(
        Promise.resolve('test data'),
      )
      spyOn(fs, 'existsSync').and.returnValue(false)

      try {
        await diskImageHandler.getImage(instance(mockReq))
        fail('Expected error to be thrown')
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).toBe('Image not found')
        }
      }
    })
  })
})
