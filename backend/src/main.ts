import express from 'express';
import mockApiRouter from './routes/mockApi';
import apiRouter from './routes/api';
const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/mockApi', mockApiRouter);
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});