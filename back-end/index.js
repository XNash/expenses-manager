import express, {response} from "express"
import fs from "fs"
import bodyParser from "body-parser"

const app = express()
app.use(bodyParser.json())

const port = 3000
const jsonFilePath = "data.json"

const checkFile = () => {
    if(!fs.existsSync(jsonFilePath)) {
        fs.writeFileSync(filePath, "[]")
    }
}

const readFileData = () => {
    checkFile()
    let data = fs.readFileSync(jsonFilePath)
    return JSON.parse(data.toString())
}

const writeData = (data) => {
    checkFile()
    fs.writeFileSync(jsonFilePath, data)
}

// GET

app.get("/", (req, res) => {
    res.json(readFileData(jsonFilePath))
})

app.get("/expenses", (req, res, next) => {
    res.json(readFileData(jsonFilePath))
})

app.get("/expenses/:id", (req, res, next) => {
    const expenses = readFileData(jsonFilePath)
    const id = expenses.findIndex((x) => x.id === req.params.id)
    res.json(expenses[id])
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})