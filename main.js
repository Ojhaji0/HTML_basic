const fs = require('fs');
const express = require('express');
const app = express();

const islogin = true;

function isUserLogin(req, res, next) {
    if (!islogin) {
        return res.status(401).send("User is not logged in");
    }
    next();
}

app.use(express.json());


app.get("/", (req, res) => {
    res.status(200).send("Base url is called");
});


const items = [
    { id: 1, name: "pen", price: 10 },
    { id: 2, name: "book", price: 100 },
    { id: 3, name: "bag", price: 500 }
];


app.get("/item/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (id > items.length || id <= 0) {
        return res.status(400).send(`Item id ${id} is not valid`);
    } else {
        return res.status(200).send(items[id - 1]);
    }
});


app.get("/item", (req, res) => {
    const name = req.query.name;
    if (name) {
        const filteredItems = items.filter(item => item.name.toLowerCase() === name.toLowerCase());
        if (filteredItems.length > 0) {
            return res.status(200).send(`Here is the item: ${JSON.stringify(filteredItems)}`);
        } else {
            return res.status(404).send(`No items found for name ${name}`);
        }
    } else {
        res.status(200).send("My name is Ayush");
    }
});

app.get("/file", isUserLogin, (req, res) => {
    fs.readFile('data.txt', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send("Error reading file data");
        } else {
            res.status(200).send(data);
        }
    });
});


app.post("/item", (req, res) => {
    fs.writeFile('data.txt', 'This file is created using fs module', (err) => {
        if (err) {
            res.status(500).send("Error occurred while creating file");
        } else {
            res.status(201).send("Item file is created!");
        }
    });
});


app.put("/item", (req, res) => {
    fs.appendFile('data.txt', ' This is updated content', (err) => {
        if (err) {
            res.status(500).send("Error occurred while updating file");
        } else {
            res.status(200).send("Item file is updated!");
        }
    });
});


app.delete("/item", (req, res) => {
    fs.unlink('data.txt', (err) => {
        if (err) {
            res.status(500).send("Error occurred while deleting file");
        } else {
            res.status(200).send("Item file is deleted!");
        }
    });
});


app.listen(4000, () => {
    console.log("Server is running at 4000");
});
