import express from 'express';
import { Book } from '../models/bookModel.js';


const router = express.Router();

// Route to save a book
router.post('/', async (req, res) => {
    try {
        const { title, author, publishYear } = req.body;
        if (!title || !author || !publishYear) {
            return res.status(400).send({
                message: "Send all required fields: title, author, publishYear"
            });
        }
        const newBook = { title, author, publishYear };
        const book = await Book.create(newBook);
        return res.status(201).send(book);

    } catch (err) {
        console.log("Books store err", err.message);
        return res.status(500).send({ message: err.message })
    }
})

//get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        // return res.status(201).send(books);
        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (err) {
        console.log("Books fetch err", err.message);
        return res.status(500).send({ message: err.message })
    }
})

//get book by id
router.get('/:id', async (req, res) => {
    try {

        let { id } = req.params;
        const book = await Book.findById(id);
        return res.status(200).json(book);
    } catch (err) {
        console.log("Book fetch by id err", err.message);
        return res.status(500).send({ message: err.message })
    }
})

//update book
router.put('/:id', async (req, res) => {
    try {
        const { title, author, publishYear } = req.body;
        if (!title || !author || !publishYear) {
            return res.status(400).send({
                message: "Send all required fields: title, author, publishYear"
            });
        }
        let { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);

        if (!result) return res.status(404).send({ message: "Book not found" });

        return res.status(200).send({ message: 'Book Updated successfully' });

    } catch (err) {
        console.log("Book fetch by id err", err.message);
        return res.status(500).send({ message: err.message })
    }
})

//delete book
router.delete('/:id', async (req, res) => {
    try {
        let { id } = req.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result) return res.status(404).send({ message: "Book not found" });

        return res.status(200).send({ message: 'Book Deleted successfully' });

    } catch (err) {
        console.log("Book fetch by id err", err.message);
        return res.status(500).send({ message: err.message })
    }
})

export default router