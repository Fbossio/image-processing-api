import { Container } from 'typedi'
import { DiskImageHandlerAdapter } from '../repositories/adapters/disk-image-handler.adapeter'

export const initializeLoaders = () => {
  Container.set('ImageHandler', new DiskImageHandlerAdapter())
}
