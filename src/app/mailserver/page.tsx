"use client";
import Link from "next/link";
import React, { useState } from "react";

export default function MailServerGuide() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen">
      {/* Container Utama dipersempit ke max-w-4xl untuk menambah jarak kanan-kiri */}
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <header className="pt-16 pb-12 text-left">
          <div className="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase border border-zinc-300 dark:border-zinc-700 rounded-full">
            Mail server Guide
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-black dark:text-white leading-tight">
            Konfigurasi <br />{" "}
            <span className="text-zinc-400 dark:text-zinc-600">
              mail server
            </span>
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
            Panduan install dan Konfigurasi mail server dan web server
            menggunakan postfix, dovecot, dan roundcube.
          </p>
        </header>

        <main className="pb-20">
          <section className="space-y-6">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">
                Langkah Pelaksanaan
              </h2>
              <div className="h-px grow bg-zinc-200 dark:bg-zinc-800"></div>
            </div>

            {/* 1 */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-md">
                  1
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight">
                  Persiapan Host
                </h3>
              </div>
              <CodeBlock
                id="step1"
                code={`echo "192.168.10.28  mail.nain.com  mail" | sudo tee -a /etc/hosts`}
                onCopy={copyToClipboard}
                copiedId={copiedId}
              />
            </div>

            {/* 2 */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-md">
                  2
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight">
                  Konfigurasi DNS Server (Bind9)
                </h3>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-3xl">
                karna kita sudah mengkonfigurasi bind9, jadi kita hanya perlu
                ubah db.nain.com dan db.192 yang kemarin sudah dibuat. <br />
                Sekarang tinggal edit File Forward (/etc/bind/db.nain.com):
              </p>
              <CodeBlock
                id="step2a"
                label="db.nain.com"
                code={`$TTL    604800
@       IN      SOA     ns1.nain.com. root.nain.com. (
                              3
                         604800
                          86400
                        2419200
                         604800 )

@       IN      NS      ns1.nain.com.
@       IN      MX  10  mail.nain.com.
@       IN      A       192.168.10.28
ns1     IN      A       192.168.10.28
mail    IN      A       192.168.10.28`}
                onCopy={copyToClipboard}
                copiedId={copiedId}
              />
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-8">
                Edit File Reverse (/etc/bind/db.ip):
              </p>
              <CodeBlock
                id="step2b"
                label="db.ip"
                code={`$TTL    604800
@       IN      SOA     ns1.nain.com. root.nain.com. (
                              3
                         604800
                          86400
                        2419200
                         604800 )

@       IN      NS      ns1.nain.com.
28      IN      PTR     nain.com.
28      IN      PTR     mail.nain.com.`}
                onCopy={copyToClipboard}
                copiedId={copiedId}
              />
            </div>

            {/* 3 */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-md">
                  3
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight">
                  Install Postfix & Dovecot
                </h3>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Saat muncul jendela konfigurasi Postfix, pilih "Internet Site"
                dan masukkan System Mail Name: nain.com. <br />
                telnet digunakan untuk test mengirim dan menerima mail.
              </p>
              <CodeBlock
                id="step3"
                code={`apt install postfix dovecot-imapd dovecot-pop3d telnet -y`}
                onCopy={copyToClipboard}
                copiedId={copiedId}
              />
            </div>

            {/* 4 */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-md">
                  4
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight">
                  Konfigurasi Postfix
                </h3>
              </div>
              <div className="bg-white dark:bg-zinc-900/50 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <ul className="space-y-4 text-sm text-zinc-500 dark:text-zinc-400">
                  <li className="flex gap-3">
                    <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-black dark:bg-white shrink-0"></span>
                    <span>1. Edit file /etc/postfix/main.cf.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-black dark:bg-white shrink-0"></span>
                    <span>
                      2. dibagian networks tambahkan ip 192.168.10.0/24 dan di
                      baris paling akhir tambahkan home_mailbox = Maildir/{" "}
                    </span>
                  </li>
                  <li className="pl-5 text-xs opacity-60 italic">
                    - mynetworks: Memberi izin IP di jaringan tersebut untuk
                    kirim email tanpa login.
                  </li>
                  <li className="pl-5 text-xs opacity-60 italic">
                    - home_mailbox: Menyimpan email di folder Maildir di dalam
                    home user.
                  </li>
                </ul>
              </div>
            </div>

            {/* 5 */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-md">
                  5
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight">
                  Konfigurasi Dovecot
                </h3>
              </div>
              <div className="bg-white dark:bg-zinc-900/50 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm text-sm text-zinc-500 dark:text-zinc-400">
                <ul className="space-y-4">
                  <li>
                    1. Buka file /etc/dovecot/conf.d/10-mail.conf: Cari dan
                    ubah: mail_location = maildir:~/Maildir
                  </li>
                  <li>
                    2. Buka file /etc/dovecot/conf.d/10-auth.conf: <br />
                    <span className="block mt-2 pl-4 border-l border-zinc-200 dark:border-zinc-800">
                      - Cari dan ubah: disable_plaintext_auth = no (hapus tagar
                      jika ada)
                      <br />- Cari dan ubah: auth_mechanisms = plain login
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 6 */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-md">
                  6
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight">
                  Persiapan User
                </h3>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Agar email bisa diterima, buat folder Maildir di sistem sebagai
                template untuk user baru:
              </p>
              <CodeBlock
                id="step6a"
                code={`sudo maildirmake.dovecot /etc/skel/Maildir`}
                onCopy={copyToClipboard}
                copiedId={copiedId}
              />
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-6">
                Jika belum punya dua user maka buat user baru untuk percobaan
                (misal: user2):
              </p>
              <CodeBlock
                id="step6b"
                code={`adduser user2`}
                onCopy={copyToClipboard}
                copiedId={copiedId}
              />
            </div>

            {/* 7 */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-md">
                  7
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight">
                  Test kirim mail
                </h3>
              </div>
              <CodeBlock
                id="step7a"
                label="SMTP Command"
                code={`telnet 192.168.10.28 25     # untuk mengirim mail melalui smtp
Trying 192.168.10.28...
Connected to 192.168.10.28.
Escape character is '^]'.
220 nain.com ESMTP Postfix (Debian/GNU)
mail from:nain    # untuk mengirim mail dari user nain
250 2.1.0 Ok
rcpt to:user2     # untuk mengirim mail ke user user2
250 2.1.5 Ok
data    # untuk memulai penulisan isi mail
354 End data with <CR><LF>.<CR><LF>
test kirim mail      # isi pesan mail
.   # untuk mengakhiri penulisan isi mail
250 2.0.0 Ok: queued as 6730C82D30
quit      # untuk keluar dari telnet
221 2.0.0 Bye`}
                onCopy={copyToClipboard}
                copiedId={copiedId}
              />
              <div className="mt-6">
                <CodeBlock
                  id="step7b"
                  label="POP3 Command"
                  code={`telnet 192.168.10.28 110   # untuk menerima mail melalui pop3
Trying 192.168.10.28...
Connected to 192.168.10.28.
Escape character is '^]'.
+OK Dovecot (Debian) ready.
user user2    # untuk login sebagai user2
+OK
pass 12       # masukkan password user2
+OK Logged in.
list    # untuk melihat daftar mail yang diterima
+OK 1 messages:
1 405
.
retr 1  # untuk membaca mail dengan nomor 1`}
                  onCopy={copyToClipboard}
                  copiedId={copiedId}
                />
              </div>
            </div>

            {/* 8 */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-md">
                  8
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight">
                  Install rouncube
                </h3>
              </div>
              <CodeBlock
                id="step8"
                code={`apt install roundcube -y`}
                onCopy={copyToClipboard}
                copiedId={copiedId}
              />
              <div className="bg-white dark:bg-zinc-900/50 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all hover:border-zinc-400 dark:hover:border-zinc-600">
                <div className="space-y-3">
                  <h4 className="font-bold text-black dark:text-white mb-4 uppercase tracking-widest text-[10px] opacity-50">
                    Konfigurasi Saat Instalasi
                  </h4>
                  <div className="space-y-4 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    <div className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-black dark:bg-white shrink-0"></span>
                      <p><b>Configure database for roundcube with dbconfig-common?</b> Pilih <b>Yes</b></p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-black dark:bg-white shrink-0"></span>
                      <p><b>MySQL application password for roundcube:</b> Buat password baru untuk user database roundcube (lalu ketik ulang).</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-black dark:bg-white shrink-0"></span>
                      <p><b>Password of the database's administrative user:</b> Masukkan password root MySQL Anda.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 9 */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-md">
                  9
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight">
                  Konfigurasi rouncube
                </h3>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Buka file /etc/roundcube/config.inc.php dan ubah bebarapa baris
                berikut:
              </p>
              <CodeBlock
                id="step9"
                code={`$config['imap_host'] = ["mail.nain.com:143"];
$config['smtp_host'] = 'mail.nain.com:25';
$config['smtp_user'] = '';
$config['smtp_pass'] = '';`}
                onCopy={copyToClipboard}
                copiedId={copiedId}
              />
            </div>

            {/* 10 */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-md">
                  10
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight">
                  Konfigurasi apache
                </h3>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                buat config apache mail dengan cara membuat file baru di
                /etc/apache2/sites-available/mail.conf dengan isi sebagai
                berikut:
              </p>
              <CodeBlock
                id="step10a"
                label="mail.conf"
                code={`<VirtualHost *:80>
ServerName mail.nain.local
DocumentRoot /usr/share/roundcube

<Directory /usr/share/roundcube>
    Options +FollowSymLinks
    AllowOverride All
    Require all granted
</Directory>

ErrorLog \${APACHE_LOG_DIR}/mail_error.log
CustomLog \${APACHE_LOG_DIR}/mail_access.log combined

</VirtualHost>`}
                onCopy={copyToClipboard}
                copiedId={copiedId}
              />
              <div className="mt-8">
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                  Aktifkan site mail dan nonaktifkan default site apache, lalu
                  restart apache:
                </p>
                <CodeBlock
                  id="step10b"
                  code={`a2dissite 000-default.conf
a2ensite mail.conf
systemctl reload apache2
systemctl restart apache2`}
                  onCopy={copyToClipboard}
                  copiedId={copiedId}
                />
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-10">
                Sekarang coba akses webmail melalui browser dengan alamat{" "}
                <a
                  href="http://mail.nain.com"
                  className="relative inline-block text-black dark:text-white font-bold no-underline group"
                >
                  http://mail.nain.com
                  {/* Garis Animasi Tipis */}
                  <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-black dark:bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
                </a>
              </p>
            </div>

            {/* Bagian Navigasi Terpisah */}
<div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
  {[
    { title: "SMTP Auth", link: "/mailserver/smtp-auth" },
    { title: "TLS Mail", link: "/mailserver/tls" },
    { title: "Mail Antar VM", link: "/mailserver/antar-vm" },
  ].map((item, index) => (
    <Link
      key={index}
      href={item.link}
      className="group p-6 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-3xl flex items-center justify-between hover:border-zinc-400 dark:hover:border-zinc-600 transition-all shadow-sm"
    >
      <div className="space-y-1">
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Next Step</p>
        <h4 className="font-bold text-sm text-black dark:text-white">{item.title}</h4>
      </div>
      
      <div className="w-8 h-8 rounded-full bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center border border-zinc-100 dark:border-zinc-800 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
        <svg 
          className="transform group-hover:translate-x-0.5 transition-transform" 
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" 
          strokeLinecap="round" strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </div>
    </Link>
  ))}
</div>
          </section>
        </main>
      </div>
    </div>
  );
}

function CodeBlock({ code, id, label, onCopy, copiedId }: any) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800">
      <div className="px-5 py-3 flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
        <span className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">
          {label || "Perintah Terminal"}
        </span>
        <button
          onClick={() => onCopy(code, id)}
          className="text-zinc-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2"
        >
          {copiedId === id ? (
            <span className="text-[10px] font-black text-green-500 uppercase tracking-tighter">
              Berhasil
            </span>
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          )}
        </button>
      </div>
      <div className="p-6 font-mono text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed overflow-x-auto">
        <pre className="whitespace-pre-wrap">{code}</pre>
      </div>
    </div>
  );
}
