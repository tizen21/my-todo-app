export default function Footer() {
  return (
    <footer className="footer footer-center bg-white text-base-content p-4 dark:bg-gray-900 dark:text-gray-50">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by TiZeN
        </p>
      </aside>
    </footer>
  );
}
