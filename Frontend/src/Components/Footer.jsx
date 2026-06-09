
function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-2xl font-black tracking-tighter text-blue-500 mb-6">
            MY SHOPPIE
          </h2>
          <p className="text-gray-400 font-medium leading-relaxed">
            Your premium destination for the finest products. Quality guaranteed since 2026.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-6">
            Socials
          </h2>
          <ul className="space-y-4 text-gray-400 font-bold uppercase text-xs tracking-widest">
            <li className="hover:text-blue-400 cursor-pointer transition">Instagram</li>
            <li className="hover:text-blue-400 cursor-pointer transition">Facebook</li>
            <li className="hover:text-blue-400 cursor-pointer transition">Twitter</li>
            <li className="hover:text-blue-400 cursor-pointer transition">LinkedIn</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-6">
            Company
          </h2>
          <ul className="space-y-4 text-gray-400 font-bold uppercase text-xs tracking-widest">
            <li className="hover:text-blue-400 cursor-pointer transition">About Us</li>
            <li className="hover:text-blue-400 cursor-pointer transition">Careers</li>
            <li className="hover:text-blue-400 cursor-pointer transition">Privacy</li>
            <li className="hover:text-blue-400 cursor-pointer transition">Terms</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-6">
            Contact
          </h2>
          <div className="space-y-4">
            <p className="text-white font-bold text-sm">
              support@myshoppie.com
            </p>
            <p className="text-gray-400 font-bold text-sm">
              +91 98765 43210
            </p>
            <div className="pt-4">
              <span className="inline-block bg-blue-500/10 text-blue-400 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
                Available 24/7
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-[10px] font-black uppercase tracking-widest">
          <p>© {new Date().getFullYear()} MY SHOPPIE. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <span className="hover:text-white cursor-pointer transition">Legal</span>
            <span className="hover:text-white cursor-pointer transition">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

  