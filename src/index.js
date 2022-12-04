const app = require('./app');

const port = 5678;

app.listen(port, () => {
  console.log(`Server: http://localhost:${port}`);
});