function ContactPage() {
  return (
    <main className="mx-auto w-[min(1180px,92vw)] py-10">
      <h1 className="font-display text-4xl">Contact OSHA Clothing & Apparels</h1>
      <p className="mt-2 text-slate-600">For order confirmation, stock inquiry, and support, contact us:</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h3 className="font-bold text-lg">WhatsApp</h3>
          <a href="https://wa.me/9779851003737" target="_blank" rel="noreferrer noopener" className="text-brand-500 font-semibold">
            +977 985-1003737
          </a>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h3 className="font-bold text-lg">Facebook</h3>
          <a
            href="https://www.facebook.com/profile.php?id=61583871238196"
            target="_blank"
            rel="noreferrer noopener"
            className="text-brand-500 font-semibold"
          >
            Visit Facebook Profile
          </a>
        </div>
      </div>
    </main>
  );
}

export default ContactPage;
