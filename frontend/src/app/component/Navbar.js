'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
]

const Navbar = () => {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-5xl mx-auto flex h-14 items-center justify-between px-4 sm:px-6">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground text-background text-xs font-bold tracking-wider transition-transform duration-200 group-hover:scale-105">
            B
          </div>
          <span className="font-semibold text-sm tracking-tight text-foreground">
            BlogSpace<span className="text-muted-foreground/60">.</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-1.5">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== '/' && pathname.startsWith(link.href))

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-secondary text-secondary-foreground font-semibold shadow-xs'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                }`}
              >
                {link.name}
              </Link>
            )
          })}
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-foreground px-3.5 py-1.5 text-xs font-medium text-background transition-all duration-200 hover:bg-foreground/90 active:scale-95"
          >
            Read Articles
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar