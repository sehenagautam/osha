import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <main className="mx-auto w-[min(1180px,92vw)] py-14 text-center">
      <h2 className="text-2xl font-bold">Page not found</h2>
      <Link to="/" className="inline-block mt-4 bg-accent text-white px-4 py-2 rounded-lg font-semibold">
        Back to Home
      </Link>
    </main>
  );
}

export default NotFoundPage;
