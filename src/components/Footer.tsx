import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-brand-900 text-slate-200 mt-10">
      <div className="mx-auto w-[min(1180px,92vw)] py-10 grid gap-8 md:grid-cols-3">
        <div>
          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
            <img
              src="/optimized/osha_logo.webp"
              alt="OSHA Clothing logo"
              width={40}
              height={40}
              className="h-9 w-9 object-contain rounded"
              loading="lazy"
              decoding="async"
            />
            OSHA Clothing & Apparels
          </h4>
          <p className="text-sm text-slate-300">
            Premium fashion collections with modern silhouettes, festive styles, and winter essentials.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">Quick Links</h4>
          <ul className="text-sm flex flex-col gap-2">
            <li>
              <Link to="/" className="inline-block hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className="inline-block hover:text-white">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/cart" className="inline-block hover:text-white">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/contact" className="inline-block hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">Contact</h4>
          <ul className="text-sm flex flex-col gap-2">
            <li>
              <a
                href="https://wa.me/9779851003737"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-block hover:text-white"
              >
                WhatsApp: +977 985-1003737
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/profile.php?id=61583871238196"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-block hover:text-white"
              >
                Facebook Page
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto w-[min(1240px,94vw)] pb-5 flex flex-col md:flex-row gap-2 md:gap-4 md:items-center">
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} OSHA Clothing & Apparels
        </p>
        <a
          href="https://sajedar.com"
          className="text-xs text-slate-400 md:ml-auto hover:text-white"
        >
          Powered by sajedar.com
        </a>
      </div>
    </footer>
  );
}

export default Footer;
