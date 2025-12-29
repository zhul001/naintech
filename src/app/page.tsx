import Link from "next/link";

const modules = [
  { title: "Perintah Debian", desc: "Daftar perintah CLI esensial", icon: "fa-terminal", link: "/command" },
  { title: "Network", desc: "Konfigurasi IP Address debian", icon: "fa-network-wired", link: "/network-deb" },
  { title: "Network", desc: "Konfigurasi IP Address ubuntu", icon: "fa-network-wired", link: "/network-ubu" },
  { title: "Repositori", desc: "Manajemen sumber paket APT", icon: "fa-box-archive", link: "/repo" },
  { title: "SSH Server", desc: "Akses remote via OpenSSH", icon: "fa-lock", link: "/sshserver" },
  { title: "DNS Server", desc: "Bind9 domain & IP Mapping", icon: "fa-globe", link: "/dns" },
  { title: "Web Server", desc: "Apache, PHP, dan MySQL", icon: "fa-server", link: "/webserver" },
  { title: "Mail Server", desc: "Postfix, Dovecot & Roundcube.", icon: "fa-envelope", link: "/mailserver" },
  { title: "FTP Server", desc: "File transfer menggunakan vsftpd", icon: "fa-folder-open", link: "/ftp" },
  { title: "Proxy Server", desc: "Kontrol akses dengan Squid", icon: "fa-shield-alt", link: "/proxy" },
  { title: "File Sharing", desc: "Berbagi file via Samba", icon: "fa-share-nodes", link: "/samba" },
  { title: "Panel Server", desc: "Manajemen sistem via Webmin", icon: "fa-gauge-high", link: "https://webmin.com/download/" },
  { title: "Kontainer", desc: "Virtualisasi OS via Docker", icon: "fa-docker", link: "https://docs.docker.com/engine/install/debian/" },
  { title: "Kontainer", desc: "GUI manajemen Docker via portainer", icon: "fa-cubes", link: "https://docs.portainer.io/start/install-ce/server/docker/linux#docker-compose" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <div className="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase border border-zinc-300 dark:border-zinc-700 rounded-full">
          Documentation 2025
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-black dark:text-white">
          Panduan Konfigurasi <br />
          <span className="text-zinc-400 dark:text-zinc-600">
            Debian Server
          </span>
        </h1>
        <p className="max-w-xl text-zinc-500 dark:text-zinc-400 text-lg">
          Panduan langkah-demi-langkah administrasi sistem Debian dan
          distribusinya. Dirancang untuk membantu konfigurasi sistem pada Debian
          maupun sistem operasi turunannya.
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-20">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400">
            Modul Pembelajaran
          </h2>
          <div className="h-px grow bg-zinc-200 dark:bg-zinc-800"></div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="group relative bg-white dark:bg-card-dark rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 transition-all duration-300 hover:border-black dark:hover:border-white overflow-hidden"
            >
              <div className="absolute inset-0 bg-black dark:bg-white translate-y-full group-hover:translate-y-[0%] transition-transform duration-300 ease-in-out opacity-[0.02] dark:opacity-[0.05]"></div>

              <div className="relative z-10">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 mb-6 group-hover:scale-110 transition-transform">
                  <i
                    className={`fas text-xl text-zinc-800 dark:text-zinc-200 ${item.icon}`}
                  ></i>
                </div>
                <h3 className="font-bold text-xl mb-2 text-black dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-12">
          <div className="relative">
            <Link href="troubleshooting" className="group block">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-black dark:text-zinc-400 transition-colors duration-300">
                Troubleshooting
              </h2>
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-black dark:bg-zinc-400 transition-all duration-500 ease-in-out group-hover:w-full"></span>
            </Link>
          </div>

          <div className="h-px grow bg-zinc-200 dark:bg-zinc-800"></div>
        </div>
      </main>
    </div>
  );
}
