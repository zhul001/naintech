"use client";
import React from "react";
import Link from "next/link";

export default function SMTPAuthPage() {
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

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        {/* Navigasi Back */}
        <nav className="pt-8">
          <Link
            href="/mailserver"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15.5 19l-7-7 7-7"
              />
            </svg>
          </Link>
        </nav>

        <header className="pt-12 pb-12 text-left">
          <div className="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase border border-zinc-300 dark:border-zinc-700 rounded-full">
            Mail Server Security
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-black dark:text-white leading-tight">
            SMTP{" "}
            <span className="text-zinc-400 dark:text-zinc-600">
              Authentication
            </span>
          </h1>
          <p className="max-w-xl text-zinc-500 dark:text-zinc-400 text-lg">
            Mengaktifkan mekanisme autentikasi SASL melalui Dovecot untuk
            mengamankan pengiriman email melalui port 587.
          </p>
        </header>

        <main className="pb-20 space-y-12">
          {/* Langkah 1 */}
          <section className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white">
                Instalasi Paket SASL
              </h3>
            </div>
            <CodeBlock
              title="Terminal"
              id="step1"
              code="sudo apt install sasl2-bin libsasl2-modules -y"
              onCopy={copyToClipboard}
            />
          </section>

          {/* Langkah 2 - BARU: HUBUNGKAN POSTFIX KE DOVECOT */}
          <section className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white">
                Hubungkan Postfix ke Dovecot
              </h3>
            </div>
            <p className="text-sm text-zinc-500 italic">
              Tambahkan atau pastikan baris ini ADA dalam /etc/postfix/main.cf:
            </p>
            <CodeBlock
              title="Edit /etc/postfix/main.cf"
              id="step2"
              code={`smtpd_sasl_type = dovecot\nsmtpd_sasl_path = private/auth\nsmtpd_sasl_auth_enable = yes\nsmtpd_sasl_security_options = noanonymous\nsmtpd_sasl_local_domain =\nsmtpd_recipient_restrictions = permit_sasl_authenticated, permit_mynetworks, reject_unauth_destination`}
              onCopy={copyToClipboard}
            />
          </section>

          {/* Langkah 3 - BARU: SOCKET AUTH DI DOVECOT */}
          <section className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white">
                Aktifkan Socket Auth di Dovecot
              </h3>
            </div>
            <p className="text-sm text-zinc-500 italic">
              Edit /etc/dovecot/conf.d/10-master.conf, cari bagian service auth{" "}
              {"{"}:
            </p>
            <CodeBlock
              title="Edit /etc/dovecot/conf.d/10-master.conf"
              id="step3"
              code={`service auth {\n  unix_listener /var/spool/postfix/private/auth {\n    mode = 0660\n    user = postfix\n    group = postfix\n  }\n}`}
              onCopy={copyToClipboard}
            />
          </section>

          {/* Langkah 4 */}
          <section className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm">
                4
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white">
                Aktifkan Port 587 (Submission)
              </h3>
            </div>
            <p className="text-sm text-zinc-500 italic">
              Buka /etc/postfix/master.cf dan aktifkan baris submission:
            </p>
            <CodeBlock
              title="Edit /etc/postfix/master.cf"
              id="step4"
              code={`submission inet n       -       y       -       -       smtpd\n  -o syslog_name=postfix/submission\n  -o smtpd_sasl_auth_enable=yes\n  -o smtpd_tls_security_level=may\n  -o smtpd_recipient_restrictions=permit_sasl_authenticated,reject`}
              onCopy={copyToClipboard}
            />
          </section>

          {/* Langkah 5 */}
          <section className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm">
                5
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white">
                Restart & Cek Port
              </h3>
            </div>
            <div className="grid gap-3">
              <CodeBlock
                title="Restart Services"
                id="step5a"
                code="sudo systemctl restart postfix dovecot"
                onCopy={copyToClipboard}
              />
              <CodeBlock
                title="Cek Port 587"
                id="step5b"
                code="sudo ss -tulpn | grep 587"
                onCopy={copyToClipboard}
              />
            </div>
          </section>

          {/* Langkah 6: Pengujian SMTP Auth Manual */}
          <section className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm">
                6
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white">
                Pengujian SMTP Manual (Base64)
              </h3>
            </div>

            <p className="text-sm text-zinc-500 italic">
              Sebelum telnet, Anda harus mengubah username & password ke format{" "}
              <b>Base64</b> melalui terminal:
            </p>

            <div className="grid gap-3">
              <CodeBlock
                title="Generate Base64 Username"
                id="step6a"
                code={`echo -n "user1" | base64`}
                onCopy={copyToClipboard}
              />
              <CodeBlock
                title="Generate Base64 Password"
                id="step6b"
                code={`echo -n "password_anda" | base64`}
                onCopy={copyToClipboard}
              />
            </div>

            <p className="text-sm text-zinc-500 italic mt-6">
              Setelah mendapat kode Base64, lakukan pengujian Telnet:
            </p>

            <CodeBlock
              title="Proses Telnet Auth"
              id="step6c"
              code={`telnet 192.168.10.28 587\nehlo test\nauth login\n# Masukkan kode Base64 Username\n# Masukkan kode Base64 Password`}
              onCopy={copyToClipboard}
            />

            <div className="bg-white dark:bg-zinc-900/50 p-4 rounded-xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800 transition-all hover:border-zinc-400 dark:hover:border-zinc-600 text-xs text-zinc-500 font-mono">
              <p className="mb-2 font-bold text-zinc-700 dark:text-zinc-300">
                Hasil yang diharapkan:
              </p>
              <div className="text-green-600 dark:text-green-400">
                334 VXNlcm5hbWU6 (Meminta Username)
                <br />
                334 UGFzc3dvcmQ6 (Meminta Password)
                <br />
                235 2.7.0 Authentication successful
              </div>
            </div>
          </section>

          {/* Langkah 7 */}
          <section className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm">
                7
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white">
                Konfigurasi Roundcube
              </h3>
            </div>
            <CodeBlock
              title="/etc/roundcube/config.inc.php"
              id="step7"
              code={`$config['smtp_host'] = 'localhost:587';\n$config['smtp_user'] = '%u';\n$config['smtp_pass'] = '%p';`}
              onCopy={copyToClipboard}
            />
            <CodeBlock
              title="Restart Apache"
              id="step7b"
              code="sudo systemctl restart apache2"
              onCopy={copyToClipboard}
            />
          </section>

          {/* Final Verification */}
          <section className="bg-white dark:bg-zinc-900/50 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all hover:border-zinc-400 dark:hover:border-zinc-600">
            <h3 className="text-2xl font-black mb-4">
              Langkah Akhir: Verifikasi
            </h3>
            <ul className="space-y-3 opacity-80 text-sm">
              <li>• Login ke Roundcube Webmail.</li>
              <li>• Kirim email ke user lokal lain.</li>
              <li>• Jika password salah → GAGAL.</li>
              <li>• Jika benar → TERKIRIM.</li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}

// Komponen CodeBlock tetap sama seperti sebelumnya...
function CodeBlock({
  title,
  id,
  code,
  onCopy,
}: {
  title: string;
  id: string;
  code: string;
  onCopy: any;
}) {
  return (
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
      <div className="p-6 font-mono text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed overflow-x-auto">
        <pre className="whitespace-pre">{code}</pre>
      </div>
    </div>
  );
}
