"use client";
import React from "react";
import Link from "next/link";

export default function TLSMailPage() {
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
        
        <nav className="pt-8">
          <Link href="/mailserver" className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.5 19l-7-7 7-7"/></svg>
          </Link>
        </nav>

        <header className="pt-12 pb-12 text-left">
          <div className="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase border border-zinc-300 dark:border-zinc-700 rounded-full">Transport Layer Security</div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-black dark:text-white leading-tight">
            TLS <span className="text-zinc-400 dark:text-zinc-600">Encryption</span>
          </h1>
          <p className="max-w-xl text-zinc-500 dark:text-zinc-400 text-lg">Mengamankan jalur komunikasi email dengan enkripsi SSL/TLS agar kredensial dan data tidak dapat disadap.</p>
        </header>

        <main className="pb-20 space-y-8">
          
          {/* 1. Persiapan Sertifikat */}
          <section className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm">1</div>
              <h3 className="text-xl font-bold text-black dark:text-white">Persiapan Sertifikat</h3>
            </div>
            <p className="text-sm text-zinc-500 italic">Pastikan sertifikat snakeoil bawaan Ubuntu tersedia:</p>
            <CodeBlock title="Cek Sertifikat" id="tls1" code={`ls /etc/ssl/certs/ssl-cert-snakeoil.pem\nls /etc/ssl/private/ssl-cert-snakeoil.key`} onCopy={copyToClipboard} />
          </section>

          {/* 2. TLS SMTP */}
          <section className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm">2</div>
              <h3 className="text-xl font-bold text-black dark:text-white">Konfigurasi TLS Postfix</h3>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-zinc-500 mb-2 font-semibold">A. Wajibkan TLS di master.cf:</p>
                <CodeBlock title="sudo nano /etc/postfix/master.cf" id="tls2a" code={`submission inet n - y - - smtpd\n  -o syslog_name=postfix/submission\n  -o smtpd_sasl_auth_enable=yes\n  -o smtpd_tls_security_level=encrypt\n  -o smtpd_tls_auth_only=yes\n  -o smtpd_recipient_restrictions=permit_sasl_authenticated,reject`} onCopy={copyToClipboard} />
              </div>
              <div>
                <p className="text-sm text-zinc-500 mb-2 font-semibold">B. Set Path di main.cf:</p>
                <CodeBlock title="sudo nano /etc/postfix/main.cf" id="tls2b" code={`smtpd_tls_cert_file = /etc/ssl/certs/ssl-cert-snakeoil.pem\nsmtpd_tls_key_file = /etc/ssl/private/ssl-cert-snakeoil.key\nsmtpd_tls_security_level = may`} onCopy={copyToClipboard} />
              </div>
            </div>
          </section>

          {/* 3. TLS IMAP */}
          <section className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm">3</div>
              <h3 className="text-xl font-bold text-black dark:text-white">Konfigurasi TLS Dovecot</h3>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-zinc-500 mb-2 font-semibold">A. Aktifkan IMAPS (Port 993):</p>
                <CodeBlock title="sudo nano /etc/dovecot/conf.d/10-master.conf" id="tls3a" code={`service imap-login {\n  inet_listener imaps {\n    port = 993\n    ssl = yes\n  }\n}`} onCopy={copyToClipboard} />
              </div>
              <div>
                <p className="text-sm text-zinc-500 mb-2 font-semibold">B. Set Sertifikat (Gunakan tanda {'<'}):</p>
                <CodeBlock title="sudo nano /etc/dovecot/conf.d/10-ssl.conf" id="tls3b" code={`ssl = yes\nssl_cert = </etc/ssl/certs/ssl-cert-snakeoil.pem\nssl_key = </etc/ssl/private/ssl-cert-snakeoil.key`} onCopy={copyToClipboard} />
              </div>
            </div>
          </section>

          {/* 4. Pengujian */}
          <section className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm">4</div>
              <h3 className="text-xl font-bold text-black dark:text-white">Uji Koneksi TLS Manual</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm text-zinc-500 mb-2 font-semibold italic">Uji SMTP Submission (587):</p>
                <CodeBlock title="Terminal" id="tls4a" code={`openssl s_client -starttls smtp -connect localhost:587\n\n# Jika sukses, ketik di prompt:\nehlo test\nauth login\n# Masukkan Base64 User & Pass\n# Hasil: 235 2.7.0 Authentication successful`} onCopy={copyToClipboard} />
              </div>

              <div>
                <p className="text-sm text-zinc-500 mb-2 font-semibold italic">Uji IMAPS (993):</p>
                <CodeBlock title="Terminal" id="tls4b" code={`openssl s_client -connect localhost:993\n\n# Hasil: Harus muncul banner Dovecot ready.`} onCopy={copyToClipboard} />
              </div>
            </div>
          </section>

          {/* 5. Roundcube */}
          <section className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm">5</div>
              <h3 className="text-xl font-bold text-black dark:text-white">Update Konfigurasi Roundcube</h3>
            </div>
            <CodeBlock title="config.inc.php" id="tls5" code={`$config['smtp_host'] = 'tls://mail.nain.local:587';\n$config['smtp_auth_type'] = 'LOGIN';\n$config['smtp_conn_options'] = [\n    'tls' => [\n        'verify_peer' => false,\n        'verify_peer_name' => false,\n        'allow_self_signed' => true,\n    ],\n];`} onCopy={copyToClipboard} />
          </section>

          <div className="p-10 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] text-center">
            <h4 className="text-2xl font-black mb-2 text-black dark:text-white uppercase tracking-tighter">Status: Enkripsi Aktif</h4>
            <p className="text-zinc-500 text-sm">Tanpa TLS, autentikasi sekarang akan ditolak secara otomatis.</p>
          </div>

        </main>
      </div>
    </div>
  );
}

function CodeBlock({ title, id, code, onCopy }: any) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800">
      <div className="px-5 py-3 flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
        <span className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">{title}</span>
        <button id={id} onClick={() => onCopy(code, id)} className="text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
        </button>
      </div>
      <div className="p-6 font-mono text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed overflow-x-auto">
        <pre className="whitespace-pre">{code}</pre>
      </div>
    </div>
  );
}