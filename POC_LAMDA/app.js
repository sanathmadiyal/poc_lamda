const { insertOne, insertMany, findOne } = require('./dataService/dbHandler');
const clientRouter = require("./routes/index")
var serverRouter = require('./models/index');
var cors = require('cors');

var express = require("express");
var app = express();
const port = 3000

app.post('/add-user', async (request, response) => {
    const employeeData = {
        name: 'John Doe',
        age: 30,
        department: 'IT'
      };
    
      try {
        const insertedId = await insertOne(employeeData);
        console.log('Employee created with ID:', insertedId);
      } catch (error) {
        console.error('Error creating employee:', error);
      }
});

app.use(cors());

app.use('/PricepredictionService', clientRouter);
app.use('/test', serverRouter);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
