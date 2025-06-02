import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { sequelize, ProcessedFolder } from './models/index.js';
import { runFilebot } from './services/filebot.js';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// ✅ Docker-safe CORS: Allow all origins (Docker internal use only)
app.use(cors({
  origin: '*',        // Accept any origin inside the Docker network
  methods: ['GET', 'POST'],
  credentials: false  // Set to true only if you use cookies or auth headers
}));

// 🔐 Basic Auth Middleware
const basicAuth = (req, res, next) => {
  const auth = req.headers.authorization;
  const [expectedUser, expectedPass] = ["admin", "changeme"];

  if (!auth || !auth.startsWith('Basic ')) {
    res.set('WWW-Authenticate', 'Basic realm="FileBot Manager"');
    return res.status(401).send('Authentication required');
  }

  const [user, pass] = Buffer.from(auth.split(' ')[1], 'base64').toString().split(':');
  if (user !== expectedUser || pass !== expectedPass) {
    return res.status(403).send('Forbidden');
  }

  next();
};

app.use(basicAuth);
app.use(express.json());

// 📁 API: List folders
app.get('/api/folders', async (req, res) => {
  try {
    const entries = fs.readdirSync('/rd', { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name);

    const processed = await ProcessedFolder.findAll();
    const processedNames = processed.map(p => p.folderName);

    const result = entries.map(name => ({
      name,
      status: processedNames.includes(name) ? 'processed' : 'unprocessed'
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to read /rd' });
  }
});

// 🚀 API: Trigger processing
app.post('/api/process', async (req, res) => {
  const { folderName, type } = req.body;

  if (!folderName || !['movie', 'series'].includes(type)) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  try {
    const existing = await ProcessedFolder.findOne({ where: { folderName } });
    if (existing) {
      return res.status(409).json({ error: 'Already processed' });
    }

    const inputPath = path.join('/rd', folderName);
    const outputPath = type === 'movie' ? '/movies' : '/series';

    const result = await runFilebot(inputPath, outputPath, type);

    await ProcessedFolder.create({
      folderName,
      type,
      success: result.success,
      log: result.log
    });

    res.json({ message: 'Processed', result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Processing failed' });
  }
});

// 📦 Initialize DB and start server
(async () => {
  try {
    await sequelize.sync();
    app.listen(port, () => {
      console.log(`Backend running on port ${port}`);
    });
  } catch (err) {
    console.error('DB Init Error:', err);
  }
})();
