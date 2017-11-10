let express = require('express');
const open = require("open");
const bodyParser = require("body-parser");

const port = process.env.port || 3001;
const router = express.Router();
let app = express();

let nextID = 12;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use("/", router);


app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        open(`http://localhost:${port}/books`);
    }
});

//mock data
const books = [
    {
        id: 1,
        isbn: "0-7475-3269-9",
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K.Rowling",
        num_pages: 223
    },
    {
        id: 2,
        isbn: "0-7475-3849-2",
        title: "Harry Potter and the Chamber of Secrets",
        author: "J.K.Rowling",
        num_pages: 251
    },
    {
        id: 3,
        isbn: "0-7475-4215-5",
        title: "Harry Potter and the Prisoner of Azkaban",
        author: "J.K.Rowling",
        num_pages: 317
    },
    {
        id: 4,
        isbn: "0-7475-4624-X",
        title: "Harry Potter and the Goblet of Fire",
        author: "J.K.Rowling",
        num_pages: 636
    },
    {
        id: 5,
        isbn: "0-7475-5100-6",
        title: "Harry Potter and the Order of the Phoenix",
        author: "J.K.Rowling",
        num_pages: 766
    },
    {
        id: 6,
        isbn: "0-7475-8108-8",
        title: "Harry Potter and the Half-Blood Prince",
        author: "J.K.Rowling",
        num_pages: 607
    },
    {
        id: 7,
        isbn: "0-545-01022-5",
        title: "Harry Potter and the Deathly Hallows",
        author: "J.K.Rowling",
        num_pages: 607
    },
    {
        id: 8,
        isbn: "0007350821",
        title: "Alice's Adventures in Wonderland",
        author: "Lewis Carroll",
        num_pages: 200
    },
    {
        id: 9,
        isbn: "0141346426",
        title: "The BFG",
        author: "Roald Dahl",
        num_pages: 208
    },
    {
        id: 10,
        isbn: "0141393041",
        title: "1984",
        author: "George Orwell",
        num_pages: 268
    },
    {
        id: 11,
        isbn: "1534962859",
        title: "Frankenstein",
        author: "Mary Shelley",
        num_pages: 280
    }
]

router.get("/books", (req, res) => {
    res.json(books);
});

router.get("/book/:id", (req, res) => {
    const bookID = req.params.id;
    const thisBook = books.find((book) => book.id == bookID);
    if (thisBook) {
        res.json(thisBook);
    }
    else {
        res.sendStatus(404);
    }
});
router.post("/book/", (req, res) => {
    const postBook = req.body;
    const isValid = isValidBook(postBook) && !books.find((a) => a.isbn == postBook.isbn);
    if (isValid) {
        postBook.id = nextID;
        nextID++;
        books.push(postBook);
        res.send(postBook);
    }
    else {
        res.sendStatus(500);
    }
});

router.put("/book/:id", (req, res) => {
    const bookID = req.params.id;
    const currentBook = books.find((book) => book.id == bookID);
    if (currentBook) {
        const putBook = req.body;
        const isValid = isValidBook(putBook);
        if (isValid) {            
            currentBook.title = putBook.title;
            currentBook.author = putBook.author;
            currentBook.num_pages = putBook.num_pages;
            res.sendStatus(204);
        }
        else { res.sendStatus(404); }
    }
});

router.delete("/book/:id", (req, res) => {
    const bookID = req.params.id;
    const currentBook = books.findIndex((book) => book.id == bookID);
    if (currentBook !== -1) {
        books.splice(currentBook, 1);
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
});

function isValidBook(book) {
    if (Object.keys(book).length === 5) {
        if (book.isbn && book.title && book.author && parseInt(book.num_pages)) {
            return true;
        }
    } else {
        return false;
    }
}