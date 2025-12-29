"use client";
import React from "react";
import Link from "next/link";

export default function InterVMMailPage() {
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

        <header className="pt-12 pb-6 text-left">
          <div className="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase border border-zinc-300 dark:border-zinc-700 rounded-full">Multi-Server Communication</div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-black dark:text-white leading-tight">
            Mail <span className="text-zinc-400 dark:text-zinc-600">Antar VM</span>
          </h1>
          <p className="max-w-xl text-zinc-500 dark:text-zinc-400 text-lg">Konfigurasi DNS Forwarding agar dua VM dapat saling mengenali dan berkirim email melalui Roundcube maupun Telnet.</p>
        </header>

        <main className="pb-20 space-y-6">
          
          {/* Prasyarat */}
          <section className="bg-white dark:bg-zinc-900/50 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all hover:border-zinc-400 dark:hover:border-zinc-600">
            <h3 className="text-xl font-bold mb-4">Prasyarat Network</h3>
            <ul className="gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400">
              <li>• VM 2: lakukan konfigurasi seperti di vm1</li>
              <li>• VM 2: pastikan berada dalam satu subnet(3 blok pertama pada ip) yang sama agar bisa saling PING.</li>
            </ul>
          </section>

          {/* Konfigurasi DNS VM1 */}
          <section className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm">1</div>
              <h3 className="text-xl font-bold text-black dark:text-white">Konfigurasi VM 1 (nain.com)</h3>
            </div>
            <p className="text-sm text-zinc-500 italic">Tambahkan zona forward agar VM 1 bisa bertanya tentang tkk.com ke VM 2:</p>
            <CodeBlock title="sudo nano /etc/bind/named.conf.local" id="vm1-dns" code={`zone "tkk.com" {\n    type forward;\n    forwarders { 192.168.10.30; };\n};`} onCopy={copyToClipboard} />
          </section>

          {/* Konfigurasi DNS VM2 */}
          <section className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm">2</div>
              <h3 className="text-xl font-bold text-black dark:text-white">Konfigurasi VM 2 (tkk.com)</h3>
            </div>
            <p className="text-sm text-zinc-500 italic">Tambahkan zona forward agar VM 2 bisa bertanya tentang nain.com ke VM 1:</p>
            <CodeBlock title="sudo nano /etc/bind/named.conf.local" id="vm2-dns" code={`zone "nain.com" {\n    type forward;\n    forwarders { 192.168.10.28; };\n};`} onCopy={copyToClipboard} />
            <CodeBlock title="Restart Layanan" id="restart-dns" code="sudo systemctl restart bind9" onCopy={copyToClipboard} />
          </section>

          {/* Pengujian (Step 3) */}
          <section className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm">3</div>
              <h3 className="text-xl font-bold text-black dark:text-white">Uji Koneksi & Pengiriman Mail menggunakan rouncube dan telnet</h3>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}

function CodeBlock({ title, id, code, onCopy }: any) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800 transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
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