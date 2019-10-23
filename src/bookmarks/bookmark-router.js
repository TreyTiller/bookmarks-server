const express = require('express')
const uuid = require('uuid/v4')

const bookmarkRouter = express.Router()
const bodyParser = express.json()

let bookmarkList = [
    {
        "name": "Google",
        "id": 1,
        "url": "google.com",
        "description": "Search Engine",
        "rating": 5,
    },
    {
        "name": "Facebook",
        "id": 2,
        "url": "facebook.com",
        "description": "Connect with your friends",
        "rating": 5,
    },
    {
        "name": "Twitter",
        "id": 3,
        "url": "twitter.com",
        "description": "Social Media",
        "rating": 5,
    }
]

bookmarkRouter
    .route('/bookmarks')
    .get((req, res) => {
        res.json(bookmarkList)
    })
    .post(bodyParser, (req, res) => {
        const { name, url, description, rating } = req.body

        const id = uuid()

        if (!name) {
            res.status(400).json({
                message: 'Name is required'
            }).end()
            return
        }

        if (!url) {
            res.status(400).json({
                message: 'Url is required'
            }).end()
            return
        }

        const data = { name, url, description, rating, id }

        bookmarkList.push(data)

        res.status(201).json(data)
    })

bookmarkRouter
    .route('/bookmarks/:id')
    .get((req, res) => {
        const bookmark =
            bookmarkList.find(item => item.id == req.params.id)

        if (bookmark) {
            res.json(bookmark)
        } else {
            res.status(404).end()
        }

    })
    .delete((req, res) => {
        bookmarkList =
            bookmarkList.filter(item => item.id != req.params.id)
        res.status(200).end()
    })

module.exports = bookmarkRouter