"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 🔥 Fake auth state (replace later with real auth)
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    setUser({ name: "John Doe" });
  };

  const handleLogout = () => {
    setUser(null);
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
          {!user ? (
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

              {/* Demo login button */}
              <button
                onClick={handleLogin}
                className="text-xs text-gray-500"
              >
                Demo Login
              </button>
            </>
          ) : (
            <>
              <span className="text-sm">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="rounded bg-red-500 px-3 py-1 text-white text-sm"
              >
                Logout
              </button>
            </>
          )}
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
          <Link href="/" className="block">Home</Link>
          <Link href="/dashboard" className="block">Dashboard</Link>
          <Link href="/about" className="block">About</Link>

          <div className="pt-4 border-t space-y-2">
            {!user ? (
              <>
                <Link href="/login" className="block">Login</Link>
                <Link href="/signup" className="block">Sign Up</Link>
                <button
                  onClick={handleLogin}
                  className="text-sm text-gray-500"
                >
                  Demo Login
                </button>
              </>
            ) : (
              <>
                <p className="text-sm">Hi, {user.name}</p>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white py-2 rounded"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}