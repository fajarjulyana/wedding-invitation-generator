const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

const invitations = {};  // Menyimpan data undangan berdasarkan nama pasangan

// Setup folder untuk menyimpan foto yang di-upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { files: 7 }  // Maksimal 7 file
});

// Middleware untuk parsing data form
app.use(express.urlencoded({ extended: true }));

// Menyajikan file statis dari folder 'public'
app.use(express.static('public'));

// Route untuk menampilkan form (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Menangani form submission dan membuat link sesuai nama pasangan
app.post('/generate', upload.array('preWeddingPhotos', 7), (req, res) => {
  const { coupleName, weddingDate, weddingTime, weddingLocation, rsvpDate, design } = req.body;
  const photos = req.files;

  if (!photos || photos.length === 0) {
    return res.send('<p>Harap unggah setidaknya satu foto.</p>');
  }

  // Membuat slug dari nama pasangan untuk URL
  const slug = coupleName.toLowerCase().replace(/\s+/g, '-');

  // Simpan data undangan ke dalam objek 'invitations'
  invitations[slug] = {
    coupleName,
    weddingDate,
    weddingTime,
    weddingLocation,
    rsvpDate,
    photos,
    design
  };

  // Redirect ke URL undangan yang unik
  res.redirect(`/invitation/${slug}`);
});

// Menampilkan undangan berdasarkan nama pasangan (slug)
app.get('/invitation/:slug', (req, res) => {
  const slug = req.params.slug;
  const invitation = invitations[slug];

  if (!invitation) {
    return res.status(404).send('<h1>Undangan Tidak Ditemukan</h1><p>Periksa kembali link atau buat undangan baru.</p>');
  }

  // Pilih desain berdasarkan input pengguna
  const templateFile = invitation.design === 'minimalis' ? 'design-2.html' : 'design-1.html';
  
  // Baca template desain undangan dari file
  fs.readFile(path.join(__dirname, 'design', templateFile), 'utf8', (err, template) => {
    if (err) {
      return res.status(500).send('<h1>Gagal memuat desain undangan.</h1>');
    }

    const photoHTML = invitation.photos.map(file =>
      `<img src="/uploads/${file.filename}" alt="Foto Pre-Wedding" class="photo">`
    ).join('');

    // Ganti placeholder dengan data undangan
    let invitationHTML = template.replace(/{{coupleName}}/g, invitation.coupleName)
      .replace(/{{weddingDate}}/g, invitation.weddingDate)
      .replace(/{{weddingTime}}/g, invitation.weddingTime)
      .replace(/{{weddingLocation}}/g, invitation.weddingLocation)
      .replace(/{{rsvpDate}}/g, invitation.rsvpDate)
      .replace(/{{photoHTML}}/g, photoHTML);

    res.send(invitationHTML);
  });
});

// Halaman admin untuk melihat semua undangan
app.get('/admin', (req, res) => {
  let adminContent = `
    <link rel="stylesheet" href="/css/styles.css">
    <div class="admin-container">
      <h1>Panel Admin</h1>
      <ul>
  `;

  for (const slug in invitations) {
    adminContent += `<li><a href="/invitation/${slug}">${invitations[slug].coupleName}</a> - Desain: ${invitations[slug].design}</li>`;
  }

  adminContent += `
      </ul>
      <a href="/">Kembali ke Form</a>
    </div>
  `;

  res.send(adminContent);
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

