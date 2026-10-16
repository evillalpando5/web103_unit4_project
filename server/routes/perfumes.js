import express from 'express'
import perfumesRouter  from '../controllers/perfumes.js'

const router = express.Router()

router.get('/', perfumesRouter.getAllCustomPerfumes)
router.get('/:id', perfumesRouter.getCustomPerfume)
router.post('/', perfumesRouter.createCustomPerfume)
router.patch('/:id', perfumesRouter.updateCustomPerfume)
router.delete('/:id', perfumesRouter.deleteCustomPerfume)

export default router