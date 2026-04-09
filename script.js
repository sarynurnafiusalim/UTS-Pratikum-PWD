const form = document.getElementById('formPasien');
const list = document.getElementById('listPasien');
const errorMsg = document.getElementById('errorMsg');

let dataPasien = [];

form.addEventListener('submit', function (e) {
  e.preventDefault();

  let nama = document.getElementById('nama').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let umur = document.getElementById('umur').value;
  let layanan = document.getElementById('layananSelect').value;
  let kelamin = document.querySelector('input[name="kelamin"]:checked');

  // VALIDASI KOSONG
  if (nama === '' || email === '' || password === '' || umur === '' || layanan === '' || !kelamin) {
    errorMsg.textContent = 'Semua field wajib diisi!';
    return;
  }

  // VALIDASI EMAIL
  let emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailValid.test(email)) {
    errorMsg.textContent = 'Email tidak valid! (contoh: nama@gmail.com)';
    return;
  }

  // VALIDASI PASSWORD
  if (password.length < 6) {
    errorMsg.textContent = 'Password minimal 6 karakter';
    return;
  }

  // VALIDASI UMUR
  if (umur <= 0) {
    errorMsg.textContent = 'Umur harus angka positif!';
    return;
  }

  errorMsg.textContent = '';

  let pasien = {
    nama,
    email,
    umur,
    layanan,
    kelamin: kelamin.value,
  };

  dataPasien.push(pasien);

  tampilkan();
  form.reset();
});

function tampilkan() {
  list.innerHTML = '';

  dataPasien.forEach((p, index) => {
    let li = document.createElement('li');
    li.innerHTML = `
      ${p.nama} (${p.kelamin}) - ${p.layanan}
      <button onclick="hapus(${index})">Hapus</button>
    `;
    list.appendChild(li);
  });
}

function hapus(index) {
  dataPasien.splice(index, 1);
  tampilkan();
}
