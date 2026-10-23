import React from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, CheckCircle2, Code2, Cpu, Globe, Layers, Mail, Sparkles, Terminal, User } from 'lucide-react'

export const metadata = {
  title: 'About | BlogSpace',
  description: 'Learn about the philosophy, architecture, and team behind BlogSpace.',
}

export default function About() {
  const stack = [
    { name: 'Next.js 16', role: 'App Router & Server Components' },
    { name: 'React 19', role: 'Modern UI & Streaming' },
    { name: 'Strapi CMS', role: 'Headless Content Engine' },
    { name: 'Tailwind CSS 4', role: 'Modern Design System' },
    { name: 'Turbopack', role: 'Ultra-fast Bundler' },
    { name: 'Lucide Icons', role: 'Refined Iconography' },
  ]

  const values = [
    {
      title: 'Clarity Over Complexity',
      description: 'We believe technical writing should be intuitive. We deconstruct intricate concepts into clear, bite-sized mental models.',
      icon: Sparkles,
    },
    {
      title: 'Headless Architecture',
      description: 'By decoupling content in Strapi from our Next.js frontend, we deliver lightning-fast page transitions and maximum flexibility.',
      icon: Layers,
    },
    {
      title: 'Minimalist Aesthetics',
      description: 'Generous whitespace, refined typography, and thoughtful contrast — an interface designed strictly to honor the reading experience.',
      icon: Terminal,
    },
    {
      title: 'Open Knowledge',
      description: 'We believe knowledge compounds when shared freely. All tutorials and architectures are designed to be cloned and built upon.',
      icon: Globe,
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-all duration-200 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Hero Section */}
        <header className="space-y-4 pb-12 border-b border-border/40">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
            <span>About The Journal</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-[1.12]">
            Crafting words & code at the intersection of design and technology.
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed pt-2 max-w-2xl font-normal">
            BlogSpace is an independent publication exploring modern web engineering, headless CMS architectures, and science. We distill complex technical topics into practical, elegant guides.
          </p>
        </header>

        {/* Mission / Narrative */}
        <section className="py-12 border-b border-border/40 space-y-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Our Mission
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-foreground/85 leading-relaxed">
            <p>
              The web moves extraordinarily fast. Every few months, new libraries, frameworks, and architectural paradigms shift the way we build digital experiences.
            </p>
            <p>
              BlogSpace was created to cut through the noise. Instead of quick snippets or clickbait news, we focus on in-depth tutorials, clean code patterns, and real-world architectures that stand the test of time.
            </p>
          </div>
        </section>

        {/* Core Values Grid */}
        <section className="py-12 border-b border-border/40">
          <div className="mb-8">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Guiding Principles
            </h2>
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              What we stand for
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((val) => {
              const Icon = val.icon
              return (
                <div
                  key={val.title}
                  className="p-6 rounded-2xl border border-border/50 bg-card hover:border-border transition-all duration-200 space-y-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-foreground">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-semibold text-sm text-foreground">{val.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {val.description}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Tech Stack Showcase */}
        <section className="py-12 border-b border-border/40">
          <div className="mb-8">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Architecture & Tools
            </h2>
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              How this platform is built
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {stack.map((item) => (
              <div
                key={item.name}
                className="p-4 rounded-xl border border-border/40 bg-secondary/30 flex flex-col justify-between"
              >
                <div className="flex items-center gap-1.5 text-foreground font-medium text-xs sm:text-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{item.name}</span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">{item.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Author / Creator Spotlight */}
        <section className="py-12 border-b border-border/40">
          <div className="p-6 sm:p-8 rounded-2xl border border-border/60 bg-gradient-to-br from-card to-secondary/30 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-xl shrink-0">
              K
            </div>
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-bold text-base text-foreground">Kanishk</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                  Author & Creator
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Full-stack developer passionate about building intuitive digital tools, exploring headless CMS ecosystems with Strapi, and crafting delightful web experiences.
              </p>
            </div>
          </div>
        </section>

        {/* Contact / Connect Section */}
        <section className="pt-12 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="font-semibold text-base text-foreground">Want to connect or suggest a topic?</h3>
              <p className="text-xs text-muted-foreground">
                We'd love to hear your feedback, story ideas, or collaborations.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-xs font-medium text-background hover:bg-foreground/90 transition-all duration-200 active:scale-95"
              >
                Read The Articles
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}