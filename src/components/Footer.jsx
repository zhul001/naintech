export default function Footer() {
  return (
    <footer className="max-w-6xl mx-auto px-6 pb-12 mt-20">
      <div className="border-t border-zinc-200 dark:border-zinc-800 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-black tracking-widest uppercase opacity-50">
            © 2025 Nain. All Rights Reserved.
          </span>
        </div>
        <div className="flex gap-8">
          <a href="https://github.com/zhul001" className="text-zinc-400 hover:text-black dark:hover:text-white transition-colors"><i className="fab fa-github"></i></a>
          <a href="https://www.instagram.com/nain.nz" className="text-zinc-400 hover:text-black dark:hover:text-white transition-colors"><i className="fab fa-instagram"></i></a>
          <a href="https://wa.me/message/PHPRQOCZTB44G1" className="text-zinc-400 hover:text-black dark:hover:text-white transition-colors"><i className="fab fa-whatsapp"></i></a>
        </div>
      </div>
    </footer>
  );
}