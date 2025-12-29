"use client";
import { useState } from "react";

export default function NetworkPage() {
  // Fungsi untuk Copy ke Clipboard dengan ikon SVG CamelCase
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    const btn = document.getElementById(id);
    if (btn) {
      // Ikon Centang (Success)
      btn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" class="text-green-500">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>`;
      
      setTimeout(() => {
        // Kembali ke Ikon Copy awal
        btn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>`;
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen ">
      
      <div className="max-w-4xl mx-auto px-6">
        
        <header className="pt-16 pb-12 text-left">
          <div className="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase border border-zinc-300 dark:border-zinc-700 rounded-full">
            Panduan Langkah-demi-Langkah
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-black dark:text-white leading-tight">
            Konfigurasi <br />{" "}
            <span className="text-zinc-400 dark:text-zinc-600">
              Antarmuka Jaringan
            </span>
          </h1>
        </header>

        <main className="pb-20">
          {/* Section 1: Referensi Tabel */}
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">
                Referensi Kelas IP Address
              </h2>
              <div className="h-px grow bg-zinc-200 dark:bg-zinc-800"></div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400">Kelas</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400">Rentang IP</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400">Default Subnet</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800/50">
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-8 py-6 font-bold text-black dark:text-white">Kelas A</td>
                      <td className="px-8 py-6 font-mono text-sm opacity-70">1.0.0.0 – 126.255.255.255</td>
                      <td className="px-8 py-6 font-mono text-sm opacity-70 italic">255.0.0.0 (/8)</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-8 py-6 font-bold text-black dark:text-white">Kelas B</td>
                      <td className="px-8 py-6 font-mono text-sm opacity-70">128.0.0.0 – 191.255.255.255</td>
                      <td className="px-8 py-6 font-mono text-sm opacity-70 italic">255.255.0.0 (/16)</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-8 py-6 font-bold text-black dark:text-white">Kelas C</td>
                      <td className="px-8 py-6 font-mono text-sm opacity-70">192.0.0.0 – 223.255.255.255</td>
                      <td className="px-8 py-6 font-mono text-sm opacity-70 italic">255.255.255.0 (/24)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">
                Langkah Pelaksanaan
              </h2>
              <div className="h-px grow bg-zinc-200 dark:bg-zinc-800"></div>
            </div>

            {/* Langkah 1 */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-md">1</div>
                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight">Pengaturan Adapter VirtualBox</h3>
              </div>
              <div className="bg-white dark:bg-zinc-900/50 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all hover:border-zinc-400 dark:hover:border-zinc-600">
                <ul className="space-y-4 text-sm text-zinc-500">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-black dark:bg-white shrink-0"></span>
                    <span>Buka Pengaturan (Settings) → Jaringan (Network)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-black dark:bg-white shrink-0"></span>
                    <span><b>Adapter 1:</b> Atur ke NAT</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-black dark:bg-white shrink-0"></span>
                    <span><b>Adapter 2:</b> Host-Only → Advance → Mode Promiscuous: Izinkan Semua</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Langkah 2 */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-md">2</div>
                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight">Konfigurasi IP Address</h3>
              </div>
              <div className="space-y-4">
                <CodeBlock 
                  title="Perintah Terminal" 
                  id="copy-1" 
                  code="nano /etc/network/interfaces" 
                  onCopy={copyToClipboard} 
                />
                <CodeBlock 
                  title="Isi Konfigurasi" 
                  id="copy-2" 
                  code={`allow-hotplug enp0s3\niface enp0s3 inet dhcp\n\nauto enp0s8\niface enp0s8 inet static\n    address 192.168.10.28\n    netmask 255.255.255.0`} 
                  onCopy={copyToClipboard} 
                />
              </div>
            </div>

            {/* Langkah 3 (BARU) */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-md">3</div>
                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight">Restart Layanan Jaringan</h3>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-zinc-500 px-2 leading-relaxed">
                  Jalankan perintah berikut untuk menerapkan perubahan konfigurasi yang telah disimpan.
                </p>
                <CodeBlock 
                  title="Perintah Restart" 
                  id="copy-restart" 
                  code="systemctl restart networking" 
                  onCopy={copyToClipboard} 
                />
              </div>
            </div>

            {/* Langkah 4 (Sebelumnya Langkah 3) */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-md">4</div>
                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight">Konfigurasi Host Windows</h3>
              </div>
              <div className="bg-white dark:bg-zinc-900/50 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all hover:border-zinc-400 dark:hover:border-zinc-600">
                <div className="grid lg:grid-cols-2 gap-8 text-sm text-zinc-500">
                  <div className="space-y-3 leading-relaxed">
                    <p>1. Buka <b>Network & Sharing Center</b> di Control Panel</p>
                    <p>2. Pilih <b>Change adapter settings</b></p>
                    <p>3. Klik kanan pada <b>VirtualBox Host-Only Network</b> → Properties</p>
                    <p>4. Pilih <b>IPv4</b> → Klik Properties</p>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 font-mono text-[13px] space-y-2">
                    <div className="flex justify-between border-b border-zinc-200/50 dark:border-zinc-800 pb-1"><span>IP Address:</span> <span className="text-black dark:text-white">192.168.10.2</span></div>
                    <div className="flex justify-between border-b border-zinc-200/50 dark:border-zinc-800 pb-1"><span>Subnet Mask:</span> <span className="text-black dark:text-white">255.255.255.0</span></div>
                    <div className="flex justify-between border-b border-zinc-200/50 dark:border-zinc-800 pb-1"><span>Gateway:</span> <span className="text-black dark:text-white">192.168.10.28</span></div>
                    <div className="flex justify-between"><span>DNS Server:</span> <span className="text-black dark:text-white">192.168.10.28</span></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

// Komponen Helper untuk Code Block dengan SVG CamelCase
function CodeBlock({ title, id, code, onCopy }: { title: string, id: string, code: string, onCopy: any }) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800">
      <div className="px-5 py-3 flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
        <span className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">{title}</span>
        <button id={id} onClick={() => onCopy(code, id)} className="text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
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
      <div className="p-6 font-mono text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed overflow-x-auto">
        <pre className="whitespace-pre-wrap">{code}</pre>
      </div>
    </div>
  );
}