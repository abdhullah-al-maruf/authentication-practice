"use client";
import { authClient } from "@/lib/auth-client"; //import the auth client
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

// this is for the session data
  const { data: session } = authClient.useSession();

// optional chaining ? is for when we are not login it will show null
  const user=session?.user
console.log(user);

  const handleLogout = async () => {
    // this is for signout
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login"); // redirect to login page
        },
      },
    });
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">AuthApp</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/about">About</Link>
        </div>

        {/* Auth Section */}
        <div className="hidden md:flex items-center gap-4">
          <>
            <Link href="/login" className="text-sm">
              Login
            </Link>
            <Link
              href="/signup"
              className="rounded bg-black px-4 py-2 text-white text-sm"
            >
              Sign Up
            </Link>
          </>

          <>
            <span className="text-sm block"> {user?.name}</span>
            <p>{user?.email}</p>
            <button
              onClick={handleLogout}
              className="rounded bg-red-500 px-3 py-1 text-white text-sm"
            >
              Logout
            </button>
          </>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t px-6 py-4 space-y-3">
          <Link href="/" className="block">
            Home
          </Link>
          <Link href="/dashboard" className="block">
            Dashboard
          </Link>
          <Link href="/about" className="block">
            About
          </Link>

          <div className="pt-4 border-t space-y-2">
            <>
              <Link href="/login" className="block">
                Login
              </Link>
              <Link href="/signup" className="block">
                Sign Up
              </Link>
            </>
            <>
              <p className="text-sm">Hi, {user?.name}</p>
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 rounded"
              >
                Logout
              </button>
            </>
          </div>
        </div>
      )}
    </nav>
  );
}
