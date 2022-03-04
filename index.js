const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const errorMidleware = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const allowlist = [
  'http://localhost:8080',
  'http://localhost:8081',
  'https://myapp.co'
];
const options = {
  origin: (origin, callback) => {
    if (allowlist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get(
  '/nueva-ruta',
  (req, res) => {
    console.log("/nueva-ruta")
    res.send('Hola, soy una nueva ruta');
  }
);

app.post("/beacon-test", (req, res) => {
  console.log("/beacon-test")
  res.send('Beacon');
})

routerApi(app);

app.use(errorMidleware.logErrors);
app.use(errorMidleware.ormErrorHandler);
app.use(errorMidleware.boomErrorHandler);
app.use(errorMidleware.errorHandler);

app.listen(port, () => {
  console.log('My port: ' +  port);
});
