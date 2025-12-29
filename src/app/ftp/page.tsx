"use client";
import { useState, useEffect } from "react";

interface StepProps {
  id: number;
  title: string;
  command?: string | null;
  description?: string | null;
  notes?: string[] | null;
  customContent?: React.ReactNode;
}

const StepComponent = ({ step }: { step: StepProps }) => {
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
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-md">
          {step.id}
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight">
          {step.title}
        </h3>
      </div>

      <div className="space-y-4">
        {step.command && (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800">
            <div className="px-5 py-3 flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <span className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">Perintah Terminal</span>
              <button
                id={`copy-ftp-${step.id}`}
                onClick={() => copyToClipboard(step.command!, `copy-ftp-${step.id}`)}
                className="text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
            </div>
            <div className="p-6 font-mono text-sm text-zinc-600 dark:text-zinc-300 overflow-x-auto">
              <pre>{step.command}</pre>
            </div>
          </div>
        )}

        {step.description && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed px-2">
            {step.description}
          </p>
        )}

        {step.notes && (
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <ul className="space-y-3 text-sm text-zinc-500 dark:text-zinc-400">
              {step.notes.map((note, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 mt-2 rounded-full bg-black dark:bg-white shrink-0"></span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default function FTPPage() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const steps = [
    {
      id: 1,
      title: "Install vsftpd",
      command: "apt install vsftpd -y"
    },
    {
      id: 2,
      title: "Konfigurasi vsftpd",
      command: "nano /etc/vsftpd.conf",
      description: "File konfigurasinya ada di /etc/vsftpd.conf. Kita perlu mengaktifkan fitur tulis (upload) karena secara default FTP hanya mengizinkan baca (download).",
      notes: [
        "Cari dan pastikan baris-baris berikut tidak ada tanda pagar (#) di depannya:",
        "- local_enable=YES (Mengizinkan user lokal/sistem untuk login)",
        "- write_enable=YES (Mengizinkan user untuk upload file)",
        "- local_umask=022 (Mengatur permission file yang diupload)"
      ]
    },
    {
      id: 3,
      title: "Restart layanan",
      command: "systemctl restart vsftpd"
    },
    {
      id: 4,
      title: "Tes FTP Server",
      command: "ftp 192.168.10.28",
      description: "Kamu bisa tes langsung dari terminal atau menggunakan aplikasi seperti mobaxtrem.",
      notes: [
        "Panduan",
        "• lcd: untuk berpindah direktori windows",
        "• !dir: untuk melihat file di direktori windows",
        "• pwd: untuk melihat direktori server saat ini",
        "• cd: untuk berpindah direktori server",
        "• ls: untuk melihat file di direktori server",
        "• put: untuk mengupload file dari windows ke server",
        "• get: untuk mengunduh file dari server ke windows",
        "• quit: untuk keluar dari FTP"
      ]
    },
    {
      id: 5,
      title: "Konfigurasi tambahan",
      notes: [
        "opsional konfigurasi vsftpd",
        "● anonymous_enable=NO : Mematikan akses tamu; login wajib pakai akun resmi.",
        "● dirmessage_enable=YES : Munculkan pesan otomatis saat user masuk ke folder.",
        "● use_localtime=YES : Pakai waktu lokal server pada keterangan waktu file.",
        "● xferlog_enable=YES : Mencatat riwayat upload dan download ke dalam file log.",
        "● connect_from_port_20=YES : Menggunakan port 20 untuk jalur transfer data.",
        "● chroot_local_user=YES : Mengunci user agar tidak bisa keluar dari folder home.",
        "● chroot_list_enable=YES : Mengaktifkan daftar pengecualian akses folder.",
        "● chroot_list_file=/etc/vsftpd.chroot_list : Fitur pengecualian. User yang terdaftar di sini boleh keluar dari folder home.",
        "● ls_recurse_enable=YES : Izin melihat file hingga ke dalam sub-direktori.",
        "● pam_service_name=vsftpd : Menggunakan sistem verifikasi login milik Debian.",
        "● ssl_enable=NO : Mematikan enkripsi agar transfer data lebih sederhana."
      ]
    }
  ];

  if (!isClient) return null;

  return (
    <div className="max-w-4xl mx-auto px-6">
      <header className="pt-16 pb-12 text-left">
        <div className="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase border border-zinc-300 dark:border-zinc-700 rounded-full">
          FTP Server Guide
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-black dark:text-white leading-tight">
          Konfigurasi <br /> <span className="text-zinc-400 dark:text-zinc-600">FTP Server</span>
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl">
          Panduan install dan Konfigurasi FTP Server menggunakan vsftpd pada debian.
        </p>
      </header>
      <main className="pb-20 space-y-6">
        {steps.map((s) => <StepComponent key={s.id} step={s} />)}
      </main>
    </div>
  );
}