"use client";
import { useState, useEffect } from "react";

interface StepProps {
  id: number;
  title: string;
  command: string;
  description?: React.ReactNode | null;
  config?: string | null;
  notes?: string[] | null;
}

const StepComponent = ({ step }: { step: StepProps }) => {
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
        {/* Deskripsi diletakkan di atas Command */}
        {step.description && (
          <div className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed px-2">
            {step.description}
          </div>
        )}

        {step.command && (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800">
            <div className="px-5 py-3 flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <span className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">Perintah Terminal</span>
              <button
                id={`copy-command-${step.id}`}
                onClick={() => copyToClipboard(step.command, `copy-command-${step.id}`)}
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

        {step.notes && step.notes.length > 0 && (
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
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

export default function SSHServerPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const steps = {
    step1: { 
      id: 1, 
      title: "Instal OpenSSH Server", 
      command: "sudo apt install openssh-server -y",
      description: "Jalankan perintah tersebut untuk menginstal paket server SSH pada sistem Anda."
    },
    step2: { 
      id: 2, 
      title: "test ssh server", 
      command: "ssh nain@192.168.1.28",
      description: (
        <>
          Kamu bisa tes langsung dari terminal atau menggunakan aplikasi seperti{" "}
          <a 
            href="https://mobaxterm.mobatek.net/download.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative inline-block text-zinc-900 dark:text-zinc-100 font-medium group"
          >
            mobaxterm
            <span className="absolute left-0 bottom-0 w-full h-px bg-zinc-900 dark:bg-zinc-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
          </a>.
        </>
      ),
      notes: [
        "Are you sure you want to continue connecting (yes/no/[fingerprint])?, ketik yes",
        "lalu masukkan password user pada server ketika diminta."
      ]
    }
  };

  if (!isClient) return null;

  return (
    <div className="selection:bg-zinc-100 dark:selection:bg-zinc-800">
      <div className="max-w-4xl mx-auto px-6">
        <header className="pt-16 pb-12 text-left">
          <div className="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase border border-zinc-300 dark:border-zinc-700 rounded-full">
            SSH Server Guide
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-black dark:text-white leading-tight">
            Install <br />{" "}
            <span className="text-zinc-400 dark:text-zinc-600">
              SSH Server
            </span>
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl">
            Panduan install OpenSSH Server.
          </p>
        </header>

        <main className="pb-20">
          <section className="space-y-6">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">
                Langkah Instalasi & Konfigurasi
              </h2>
              <div className="h-px grow bg-zinc-200 dark:bg-zinc-800"></div>
            </div>

            <StepComponent step={steps.step1} />
            <StepComponent step={steps.step2} />
          </section>
        </main>
      </div>
    </div>
  );
}