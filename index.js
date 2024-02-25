const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const db = require('./connection')
const response = require('./response')

app.use(bodyParser.json()) //unyuk membaca postman body

app.get('/', (req, res) => {
    // res.send("Get")
    response(200, "DATA", "MESSAGE", res)
}) //get adalah page default

app.get('/materi', (req, res) => {
    const sql = "SELECT * FROM materi"
    db.query(sql, (err,fields) => {
        if(err) throw err
        response(200, fields, "MATERI GET LIST", res)
    })
}) //get adalah page default

app.get('/materi/:id', (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM materi WHERE id = ${id}`
    db.query(sql, (err,fields) => {  
        if(err) throw err
        response(200, fields, "GET SPESIFIC MATERI", res)
    })
    
}) //Spesifik Mahasiswa

app.post('/materi', (req, res) => {
    const { image, judul_materi, body } = req.body
    console.log(req.body)
    const sql = `INSERT INTO materi (image, judul_materi, body) VALUES ('${image}', '${judul_materi}', '${body}')`
    
    db.query(sql, (err,fields) => {
        // if(err) throw err
        if(err) response(500, "INVALID", "ERROR", res)
        if(fields?.affectedRows) {
            const data = {
                id: fields.insertId,
                isSuccess: fields.affectedRows
            }
            response(200, data, "ADD MATERI SUCCESS", res)
        }
    })
})

app.put('/materi', (req, res) => {
    const { image, judul_materi, body } = req.body
    const sql = `UPDATE materi SET image = '${image}', 
    judul_materi = '${judul_materi}', 
    body = '${body}'`
    
    db.query(sql, (err,fields) => {
        if(err) response(500, "Invalid", "error", res)
        if(fields?.affectedRows){
            const data = {
                isSuccess: fields.affectedRows,
                message: fields.message
            }
        response(200, data, "Update data PUT",res)
        }else {
            response(404, data, "NOT FOUND ", "ERROR",res)
        }
    })
})

app.delete('/materi', (req, res) => {
    const { id } = req.body
    const sql = `DELETE FROM materi WHERE id = ${id}`
    db.query(sql, (err,fields) => {
        if(err) response(500, "invalid", "error", res)
        if(fields?.affectedRows){
            const data = {
                isDelete: fields.affectedRows
            }
        response(200, data, "DELETE SUCCESS", res)
        }
    })
}) 


app.listen(port, () => {
    console.log(`Running now on http://localhost:${port}`)
})