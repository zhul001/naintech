"use client";
import React from "react";
import Link from "next/link";

export default function CommandsPage() {
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

  const commandGroups = [
    {
      category: "Navigasi & File",
      commands: [
        { cmd: "pwd", desc: "Direktori kerja saat ini" },
        { cmd: "cd", desc: "Berpindah direktori" },
        { cmd: "ls", desc: "Menampilkan isi direktori" },
        { cmd: "cat", desc: "Menampilkan isi file" },
        { cmd: "cp", desc: "Menyalin file/direktori" },
        { cmd: "mv", desc: "Memindahkan/rename file" },
        { cmd: "mkdir", desc: "Membuat direktori baru" },
        { cmd: "rm", desc: "Menghapus file/direktori" },
        { cmd: "touch", desc: "Membuat file baru kosong" },
        { cmd: "echo", desc: "Menampilkan baris teks" },
      ]
    },
    {
      category: "Sistem & Jaringan",
      commands: [
        { cmd: "ip a", desc: "Cek alamat IP & interface" },
        { cmd: "ping", desc: "Cek koneksi ke host" },
        { cmd: "hostname", desc: "Melihat nama komputer" },
        { cmd: "uname", desc: "Informasi sistem operasi" },
        { cmd: "df -h", desc: "Penggunaan disk (human-readable)" },
        { cmd: "top", desc: "Melihat proses berjalan" },
        { cmd: "kill", desc: "Mematikan proses (PID)" },
        { cmd: "systemctl", desc: "Mengelola layanan/service" },
        { cmd: "time", desc: "Mengukur waktu eksekusi" },
        { cmd: "shutdown", desc: "Mematikan/restart sistem" },
      ]
    },
    {
      category: "Administrasi & Arsip",
      commands: [
        { cmd: "su", desc: "Pindah ke user lain" },
        { cmd: "su -", desc: "Login sebagai Root (Full)" },
        { cmd: "chmod", desc: "Mengubah hak akses file" },
        { cmd: "chown", desc: "Mengubah pemilik file" },
        { cmd: "useradd", desc: "Membuat user baru" },
        { cmd: "userdel", desc: "Menghapus user" },
        { cmd: "tar", desc: "Mengelola arsip .tar" },
        { cmd: "unzip", desc: "Mengekstrak file .zip" },
        { cmd: "wget", desc: "Download file dari internet" },
        { cmd: "man", desc: "Manual bantuan perintah" },
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-6">

        <header className="pt-12 pb-12">
          <div className="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase border border-zinc-300 dark:border-zinc-700 rounded-full">
            Debian Cheat Sheet
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-black dark:text-white">
            Perintah <span className="text-zinc-400 dark:text-zinc-600">Esensial</span>
          </h1>
        </header>

        <main className="pb-20 space-y-16">
          {commandGroups.map((group, gIdx) => (
            <section key={gIdx}>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">{group.category}</h2>
                <div className="h-px grow bg-zinc-200 dark:bg-zinc-800"></div>
              </div>

              {/* Grid 2 Kolom untuk Desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {group.commands.map((c, cIdx) => (
                  <div key={cIdx} className="group flex items-center justify-between p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-zinc-400 transition-all shadow-sm">
                    <div className="flex flex-col">
                      <code className="text-sm font-bold text-black dark:text-white font-mono">{c.cmd}</code>
                      <span className="text-[11px] text-zinc-500 mt-0.5">{c.desc}</span>
                    </div>
                    <button 
                      id={`btn-${gIdx}-${cIdx}`}
                      onClick={() => copyToClipboard(c.cmd, `btn-${gIdx}-${cIdx}`)}
                      className="p-2 text-zinc-400 hover:text-black dark:hover:text-white bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-100 dark:border-zinc-700"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}