// components/Sidebar.tsx
import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/propose", label: "Propose TX" },
  { href: "/queue", label: "Queue" },
  { href: "/settings", label: "Settings" },
];

export default function Sidebar() {
  const router = useRouter();

  return (
    <div className="w-60 h-screen bg-gray-900 text-white p-6 space-y-4">
      <h1 className="text-xl font-bold mb-6">🔐 Gnosis Vault</h1>
      {links.map(({ href, label }) => (
        <Link key={href} href={href}>
          <div
            className={`cursor-pointer p-2 rounded ${
              router.pathname === href
                ? "bg-blue-600"
                : "hover:bg-gray-700"
            }`}
          >
            {label}
          </div>
        </Link>
      ))}
    </div>
  );
}
