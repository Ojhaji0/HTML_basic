const fs = require('fs');

fs.writeFile("./data/my_intro.txt", "my name is Ayush ojha i am pursuing B.Tech AI from Amity University Lucknow ", (err, data) => {
    if(err) throw err;
    console.log("File created successfully");

fs.readFile("./data/my_intro.txt", "utf-8", (err, data) => {
    if(err) throw err;
    console.log(data);

    });

});