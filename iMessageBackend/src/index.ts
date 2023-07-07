import express from 'express';
import { PrismaClient } from '@prisma/client';
import { StreamChat } from 'stream-chat';

const { STREAM_API_KEY = '', STREAM_API_SECRET } = process.env;
const client = StreamChat.getInstance(STREAM_API_KEY, STREAM_API_SECRET);

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.post('/login', async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: 'Username is missing' });
  }

  const user = await prisma.user.upsert({
    where: { username },
    create: {
      username,
      name: username,
    },
    update: {
      username,
    },
  });

  return res.json({
    ...user,
    streamToken: client.createToken(user.id.toString()),
  });
});

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();

  return res.json(users);
});

app.listen(3000, () => {
  console.log(`Server ready at: http://localhost:3000`);
});
