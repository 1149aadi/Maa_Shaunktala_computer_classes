const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const dataDir = path.join(__dirname, 'data');
const admissionsFile = path.join(dataDir, 'admissions.json');
const contactsFile = path.join(dataDir, 'contacts.json');

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(admissionsFile)) fs.writeFileSync(admissionsFile, '[]', 'utf-8');
if (!fs.existsSync(contactsFile)) fs.writeFileSync(contactsFile, '[]', 'utf-8');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

function appendRecord(filePath, payload) {
  const existing = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  existing.push({ id: Date.now(), createdAt: new Date().toISOString(), ...payload });
  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf-8');
}

app.post('/api/admissions', (req, res) => {
  const { name, phone, course, message } = req.body;

  if (!name || !phone || !course) {
    return res.status(400).json({ ok: false, message: 'name, phone, and course are required' });
  }

  appendRecord(admissionsFile, { name, phone, course, message: message || '' });
  return res.json({ ok: true, message: 'Admission enquiry saved successfully' });
});

app.post('/api/contact', (req, res) => {
  const { name, phone, course, subject, message } = req.body;

  if (!name || !phone || !subject || !message) {
    return res.status(400).json({ ok: false, message: 'name, phone, subject, and message are required' });
  }

  appendRecord(contactsFile, { name, phone, course: course || '', subject, message });
  return res.json({ ok: true, message: 'Contact message saved successfully' });
});

app.get('/api/health', (_, res) => {
  res.json({ ok: true, service: 'maa-shakuntala-backend' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
