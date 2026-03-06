import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

function Header() {
  const { count } = useCart();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
  };

  const navClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'text-brand-500 font-semibold tracking-wide'
      : 'text-slate-600 hover:text-brand-500 font-semibold tracking-wide';

  return (
    <header className="bg-white/95 backdrop-blur border-b border-slate-200 shadow-[0_6px_24px_rgba(15,23,42,0.04)]">
      <div className="bg-brand-700 text-white text-sm">
        <div className="mx-auto w-[min(1240px,94vw)] py-2 flex items-center justify-end gap-2">
          <a
            href="https://wa.me/9779851003737"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="WhatsApp"
            className="grid place-items-center h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.174.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.787-1.48-1.76-1.653-2.058-.174-.297-.018-.458.13-.606.133-.132.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.206-.242-.579-.487-.5-.669-.509-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.693.626.712.227 1.36.195 1.872.119.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            </svg>
            <span className="sr-only">WhatsApp</span>
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61583871238196"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Facebook"
            className="grid place-items-center h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.88 3.78-3.88 1.09 0 2.23.19 2.23.19v2.46H15.2c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0022 12z" />
            </svg>
            <span className="sr-only">Facebook</span>
          </a>
        </div>
      </div>

      <div className="mx-auto w-[min(1240px,94vw)] py-5 grid gap-3 lg:grid-cols-[1fr_minmax(300px,560px)_auto] items-center">
        <Link to="/" className="flex items-center gap-3.5">
          <img
            src="/optimized/osha_logo.jpg"
            alt="OSHA Clothing logo"
            width={60}
            height={60}
            className="h-12 w-12 object-contain rounded-md ring-1 ring-slate-200"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <span>
            <span className="block font-extrabold tracking-[0.15em] text-slate-900 leading-none">OSHA</span>
            <span className="block text-slate-500 text-[15px] mt-1">Clothing & Apparels</span>
          </span>
        </Link>

        <form
          onSubmit={onSearch}
          className="flex rounded-full border border-slate-300 overflow-hidden bg-white shadow-inner"
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, category, color..."
            className="w-full px-5 py-3 outline-none text-[15px]"
          />
          <button type="submit" className="bg-brand-500 text-white px-5 font-semibold">
            Search
          </button>
        </form>

        <Link
          to="/cart"
          aria-label="Open cart"
          className="relative justify-self-start lg:justify-self-end bg-slate-900 text-white p-2.5 rounded-full hover:bg-slate-800 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386a1.5 1.5 0 011.44 1.08l.383 1.26m0 0h13.716a1.5 1.5 0 011.449 1.888l-1.2 4.2a1.5 1.5 0 01-1.449 1.112H8.265a1.5 1.5 0 01-1.44-1.08L5.46 5.34zM8.25 19.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm9 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
          </svg>
          <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-accent text-white text-[11px] font-bold grid place-items-center">
            {count}
          </span>
        </Link>
      </div>

      <nav className="border-y border-slate-200 bg-white/85">
        <div className="mx-auto w-[min(1240px,94vw)] flex gap-7 py-3.5 overflow-x-auto whitespace-nowrap">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>
          <NavLink to="/shop" className={navClass}>
            Shop
          </NavLink>
          <NavLink to="/shop?category=Women" className={navClass}>
            Women
          </NavLink>
          <NavLink to="/shop?category=Winter%20Wear" className={navClass}>
            Winter Wear
          </NavLink>
          <NavLink to="/shop?category=Festival" className={navClass}>
            Festival
          </NavLink>
          <NavLink to="/contact" className={navClass}>
            Contact
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;
