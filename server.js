const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Item = require('./models/item');
// const path = require('path');
const app = express();
// const PORT = process.env.PORT || 3000;
const PORT = process.env.PORT || 3000;
// const PORT =  3000;

app.use(bodyParser.json());
app.use(express.static('./public'))
mongoose.connect('mongodb+srv://hplion02:TKQ2EgEoShS3eMfL@cluster0.cw8ezpr.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=>{console.log('database is connected');})
.catch(()=>{console.log(err);})



app.get('/',(req,res)=>{
  // const filePath = path.join(__dirname, 'index.html');
  res.status(201).sendFile('index.html');
})
app.post('/addItem', async (req, res) => {
  const { itemName } = req.body;

  try {
    const newItem = new Item({ name: itemName });
    await newItem.save();
    res.status(201).send(newItem);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// app.get('/addItem',(req,res)=>{
//   console.log('item is added.');
// })
app.delete('/deleteItem/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Item.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
