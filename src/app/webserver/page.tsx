"use client";
import { useState, useEffect } from "react";

// Komponen reusable untuk Step
interface StepProps {
  id: number;
  title: string;
  command: string;
  description?: string | null;
  config?: string | null;
  notes?: string[] | null;
}

const StepComponent = ({ step }: { step: StepProps }) => {
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    const btn = document.getElementById(id);
    if (btn) {
      btn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" class="text-green-500">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>`;
      setTimeout(() => {
        btn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>`;
      }, 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-md">
          {step.id}
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight">
          {step.title}
        </h3>
      </div>

      <div className="space-y-4">
        {/* Terminal Command Box */}
        {step.command && (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800">
            <div className="px-5 py-3 flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <span className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">Perintah Terminal</span>
              <button
                id={`copy-command-${step.id}`}
                onClick={() => copyToClipboard(step.command, `copy-command-${step.id}`)}
                className="text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
            </div>
            <div className="p-6 font-mono text-sm text-zinc-600 dark:text-zinc-300 overflow-x-auto">
              <pre>{step.command}</pre>
            </div>
          </div>
        )}

        {/* Description Text */}
        {step.description && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed px-2">
            {step.description}
          </p>
        )}

        {/* Notes Box */}
        {step.notes && step.notes.length > 0 && (
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
            <ul className="space-y-3 text-sm text-zinc-500 dark:text-zinc-400">
              {step.notes.map((note, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 mt-2 rounded-full bg-black dark:bg-white shrink-0"></span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Configuration Content Box */}
        {step.config && (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800">
            <div className="px-5 py-3 flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <span className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">Isi Konfigurasi</span>
              <button
                id={`copy-config-${step.id}`}
                onClick={() => copyToClipboard(step.config || "", `copy-config-${step.id}`)}
                className="text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
            </div>
            <div className="p-6 font-mono text-[13px] text-zinc-600 dark:text-zinc-300 leading-relaxed overflow-x-auto">
              <pre className="whitespace-pre-wrap">{step.config}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function WebServerPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const steps = {
    step1: { 
      id: 1, 
      title: "Install Apache dan PHP", 
      command: "apt update\napt install apache2 php php-mysql libapache2-mod-php php-cli php-curl php-gd php-mbstring php-xml php-zip -y\nsystemctl status apache2\nphp -v",
      description: "Uji di browser dengan mengakses http://192.168.10.28. Jika muncul halaman Default Page, Apache sudah berjalan."
    },
    step2: { 
      id: 2, 
      title: "Ambil Repositori Resmi MySQL", 
      command: "wget https://dev.mysql.com/get/mysql-apt-config_0.8.36-1_all.deb\ndpkg -i mysql-apt-config_0.8.36-1_all.deb",
      description: "Install paket konfigurasi repositori MySQL terbaru untuk Debian.",
      notes: [
        "Pilih MySQL Server & Cluster",
        "Pilih mysql-8.4.lts",
        "Pilih OK yang ada dibawah baris mysql",
        "Jalankan apt update setelah pop-up hilang"
      ]
    },
    step3: { 
      id: 3, 
      title: "Install MySQL Server", 
      command: "apt install mysql-server -y",
      notes: [
        "Masukkan root password (contoh: 'root')",
        "Re-enter password untuk konfirmasi",
        "Pilih OK untuk melanjutkan"
      ],
      config: "mysql -u root -p"
    },
    step4: { 
      id: 4, 
      title: "Install PHPMyAdmin", 
      command: "apt install phpmyadmin -y",
      notes: [
        "Tekan SPASI pada 'apache2' hingga muncul tanda [*] lalu ENTER",
        "Pilih 'Yes' saat muncul dbconfig-common",
        "Masukkan password database untuk PHPMyAdmin",
        "Akses via http://192.168.10.28/phpmyadmin"
      ]
    },
    step5: { 
      id: 5, 
      title: "Buat Database", 
      command: "mysql -u root -p\nCREATE DATABASE sekolah;\nUSE sekolah;\nCREATE TABLE siswa (\nid INT(6) AUTO_INCREMENT PRIMARY KEY,\nnama VARCHAR(50),\njurusan VARCHAR(50)\n);",
      description: "Membuat database 'sekolah' dan tabel 'siswa' untuk menyimpan data."
    },
    step6: { 
      id: 6, 
      title: "Membuat Website Sederhana", 
      command: "cd /var/www/html\nmkdir web\nchown -R www-data:www-data /var/www/html/web\nnano /var/www/html/web/index.php",
      description: "Simpan kode PHP di bawah ini ke dalam file index.php agar website bisa menampilkan data dari database.",
      config: `<?php
$host = "localhost";
$user = "root";
$pass = "root";
$db = "sekolah";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error){
    die("koneksi gagal:".$conn->connect_error);
}

if($_SERVER["REQUEST_METHOD"]=="POST"){
    $nama = $_POST['nama'];
    $jurusan = $_POST['jurusan'];
    $conn->query("INSERT INTO siswa(nama,jurusan) VALUES('$nama','$jurusan')");
}

$result = $conn->query("SELECT * FROM siswa");
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Siswa Modern</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-5 md:p-10">
    <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">Manajemen Data Siswa</h1>

        <div class="bg-white p-6 rounded-xl shadow-md mb-10 text-zinc-900">
            <h2 class="text-lg font-semibold mb-4 text-gray-700">Tambah Siswa Baru</h2>
            <form method="POST" class="flex flex-col md:flex-row gap-4">
                <input type="text" name="nama" placeholder="Nama Lengkap" required 
                    class="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <input type="text" name="jurusan" placeholder="Jurusan" required 
                    class="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <button type="submit" 
                    class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200">
                    Tambah
                </button>
            </form>
        </div>

        <div class="bg-white rounded-xl shadow-md overflow-hidden text-zinc-900">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-gray-50 border-b">
                        <th class="p-4 font-semibold text-gray-600">ID</th>
                        <th class="p-4 font-semibold text-gray-600">Nama</th>
                        <th class="p-4 font-semibold text-gray-600">Jurusan</th>
                    </tr>
                </thead>
                <tbody>
                    <?php while($row = $result->fetch_assoc()): ?>
                    <tr class="border-b hover:bg-gray-50 transition">
                        <td class="p-4 text-gray-700"><?= $row['id'] ?></td>
                        <td class="p-4 font-medium text-gray-900"><?= $row['nama'] ?></td>
                        <td class="p-4 text-gray-600">
                            <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs"><?= $row['jurusan'] ?></span>
                        </td>
                    </tr>
                    <?php endwhile; ?>
                    <?php if ($result->num_rows == 0): ?>
                    <tr>
                        <td colspan="3" class="p-10 text-center text-gray-400">Belum ada data siswa.</td>
                    </tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>`
    }
  };

  if (!isClient) return null;

  return (
    <div className="selection:bg-zinc-100 dark:selection:bg-zinc-800">
      <div className="max-w-4xl mx-auto px-6">
        <header className="pt-16 pb-12 text-left">
          <div className="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase border border-zinc-300 dark:border-zinc-700 rounded-full">
            Panduan Langkah-demi-Langkah
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-black dark:text-white leading-tight">
            Konfigurasi <br />{" "}
            <span className="text-zinc-400 dark:text-zinc-600">
              Web Server LAMP Stack
            </span>
          </h1>
        </header>

        <main className="pb-20">
          <section className="space-y-6">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">
                Langkah Instalasi & Konfigurasi
              </h2>
              <div className="h-px grow bg-zinc-200 dark:bg-zinc-800"></div>
            </div>

            <StepComponent step={steps.step1} />
            <StepComponent step={steps.step2} />
            <StepComponent step={steps.step3} />
            <StepComponent step={steps.step4} />
            <StepComponent step={steps.step5} />
            <StepComponent step={steps.step6} />

            {/* Step 7 - Testing */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-md">
                  7
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight">
                  Verifikasi Akhir
                </h3>
              </div>

              <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Sekarang buka browser di komputer host dan akses alamat berikut untuk melihat hasil website yang telah dibuat:
                  <br /><br />
                  <a 
                    href="http://192.168.10.28/web" 
                    className="relative inline-block text-black dark:text-white font-bold no-underline group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    http://192.168.10.28/web
                    <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-black dark:bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
                  </a>
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}