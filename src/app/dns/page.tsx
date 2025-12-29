"use client";
import { useState } from "react";

// Komponen Helper untuk Code Block - Sekarang Output & Perintah identik secara visual
function CodeBlock({ title, id, code, onCopy, output }: { title: string, id: string, code: string, onCopy: any, output?: string }) {
  return (
    <div className="space-y-4">
      {/* Box Utama (Perintah/Konfigurasi) */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800">
        <div className="px-5 py-3 flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
          <span className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">{title}</span>
          <button id={id} onClick={() => onCopy(code, id)} className="text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        </div>
        <div className="p-6 font-mono text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed overflow-x-auto bg-white dark:bg-zinc-900">
          <pre className="whitespace-pre-wrap">{code}</pre>
        </div>
      </div>
      
      {/* Box Hasil Output - Sekarang menggunakan class yang SAMA dengan box di atas */}
      {output && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800">
          <div className="px-5 py-3 flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
            <span className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">Hasil Output</span>
            {/* Tombol copy opsional untuk output */}
            <button id={`${id}-out`} onClick={() => onCopy(output, `${id}-out`)} className="text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

export default function DnsPage() {
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
    <div className="min-h-screen selection:bg-zinc-100 dark:selection:bg-zinc-800">
      <div className="max-w-4xl mx-auto px-6">
        
        <header className="pt-16 pb-12 text-left">
          <div className="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase border border-zinc-300 dark:border-zinc-700 rounded-full">
            Panduan Langkah-demi-Langkah
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-black dark:text-white leading-tight">
            Konfigurasi <br />{" "}
            <span className="text-zinc-400 dark:text-zinc-600">
              DNS Server Bind9
            </span>
          </h1>
        </header>

        <main className="pb-20">
          <section className="space-y-6">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">
                Langkah Pelaksanaan
              </h2>
              <div className="h-px grow bg-zinc-200 dark:bg-zinc-800"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-md">1</div>
                  <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight">Update dan Install Bind9</h3>
                </div>
                <CodeBlock title="Perintah Terminal" id="copy-1" code="apt update && apt install bind9 -y" onCopy={copyToClipboard} />
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-md">2</div>
                  <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight">Masuk ke Direktori Bind</h3>
                </div>
                <CodeBlock title="Perintah Terminal" id="copy-2" code="cd /etc/bind" onCopy={copyToClipboard} />
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-md">3</div>
                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight">Konfigurasi Zone</h3>
              </div>
              <p className="text-sm text-zinc-500 px-2 leading-relaxed">Tambahkan baris berikut di paling bawah: (db.nain dan db.ip itu nama file jadi anda bebas pakai nama apa aja, untuk domain juga bebas)</p>
              <CodeBlock title="Isi Konfigurasi" id="copy-3" code={`zone "nain.com" {\n    type master;\n    file "/etc/bind/db.nain";\n};\n\nzone "10.168.192.in-addr.arpa" {\n    type master;\n    file "/etc/bind/db.ip";\n};`} onCopy={copyToClipboard} />
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-md">4</div>
                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight">Membuat DNS Zone Forward</h3>
              </div>
              <p className="text-sm text-zinc-500 px-2 leading-relaxed">Sekarang kita buat file zone forward yang memetakan domain nain.com ke alamat IP server. Edit isinya menjadi seperti dibawah ini:</p>
              <CodeBlock title="Perintah Terminal" id="copy-4-cmd" code="nano db.nain" onCopy={copyToClipboard} />
              <CodeBlock title="Isi Konfigurasi" id="copy-4-cfg" code={`$TTL    604800\n@       IN      SOA     nain.com. root.nain.com. (\n                              2         ; Serial\n                         604800         ; Refresh\n                          86400         ; Retry\n                        2419200         ; Expire\n                         604800 )       ; Negative Cache TTL\n;\n@       IN      NS      nain.com.\n@       IN      A       192.168.10.28\nwww     IN      A       192.168.10.28`} onCopy={copyToClipboard} />
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-md">5</div>
                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight">Membuat DNS Zone Reverse</h3>
              </div>
              <p className="text-sm text-zinc-500 px-2 leading-relaxed">Sekarang kita buat file zone reverse untuk pemetaan alamat IP ke hostname nain.com. Edit isinya menjadi seperti dibawah ini: (perhatikan di pojok kiri bawah adalah 28, ini adalah bagian terakhir dari IP anda)</p>
              <CodeBlock title="Perintah Terminal" id="copy-5-cmd" code="nano db.ip" onCopy={copyToClipboard} />
              <CodeBlock title="Isi Konfigurasi" id="copy-5-cfg" code={`$TTL    604800\n@       IN      SOA     nain.com. root.nain.com. (\n                              1         ; Serial\n                         604800         ; Refresh\n                          86400         ; Retry\n                        2419200         ; Expire\n                         604800 )       ; Negative Cache TTL\n;\n@       IN      NS      nain.com.\n28      IN      PTR     nain.com.`} onCopy={copyToClipboard} />
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-md">6</div>
                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight">Cek Kesalahan</h3>
              </div>
              <p className="text-sm text-zinc-500 px-2 leading-relaxed">Jika tidak muncul pesan error, berarti konfigurasi sudah benar!</p>
              <CodeBlock title="Perintah Terminal" id="copy-6" code="named-checkconf" onCopy={copyToClipboard} />
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-md">7</div>
                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight">Pengaturan DNS Resolver & Restart</h3>
              </div>
              <p className="text-sm text-zinc-500 px-2 leading-relaxed">Konfigurasikan Debian agar menggunakan DNS lokal untuk resolusi domain. Edit /etc/resolv.conf. Pastikan ada baris: nameserver 192.168.10.28, kalau tidak ada maka tambahkan. Terakhir, restart layanannya:</p>
              <CodeBlock title="Perintah Terminal" id="copy-7" code={`nano /etc/resolv.conf\nsystemctl restart bind9`} onCopy={copyToClipboard} />
            </div>

            <div className="pt-10 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-4 mb-10">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-md">8</div>
                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight">Pengujian</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-bold text-black dark:text-white">Tes Domain</h4>
                  <CodeBlock 
                    title="Perintah Terminal" 
                    id="test-1" 
                    code="nslookup nain.com" 
                    onCopy={copyToClipboard} 
                    output={`Server:         192.168.10.28\nAddress:        192.168.10.28#53\n\nName:   nain.com\nAddress: 192.168.10.28`}
                  />
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold text-black dark:text-white">Tes IP</h4>
                  <CodeBlock 
                    title="Perintah Terminal" 
                    id="test-2" 
                    code="nslookup 192.168.10.28" 
                    onCopy={copyToClipboard} 
                    output={`28.10.168.192.in-addr.arpa      name = nain.com.`}
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}