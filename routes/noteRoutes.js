const router = require('express').Router()
const path = require('path')
const fs = require('fs')

router.get('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'data', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }
    res.json(JSON.parse(data))
  })
})

router.post('/api/notes', (req, res) => {
  const item = req.body
  fs.readFile(path.join(__dirname, '..', 'data', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }
    const items = JSON.parse(data)
    items.push(item)
    fs.writeFile(path.join(__dirname, '..', 'data', 'db.json'), JSON.stringify(items), err => {
      if (err) { console.log(err) }
      res.sendStatus(200)
    })
  })
})

router.delete('/remove', (req, res) => {
  const items = req.body
  console.log(req.body)
  fs.writeFile(path.join(__dirname, '..', 'data', 'db.json'), JSON.stringify(items), err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

module.exports = router
