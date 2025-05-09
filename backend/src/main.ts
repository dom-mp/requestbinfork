import express from 'express';
import mockRouter from './routes/mockBasket';
const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/mockBaskets', mockRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});