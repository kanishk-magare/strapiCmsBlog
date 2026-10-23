import React from 'react'
import Link from 'next/link'
import { Github, Twitter, Mail, ArrowUpRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border/40 bg-background/50 backdrop-blur-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-border/30">
          {/* Brand */}
          <div className="space-y-2 max-w-sm">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-foreground text-background text-xs font-bold tracking-wider">
                B
              </div>
              <span className="font-semibold text-sm tracking-tight text-foreground">
                BlogSpace<span className="text-muted-foreground/60">.</span>
              </span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              An independent tech and science journal exploring the modern web, headless CMS, and code craft.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/blog" className="hover:text-foreground transition-colors">
              Blog
            </Link>
            <Link href="/about" className="hover:text-foreground transition-colors">
              About
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} BlogSpace. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Powered by Strapi & Next.js 16</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
