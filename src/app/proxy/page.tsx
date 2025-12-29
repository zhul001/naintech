"use client";
import { useState, useEffect } from "react";

// Menggunakan StepComponent yang sama (asumsi diletakkan di file yang sama atau import)
// Di sini saya sertakan struktur kontennya agar sesuai permintaan

export default function ProxyPage() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

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
      title: "install Squid",
      command: "apt install squid -y"
    },
    {
      id: 2,
      title: "Buat File Daftar Blokir",
      description: "Agar rapi kita buat dua file terpisah di dalam folder /etc/squid/",
      custom: (
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-zinc-500">• File blokir domain:</p>
            <CodeBox id="p-1" cmd="sudo nano /etc/squid/domain_blokir.txt" onCopy={copyToClipboard} />
            <p className="text-sm text-zinc-500 mt-4">Isi dengan domain yang ingin diblokir (satu per baris):</p>
            <CodeBox id="p-2" cmd={`facebook.com\nyoutube.com\ndetik.com`} onCopy={copyToClipboard} />
          </div>
          <div className="space-y-2 pt-4">
            <p className="text-sm text-zinc-500">• File blokir ekstensi file:</p>
            <CodeBox id="p-3" cmd="sudo nano /etc/squid/ekstensi_blokir.txt" onCopy={copyToClipboard} />
            <p className="text-sm text-zinc-500 mt-4">Isi dengan format file (menggunakan regex):</p>
            <CodeBox id="p-4" cmd={`\\.mp4$\n\\.jpg$\n\\.png$\n\\.iso$`} onCopy={copyToClipboard} />
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Konfigurasi Squid (squid.conf)",
      command: "sudo nano /etc/squid/squid.conf",
      description: "Cari baris http_access deny all (biasanya di tengah atau bawah), lalu tambahkan konfigurasi kamu di atas baris tersebut agar perintah blokir dijalankan lebih dulu:",
      custom: (
        <CodeBox 
          id="p-5" 
          cmd={`# 1. Definisikan ACL dengan memanggil file yang tadi dibuat\nacl situs_terlarang dstdomain "/etc/squid/domain_blokir.txt"\nacl file_terlarang urlpath_regex -i "/etc/squid/ekstensi_blokir.txt"\n\n# 2. Terapkan aturan blokir\nhttp_access deny situs_terlarang\nhttp_access deny file_terlarang\n\n# 3. Izinkan akses selain yang diblokir (pastikan ini ada)\nhttp_access allow all`} 
          onCopy={copyToClipboard} 
        />
      )
    },
    {
      id: 4,
      title: "Restart layanan",
      command: "systemctl restart squid"
    }
  ];

  if (!isClient) return null;

  return (
    <div className="max-w-4xl mx-auto px-6">
      <header className="pt-16 pb-12 text-left">
        <div className="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase border border-zinc-300 dark:border-zinc-700 rounded-full">
          Proxy Server Guide
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-black dark:text-white leading-tight">
          Konfigurasi <br /> <span className="text-zinc-400 dark:text-zinc-600">Proxy Server</span>
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl">
          Panduan install dan Konfigurasi Proxy Server menggunakan Squid pada debian.
        </p>
      </header>
      <main className="pb-20 space-y-6">
        {steps.map((step) => (
          <div key={step.id} className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-md">{step.id}</div>
              <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight">{step.title}</h3>
            </div>
            <div className="space-y-4 px-2">
              {step.description && <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{step.description}</p>}
              {step.command && <CodeBox id={`cp-${step.id}`} cmd={step.command} onCopy={copyToClipboard} />}
              {step.custom}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

function CodeBox({ id, cmd, onCopy }: { id: string, cmd: string, onCopy: any }) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800">
      <div className="px-5 py-3 flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
        <span className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">Perintah Terminal</span>
        <button id={id} onClick={() => onCopy(cmd, id)} className="text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
        </button>
      </div>
      <div className="p-6 font-mono text-sm text-zinc-600 dark:text-zinc-300 overflow-x-auto"><pre>{cmd}</pre></div>
    </div>
  );
}