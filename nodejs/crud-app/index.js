const express = require('express');

const fs = require('fs');

const app = express();


app.get("/", (req, res) => {

    try {
        let course = fs.readFileSync("./db.json", "utf-8")
        let data = JSON.parse(course)
        console.log(data.courses)
        res.json({
            msg: "getting data",
            data
        }
        )
    } catch (error) {
        console.log(error)
    }
})





app.listen(3000, () => {
    try {
        console.log(`sever is running on PORT 3000`)
    } catch (error) {
        console.log(error)
    }
})