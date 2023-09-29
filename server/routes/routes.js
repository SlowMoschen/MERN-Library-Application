const express = require('express')
const APIRoute = express.Router()

const Book = require('../models/bookSchema')

// GET - Route to get all Books from Database
APIRoute.get('/', async (req, res) => {
    try {
        const allBooks = await Book.find()
        res.status(200).json(allBooks)
    } catch (error) {
        res.status(500).send({ ErrorMessage: error.message })
    }
})

// GET - Route to get a specific Book
APIRoute.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        res.status(200).json(book)
    } catch (error) {
        res.status(404).send({ message: 'Could not find Book', ErrorMessage: error.message })
    }
})

// POST - Route to add a new Book to the Database
APIRoute.post('/', async (req, res) => {
    try {
        const newBook = await Book.create(req.body)
        res.status(201).json(newBook)
    } catch (error) {
        res.status(500).send({ ErrorMessage: error.message })
    }
})

// PATCH - Edit Data for an existing Book
APIRoute.patch('/:id', async (req, res) => {
    try {
        const editedBook = await Book.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(editedBook)
    } catch (error) {
        res.status(500).send({ ErrorMessage: error.message })
    }
})

// DELETE - Delete a Book
APIRoute.delete('/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndRemove(req.params.id)
        res.status(200).json(deletedBook)
    } catch (error) {
        res.status(500).send({ ErrorMessage: error.message })
    }
})

// DELETE - Route to delete all Entries - will be called every 24H - for Testcase to keep DB clean
APIRoute.delete('/', async (req, res) => {
    try {
        const deleteAllBooks = await Book.deleteMany({})
        res.status(200).json(deleteAllBooks)
    } catch (error) {
        res.status(500).send({ ErrorMessage: error.message })
    }
})

module.exports = APIRoute