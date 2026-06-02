
function Footer() {
  return (
    <footer className="bg-black text-white mt-10">
      
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand Section */}
        <div>
  <h2 className="text-xl font-semibold mb-3">
    Follow Us
  </h2>

  <ul className="space-y-2 text-gray-400">
    <li>Instagram</li>
    <li>Facebook</li>
    <li>Twitter</li>
    <li>LinkedIn</li>
  </ul>
</div>

        {/* Quick Links */}
        <div>
  <h2 className="text-xl font-semibold mb-3">
    Company
  </h2>

  <ul className="space-y-2 text-gray-400">
    <li>About Us</li>
    <li>Careers</li>
    <li>Privacy Policy</li>
    <li>Terms & Conditions</li>
  </ul>
</div>

        {/* Contact */}
        <div>
          <h2 className="text-xl font-semibold mb-3">
            Contact
          </h2>

          <p className="text-gray-400">
            Email: support@ecommerce.com
          </p>

          <p className="text-gray-400">
            Phone: +91 98765 43210
          </p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-gray-500">
        © {new Date().getFullYear()} E-Commerce. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;

  