const express = require('express')
const app = express()
const port = 3000;
const routes = require("./routes/routes.js");
const cors = require('cors');


app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
