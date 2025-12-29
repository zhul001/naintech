"use client";
import React from "react";

export default function RepoPage() {
  // Fungsi Copy to Clipboard dengan Ikon SVG
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

  const repoData = [
    {
      id: "debian-13",
      version: "Debian 13 (Trixie)",
      content: `deb http://deb.debian.org/debian trixie main contrib non-free non-free-firmware
deb http://security.debian.org/debian-security trixie-security main contrib non-free non-free-firmware
deb http://deb.debian.org/debian trixie-updates main contrib non-free non-free-firmware`
    },
    {
      id: "debian-12",
      version: "Debian 12 (Bookworm)",
      content: `deb http://deb.debian.org/debian bookworm main contrib non-free non-free-firmware
deb http://security.debian.org/debian-security bookworm-security main contrib non-free non-free-firmware
deb http://deb.debian.org/debian bookworm-updates main contrib non-free non-free-firmware`
    },
    {
      id: "debian-11",
      version: "Debian 11 (Bullseye)",
      content: `deb http://deb.debian.org/debian bullseye main contrib non-free
deb http://security.debian.org/debian-security bullseye-security main contrib non-free
deb http://deb.debian.org/debian bullseye-updates main contrib non-free`
    },
    {
      id: "debian-10",
      version: "Debian 10 (Buster)",
      content: `deb http://deb.debian.org/debian buster main contrib non-free
deb http://security.debian.org/debian-security buster/updates main contrib non-free
deb http://deb.debian.org/debian buster-updates main contrib non-free`
    }
  ];

  return (
    <div className="min-h-screen selection:bg-zinc-100 dark:selection:bg-zinc-800">
      {/* HEADER */}
      <header className="max-w-4xl mx-auto px-6 pt-12 pb-8 text-left">
        <div className="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase border border-zinc-300 dark:border-zinc-700 rounded-full">
          Package Management
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-black dark:text-white leading-tight">
          Konfigurasi <br /> 
          <span className="text-zinc-400 dark:text-zinc-600">Repositori APT</span>
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl">
          Daftar sumber paket resmi Debian untuk berbagai versi. Pastikan Anda memilih versi yang sesuai dengan sistem Anda.
        </p>
      </header>

      <main className="max-w-4xl mx-auto px-6 pb-20">
        
        {/* STEP 1: OPEN FILE */}
        <section className="mb-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-10 w-10 shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-md">1</div>
            <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight">Buka Berkas sources.list</h3>
          </div>
          
          <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800">
            <div className="px-5 py-3 flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <span className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">Perintah Terminal</span>
              <button 
                id="copy-open-file"
                onClick={() => copyToClipboard("nano /etc/apt/sources.list", "copy-open-file")} 
                className="text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
            </div>
            <div className="p-6 font-mono text-sm text-zinc-600 dark:text-zinc-300">
              <pre>nano /etc/apt/sources.list</pre>
            </div>
          </div>
        </section>

        {/* REPO LISTS */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">Salin & Tempel Versi Debian</h2>
            <div className="h-px grow bg-zinc-200 dark:bg-zinc-800"></div>
          </div>

          <div className="grid gap-4">
            {repoData.map((repo) => (
              <div key={repo.id} className="space-y-4">
                <div className="flex items-center gap-3">
                   <div className="h-2 w-2 rounded-full bg-black dark:bg-white shrink-0"></div>
                   <h3 className="text-lg font-bold text-black dark:text-white">{repo.version}</h3>
                </div>
                
                <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800 transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
                  <div className="px-5 py-3 flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
                    <span className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">Isi sources.list</span>
                    <button 
                      id={`copy-${repo.id}`}
                      onClick={() => copyToClipboard(repo.content, `copy-${repo.id}`)} 
                      className="text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="p-6 font-mono text-[11px] md:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed overflow-x-auto">
                    <pre className="whitespace-pre">{repo.content}</pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* REFRESH SECTION */}
        <section className="mt-4 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-10 w-10 shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-md">2</div>
            <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight">Perbarui Database Paket</h3>
          </div>
          
          <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800">
            <div className="px-5 py-3 flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <span className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">Perintah Terminal</span>
              <button 
                id="copy-update"
                onClick={() => copyToClipboard("apt update", "copy-update")} 
                className="text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
            </div>
            <div className="p-6 font-mono text-sm text-zinc-600 dark:text-zinc-300">
              <pre>apt update</pre>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}