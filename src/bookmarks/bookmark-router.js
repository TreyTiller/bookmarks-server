const express = require('express')
const uuid = require('uuid/v4')

const bookmarkRouter = express.Router()
const bodyParser = express.json()

let bookmarkList = [
    {
        "name": "Google",
        "id": 1
    },
    {
        "name": "Facebook",
        "id": 2
    },
    {
        "name": "Twitter",
        "id": 3
    }
]

bookmarkRouter
    .route('/bookmarks')
    .get((req, res) => {
        res.json(bookmarkList)
    })
    .post(bodyParser, (req, res) => {
        const data = req.body
        
        if(!data.name) {
            res.status(400).end()
            return
        }
        
        bookmarkList.push(data)
        res.status(201).json(data)
    })

bookmarkRouter
    .route('/bookmarks/:id')
    .get((req, res) => {
            const bookmark = 
                bookmarkList.find(item => item.id == req.params.id)
        
            if(bookmark){
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