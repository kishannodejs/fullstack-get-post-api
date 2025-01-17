const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001; 

app.use(bodyParser.json());
app.use(cors());

let todos = [
    { id: 1, title: 'Task 1' },
    { id: 2, title: 'Task 2' },
  ];
  
  app.get('/api/data', (req, res) => {
    res.json(todos);
  });

app.post('/api/data', (req, res) => {
  const receivedData = req.body; 
  console.log('Received Data:', receivedData);
  
  res.json({ message: 'Data received successfully!', data:receivedData  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});