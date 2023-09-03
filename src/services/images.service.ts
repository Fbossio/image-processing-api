import { Service } from 'typedi'

@Service()
export default class ImagesService {
  public async getImages() {
    return 'Sending images!'
  }

  public async saveImages() {
    return 'Saving images!'
  }
}
