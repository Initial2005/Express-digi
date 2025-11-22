
import 'dotenv/config'
import express from 'express'

const app = express();

const port = process.env.PORT || 3000;
app.use(express.json())

let teaData = []
let nextId = 1

//add a new tea
app.post('/teas',(req,res)=>{
    const {name,course} = req.body;
    const newTea = {id: nextId++, name, course};
    teaData.push(newTea);
    res.status(201).send(newTea)
})

//get all tea
app.get('/teas',(req,res)=>{
    res.status(200).send(teaData)
})

//get a tea with id
app.get('/teas/:id', (req,res)=>{
    const tea = teaData.find(t=>t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('Tea not found')
    }
    res.status(200).send(tea)
})



app.put('/teas/:id', (req,res)=>{
    const tea = teaData.find(t=>t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('Tea not found')
    }
    tea.name = name;
    tea.course = course
    res.send(200).send(tea)
})

//delete a tea
app.delete('/teas/:id',(req,res)=>{
    const index = teaData.findIndex(t=>t.id===parseInt(req.params.id))
    if (index === -1) {
        return res.status(404).send('tea not found')
    }
    teaData.splice(index,1)
    return res.status(204).send('deleted')
})


app.listen(port, ()=>{
    console.log(`Server is listening at port: ${port}...`)
})