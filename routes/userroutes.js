const routes = require('express').Router()
const controllers = require('../controllers/usercontroller')
const authMiddleware = require('../middlewares/valiadationMiddleware')

routes.post('/register', controllers.adduser)
routes.post('/login', controllers.login)


routes.post('/add-review/:review', authMiddleware, controllers.addReview)
routes.post('/update-review/:review', authMiddleware, controllers.updateReview)
routes.post('/delete-review', controllers.deleteReview)


module.exports = routes