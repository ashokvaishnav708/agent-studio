import express, { type Request, type Response } from 'express';
import 'dotenv/config';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

app.use((err: unknown, _req: Request, res: Response, _next: express.NextFunction) => {
  if (err instanceof HttpError) return res.status(err.status).json({ error: err.message });
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
