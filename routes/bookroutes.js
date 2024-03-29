const routes = require('express').Router()
const controllers = require('../controllers/bookcontroller')



routes.post('/add-books', controllers.addBooks)
routes.post('/get-all-available-books', controllers.getAllBookList)
routes.post('/get-by-isbn/:isbn', controllers.getBookByISBN)
routes.get('/get-by-title/:title', controllers.getBookByTitle)
routes.get('/get-by-auther/:auther', controllers.getBookByAuther)
routes.post('/get-by-review/:review', controllers.getBooksByReview)

module.exports = routes
