"use client";

function CodeBlock({
  title,
  id,
  code,
  onCopy,
  output,
}: {
  title: string;
  id: string;
  code: string;
  onCopy: (text: string, id: string) => void;
  output?: string;
}) {
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800">
        <div className="px-5 py-3 flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
          <span className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">
            {title}
          </span>
          <button
            id={id}
            onClick={() => onCopy(code, id)}
            className="text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        </div>
        <div className="p-6 font-mono text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed overflow-x-auto bg-white dark:bg-zinc-900">
          <pre className="whitespace-pre-wrap">{code}</pre>
        </div>
      </div>

      {output && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800">
          <div className="px-5 py-3 flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
            <span className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">
              Hasil Output
            </span>
            <button
              id={`${id}-out`}
              onClick={() => onCopy(output, `${id}-out`)}
              className="text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </div>
          <div className="p-6 font-mono text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed overflow-x-auto bg-white dark:bg-zinc-900">
            <pre className="whitespace-pre-wrap">{output}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

function NoteBox({
  type,
  children,
}: {
  type: "info" | "warning" | "tip";
  children: React.ReactNode;
}) {
  const styles = {
    info: "border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300",
    warning:
      "border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-300",
    tip: "border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300",
  };
  const icons = {
    info: "ℹ️",
    warning: "⚠️",
    tip: "✅",
  };
  return (
    <div
      className={`border rounded-xl px-5 py-4 text-sm leading-relaxed ${styles[type]}`}
    >
      <span className="mr-2">{icons[type]}</span>
      {children}
    </div>
  );
}

export default function LibreNMSPage() {
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    const btn = document.getElementById(id);
    if (btn) {
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" class="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
      setTimeout(() => {
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
      }, 2000);
    }
  };

  const steps = [
    {
      id: 1,
      title: "Persiapan Sistem",
      desc: "Update sistem dan install dependensi yang dibutuhkan LibreNMS.",
      blocks: [
        {
          title: "Perintah Terminal",
          id: "s1-1",
          code: `apt update && apt upgrade -y
apt install -y acl curl fping git graphviz imagemagick mariadb-client \\
  mariadb-server mtr-tiny apache2 libapache2-mod-fcgid nmap php8.2-cli \\
  php8.2-curl php8.2-fpm php8.2-gd php8.2-gmp php8.2-mbstring \\
  php8.2-mysql php8.2-snmp php8.2-xml php8.2-zip rrdtool snmp snmpd \\
  whois unzip python3-dotenv python3-pymysql python3-redis \\
  python3-setuptools python3-systemd python3-pip lnav`,
        },
      ],
      note: {
        type: "info" as const,
        text: "Pastikan versi PHP yang diinstall sesuai dengan yang tersedia di repo Debian kamu. Cek dengan: php -v",
      },
    },
    {
      id: 2,
      title: "Buat User LibreNMS",
      desc: "Buat user sistem khusus untuk menjalankan LibreNMS.",
      blocks: [
        {
          title: "Perintah Terminal",
          id: "s2-1",
          code: `useradd librenms -d /opt/librenms -M -r -s "$(which bash)"`,
        },
      ],
    },
    {
      id: 3,
      title: "Download LibreNMS",
      desc: "Clone repositori LibreNMS dari GitHub ke direktori /opt/librenms.",
      blocks: [
        {
          title: "Perintah Terminal",
          id: "s3-1",
          code: `cd /opt
git clone https://github.com/librenms/librenms.git`,
        },
      ],
    },
    {
      id: 4,
      title: "Set Permission",
      desc: "Atur kepemilikan dan permission folder LibreNMS.",
      blocks: [
        {
          title: "Perintah Terminal",
          id: "s4-1",
          code: `chown -R librenms:librenms /opt/librenms
chmod 771 /opt/librenms
setfacl -d -m g::rwx /opt/librenms/rrd /opt/librenms/logs \\
  /opt/librenms/bootstrap/cache/ /opt/librenms/storage/
setfacl -R -m g::rwx /opt/librenms/rrd /opt/librenms/logs \\
  /opt/librenms/bootstrap/cache/ /opt/librenms/storage/`,
        },
      ],
    },
    {
      id: 5,
      title: "Install Dependensi PHP (Composer)",
      desc: "Install library PHP yang dibutuhkan menggunakan Composer.",
      blocks: [
        {
          title: "Perintah Terminal",
          id: "s5-1",
          code: `cd /opt/librenms
sudo -u librenms ./scripts/composer_wrapper.php install --no-dev`,
        },
      ],
      note: {
        type: "warning" as const,
        text: "Proses ini membutuhkan koneksi internet dan bisa memakan waktu beberapa menit.",
      },
    },
    {
      id: 6,
      title: "Set Timezone",
      desc: "Samakan timezone PHP dengan timezone sistem.",
      blocks: [
        {
          title: "Perintah Terminal",
          id: "s6-tz",
          code: `timedatectl set-timezone Asia/Jakarta`,
        },
        {
          title: "Edit php.ini (CLI)",
          id: "s6-cli",
          code: `nano /etc/php/8.2/cli/php.ini
# Cari dan ubah baris:
# date.timezone = Asia/Jakarta`,
        },
        {
          title: "Edit php.ini (FPM)",
          id: "s6-fpm",
          code: `nano /etc/php/8.2/fpm/php.ini
# Cari dan ubah baris:
# date.timezone = Asia/Jakarta`,
        },
      ],
    },
    {
      id: 7,
      title: "Konfigurasi MariaDB",
      desc: "Tambahkan konfigurasi yang dibutuhkan, lalu buat database dan user khusus untuk LibreNMS.",
      blocks: [
        {
          title: "Edit /etc/mysql/mariadb.conf.d/50-server.cnf",
          id: "s7-conf",
          code: `# Tambahkan di bawah [mysqld]:
innodb_file_per_table=1
lower_case_table_names=0`,
        },
        {
          title: "Enable & Restart MariaDB",
          id: "s7-restart",
          code: `systemctl enable mariadb
systemctl restart mariadb`,
        },
        {
          title: "Masuk ke MariaDB",
          id: "s7-login",
          code: `sudo mysql`,
        },
        {
          title: "Buat Database & User (di dalam MariaDB)",
          id: "s7-db",
          code: `CREATE DATABASE librenms CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'librenms'@'localhost' IDENTIFIED BY 'passwordkamu';
GRANT ALL PRIVILEGES ON librenms.* TO 'librenms'@'localhost';
FLUSH PRIVILEGES;`,
        },
        {
          title: "Keluar dari MariaDB",
          id: "s7-exit",
          code: `EXIT;`,
        },
      ],
      note: {
        type: "warning" as const,
        text: "Ganti 'passwordkamu' dengan password yang kuat. Catat baik-baik karena akan dipakai saat web installer. Pastikan kolom plugin menampilkan mysql_native_password, bukan unix_socket.",
      },
    },
    {
      id: 8,
      title: "Konfigurasi PHP-FPM",
      desc: "Buat pool PHP-FPM khusus untuk LibreNMS agar berjalan sebagai user librenms.",
      blocks: [
        {
          title: "Buat file /etc/php/8.2/fpm/pool.d/librenms.conf",
          id: "s8-pool",
          code: `[librenms]
user = librenms
group = librenms
listen = /run/php-fpm-librenms.sock
listen.owner = www-data
listen.group = www-data
listen.mode = 0660
pm = dynamic
pm.max_children = 10
pm.start_servers = 2
pm.min_spare_servers = 1
pm.max_spare_servers = 5`,
        },
        {
          title: "Restart PHP-FPM",
          id: "s8-restart",
          code: `systemctl restart php8.2-fpm`,
        },
      ],
    },
    {
      id: 9,
      title: "Konfigurasi Apache",
      desc: "Aktifkan modul yang dibutuhkan dan buat VirtualHost untuk LibreNMS.",
      blocks: [
        {
          title: "Aktifkan modul Apache",
          id: "s9-mod",
          code: `a2enmod rewrite proxy_fcgi setenvif
a2enconf php8.2-fpm`,
        },
        {
          title: "Buat file /etc/apache2/sites-available/librenms.conf",
          id: "s9-conf",
          code: `<VirtualHost *:80>
  ServerName librenms.local
  DocumentRoot /opt/librenms/html/
  AllowEncodedSlashes NoDecode

  <FilesMatch \\.php$>
    SetHandler "proxy:unix:/run/php-fpm-librenms.sock|fcgi://localhost"
  </FilesMatch>

  <Directory "/opt/librenms/html/">
    Require all granted
    AllowOverride All
    Options FollowSymLinks MultiViews
  </Directory>
</VirtualHost>`,
        },
        {
          title: "Aktifkan site & restart Apache",
          id: "s9-enable",
          code: `a2ensite librenms
a2dissite 000-default
systemctl restart apache2
systemctl restart php8.2-fpm`,
        },
      ],
      note: {
        type: "info" as const,
        text: "Ganti 'librenms.local' dengan IP atau domain server kamu. Port bisa diganti sesuai kebutuhan, misal *:1945.",
      },
    },
    {
      id: 10,
      title: "Konfigurasi SNMP",
      desc: "Setup SNMP daemon untuk monitoring perangkat lokal.",
      blocks: [
        {
          title: "Salin konfigurasi SNMP",
          id: "s10-cp",
          code: `cp /opt/librenms/snmpd.conf.example /etc/snmp/snmpd.conf
nano /etc/snmp/snmpd.conf
# Ganti baris: rocommunity public default
# Menjadi   : rocommunity public localhost`,
        },
        {
          title: "Download & aktifkan extend script",
          id: "s10-ext",
          code: `curl -o /usr/bin/distro https://raw.githubusercontent.com/librenms/librenms-agent/master/snmp/distro
chmod +x /usr/bin/distro
systemctl enable snmpd
systemctl restart snmpd`,
        },
      ],
    },
    {
      id: 11,
      title: "Setup Cron & Log Rotation",
      desc: "Aktifkan cron job untuk polling data dan log rotation.",
      blocks: [
        {
          title: "Perintah Terminal",
          id: "s11-1",
          code: `cp /opt/librenms/dist/librenms.cron /etc/cron.d/librenms
cp /opt/librenms/misc/librenms.logrotate /etc/logrotate.d/librenms`,
        },
      ],
    },
    {
      id: 12,
      title: "Setup Scheduler (Laravel)",
      desc: "Aktifkan Laravel scheduler sebagai systemd service.",
      blocks: [
        {
          title: "Perintah Terminal",
          id: "s12-1",
          code: `cp /opt/librenms/dist/librenms-scheduler.service \\
   /opt/librenms/dist/librenms-scheduler.timer \\
   /etc/systemd/system/

systemctl enable librenms-scheduler.timer
systemctl start librenms-scheduler.timer`,
        },
      ],
    },
    {
      id: 13,
      title: "Web Installer",
      desc: "Selesaikan instalasi melalui browser.",
      blocks: [
        {
          title: "Akses di browser",
          id: "s13-1",
          code: `http://<IP-SERVER>/install
# atau jika pakai domain:
http://librenms.local/install`,
        },
      ],
      note: {
        type: "tip" as const,
        text: "Ikuti langkah di web installer: isi kredensial database (host: localhost, user: librenms, password: yang dibuat di langkah 7), lalu Build Database, buat admin user, dan selesai.",
      },
    },
    {
      id: 14,
      title: "Selesai & Login",
      desc: "Setelah web installer selesai, LibreNMS sudah siap digunakan. Login dengan akun admin yang dibuat tadi.",
      blocks: [
        {
          title: "Akses LibreNMS di browser",
          id: "s14-1",
          code: `http://<IP-SERVER>/
# atau jika pakai domain:
http://librenms.local/`,
        },
      ],
      note: {
        type: "tip" as const,
        text: "Validasi sistem dilakukan otomatis oleh web installer. Jika ada warning setelah login, buka menu Validate (di halaman Overview > Validate) untuk melihat dan memperbaiki masalah yang ditemukan.",
      },
    },
  ];

  return (
    <div className="min-h-screen selection:bg-zinc-100 dark:selection:bg-zinc-800">
      <div className="max-w-4xl mx-auto px-6">
        <header className="pt-16 pb-12 text-left">
          <div className="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase border border-zinc-300 dark:border-zinc-700 rounded-full">
            Panduan Langkah-demi-Langkah
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-black dark:text-white leading-tight">
            Instalasi <br />
            <span className="text-zinc-400 dark:text-zinc-600">
              LibreNMS
            </span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-xl leading-relaxed">
            Network Monitoring System berbasis open-source. Panduan ini mencakup
            instalasi lengkap di Debian menggunakan Nginx + MariaDB + PHP-FPM.
          </p>
        </header>

        <main className="pb-20">
          <section className="space-y-16">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">
                Langkah Pelaksanaan
              </h2>
              <div className="h-px grow bg-zinc-200 dark:bg-zinc-800"></div>
            </div>

            {steps.map((step) => (
              <div key={step.id} className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-md">
                    {step.id}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight">
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm text-zinc-500 px-2 leading-relaxed">
                  {step.desc}
                </p>
                {step.note && (
                  <NoteBox type={step.note.type}>{step.note.text}</NoteBox>
                )}
                <div className="space-y-4">
                  {step.blocks.map((block) => (
                    <CodeBlock
                      key={block.id}
                      title={block.title}
                      id={block.id}
                      code={block.code}
                      onCopy={copyToClipboard}
                      output={"output" in block ? (block as { output?: string }).output : undefined}
                    />
                  ))}
                </div>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}