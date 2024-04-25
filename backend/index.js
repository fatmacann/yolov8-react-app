const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const mysql = require('mysql');
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'qwe123',
  database: 'object_detection'
});

app.get('/', (req, res) => {
    res.json({ message: 'API is working' });
  });

app.post('/save-detections', (req, res) => {
  const data = req.body;

    const { classes } = data;
    pool.query('INSERT INTO detections (object_name) VALUES (?)', [classes[0]], (error, results) => {
      if (error) throw error;
    })
});

app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});

app.get('/get-detections', (req, res) => {
  pool.query('SELECT * FROM detections', (error, results) => {
    if (error) {
      console.error('Bir hata oluştu:', error);
      res.status(500).json({ error: 'Veritabanından veri çekilirken bir hata oluştu.' });
    } else {
      res.json(results);
    }
  });
});

app.get('/get-detections', (req, res) => {
  pool.query('SELECT * FROM detections', (error, results) => {
    if (error) {
      console.error('Bir hata oluştu:', error);
      res.status(500).json({ error: 'Veritabanından veri çekilirken bir hata oluştu.' });
    } else {
      res.json(results);
    }
  });
});


