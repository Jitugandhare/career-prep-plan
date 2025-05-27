const fs = require('fs');

function fun(callback) {
    fs.readFile('file.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            callback(null); // Pass null if there's an error
        } else {
            callback(data); // Pass the file content back
        }
    });
}

fun((result) => {
    console.log(result);
});