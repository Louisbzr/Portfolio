require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const { Resend } = require('resend');

const app = express();
const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: 'Portfolio Louis API — Online ✓', status: 'ok' });
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || name.length < 2 || name.length > 100) {
    return res.status(400).json({ error: 'Nom invalide (2-100 caractères)' });
  }
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Email invalide' });
  }
  if (!message || message.length < 10 || message.length > 2000) {
    return res.status(400).json({ error: 'Message invalide (10-2000 caractères)' });
  }

  try {
    console.log('Sauvegarde en base...')
    const contact = await prisma.contact.create({
      data: { name, email, message },
    });
    console.log('Contact créé:', contact);

    console.log('Envoi email Resend...');
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.GMAIL_USER,
      subject: `📬 Nouveau message de ${name}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message :</strong></p>
        <blockquote style="border-left: 3px solid #ccc; padding-left: 12px; color: #555;">
          ${message.replace(/\n/g, '<br/>')}
        </blockquote>
        <hr/>
        <small>Reçu le ${new Date().toLocaleString('fr-FR')} — Portfolio Louis</small>
      `,
    });
    console.log('Résultat Resend:', result);
    
    res.status(201).json(contact);
  } catch (err) {
    console.error('Erreur /api/contact :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.get('/api/contact', async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(contacts);
  } catch (err) {
    console.error('Erreur GET /api/contact :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.patch('/api/contact/:id/read', async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await prisma.contact.update({
      where: { id },
      data: { read: true },
    });
    res.json({ status: 'ok', contact });
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Message introuvable' });
    }
    console.error('Erreur PATCH /api/contact :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});

process.on('beforeExit', async () => {
  await prisma.$disconnect();
});