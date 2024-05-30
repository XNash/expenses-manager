import express, {response} from "express"
import fs from "fs"
import bodyParser from "body-parser"

const app = express()
app.use(bodyParser.json())

const port = 3000
const jsonFilePath = "data.json"

const checkFile = () => {
    if(!fs.existsSync(jsonFilePath)) {
        fs.writeFileSync(jsonFilePath, "[]")
    }
}

const readFileData = () => {
    checkFile()
    let data = fs.readFileSync(jsonFilePath)
    return JSON.parse(data.toString())
}

const writeData = (data) => {
    checkFile()
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2))
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

// POST

app.post("/expenses", (req, res) => {
    const expenses = readFileData()
    expenses.push(req.body)
    writeData(expenses)
    res.json(req.body)
})

// PUT

app.put("/expenses/:id", (req, res) => {
    const id = req.params.id
    const expense = readFileData().find(x => x.id === id)
    res.json(expense)
})

// DELETE

app.delete("/expenses/:id", (req, res) => {
    const id = req.params.id
    const expenses = readFileData()
    expenses.splice(expenses.indexOf(id), 1)
    writeData(expenses)
    res.json(expenses)
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})