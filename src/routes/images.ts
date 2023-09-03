import Router from 'express'
import Container from 'typedi'
import ImagesController from '../controllers/images.controller'

const router = Router()
const imagesController = Container.get(ImagesController)

router.get('/dimension', (req, res, next) => {
  imagesController.getImages(req, res).catch(next)
})

export default router
