"use client";
import { useState } from "react";

// Komponen Helper untuk Code Block
function CodeBlock({ title, id, code, onCopy, output }: { title: string, id: string, code: string, onCopy: any, output?: string }) {
  return (
    <div className="space-y-4">
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
      
      {output && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-800">
          <div className="px-5 py-3 flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
            <span className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">Hasil Output</span>
          </div>
          <div className="p-6 font-mono text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed overflow-x-auto bg-white dark:bg-zinc-900">
            <pre className="whitespace-pre-wrap">{output}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SambaPage() {
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
            Panduan File Sharing
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-black dark:text-white leading-tight">
            Konfigurasi <br />{" "}
            <span className="text-zinc-400 dark:text-zinc-600">
              Samba Server
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

            {/* Langkah 1 & 2 */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-md">1</div>
                  <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight">Install Samba</h3>
                </div>
                <CodeBlock title="Perintah Terminal" id="copy-1" code="apt update && apt install samba -y" onCopy={copyToClipboard} />
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-md">2</div>
                  <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight">Buat Direktori</h3>
                </div>
                <CodeBlock title="Perintah Terminal" id="copy-2" code="mkdir -p /samba/shared-nain" onCopy={copyToClipboard} />
              </div>
            </div>

            {/* Langkah 3 & 4 */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-md">3</div>
                  <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight">Atur Izin Akses</h3>
                </div>
                <CodeBlock title="Perintah Terminal" id="copy-3" code="chmod 777 /samba/shared-nain" onCopy={copyToClipboard} />
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-md">4</div>
                  <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight">User Samba</h3>
                </div>
                <CodeBlock title="Perintah Terminal" id="copy-4" code="smbpasswd -a nain" onCopy={copyToClipboard} />
              </div>
            </div>

            {/* Langkah 5 */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-md">5</div>
                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight">Konfigurasi smb.conf</h3>
              </div>
              <CodeBlock title="Perintah Terminal" id="copy-5-cmd" code="nano /etc/samba/smb.conf" onCopy={copyToClipboard} />
              <CodeBlock title="Isi Konfigurasi" id="copy-5-cfg" code={`[shared-nain]\n   path = /samba/shared-nain\n   browseable = yes\n   writable = yes\n   read only = no\n   guest ok = no\n   valid users = nain`} onCopy={copyToClipboard} />
            </div>

            {/* Langkah 6 */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-md">6</div>
                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight">Restart Service</h3>
              </div>
              <CodeBlock title="Perintah Terminal" id="copy-6" code="systemctl restart smbd" onCopy={copyToClipboard} />
            </div>

            {/* Langkah 7 - Pengujian */}
            <div className="pt-10 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-4 mb-10">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg shadow-md">7</div>
                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight">Pengujian Akses</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="space-y-4">
                  <h4 className="font-bold text-black dark:text-white">Via GUI Windows</h4>
                  <CodeBlock 
                    title="Run Command" 
                    id="test-1" 
                    code="\\192.168.10.28\\shared-nain" 
                    onCopy={copyToClipboard} 
                  />
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold text-black dark:text-white">Via Terminal Windows</h4>
                  <CodeBlock 
                    title="CMD / PowerShell" 
                    id="test-2" 
                    code="net use z: \\192.168.10.28\\shared-nain /user:nain 123" 
                    onCopy={copyToClipboard} 
                  />
                </div>
              </div>

              {/* Note: Desain Box disamakan dengan Step 4 Network */}
              <div className="bg-white dark:bg-zinc-900/50 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all hover:border-zinc-400 dark:hover:border-zinc-600">
                <div className="flex items-center gap-3 text-sm text-zinc-500 italic">
                  <span><b>Note:</b> Jika gagal akses, matikan <b>Windows Firewall</b> terlebih dahulu.</span>
                </div>
              </div>

            </div>
          </section>
        </main>
      </div>
    </div>
  );
}