import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Calendar, Code2, Sparkles, Zap } from "lucide-react";

async function getFeaturedArticles() {
  const strapiUrl = "http://localhost:1337/api/articles?populate=*&pagination[pageSize]=3";
  try {
    const res = await fetch(strapiUrl, { cache: "no-store" });
    const json = await res.json();
    return { articles: json?.data || [], host: "http://localhost:1337" };
  } catch {
    try {
      const res = await fetch("http://localhost:3001/api/articles?populate=*&pagination[pageSize]=3", { cache: "no-store" });
      const json = await res.json();
      return { articles: json?.data || [], host: "http://localhost:3001" };
    } catch {
      return { articles: [], host: "http://localhost:1337" };
    }
  }
}

export default async function Home() {
  const { articles, host: strapiHost } = await getFeaturedArticles();

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background subtle ambient glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl -z-10 pointer-events-none rounded-full" />

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16 sm:pb-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border/60 bg-secondary/50 backdrop-blur-xs text-xs font-medium text-foreground mb-8 transition-transform hover:scale-102">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Strapi CMS + Next.js 16 Architecture</span>
          <span className="text-muted-foreground/60">•</span>
          <span className="text-muted-foreground">Modern Journal</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.1] sm:leading-[1.08]">
          Stories, code & ideas for{" "}
          <span className="underline decoration-border/80 decoration-wavy decoration-from-font underline-offset-8">
            curious minds
          </span>
          .
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-6 text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-normal">
          A minimalist digital publication exploring modern web engineering, architecture, design systems, and tech stories.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-all duration-200 hover:bg-foreground/90 hover:shadow-sm active:scale-95"
          >
            <span>Explore Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:bg-secondary/70 hover:border-border/80 active:scale-95"
          >
            <span>About BlogSpace</span>
          </Link>
        </div>

        {/* Feature stats / highlights */}
        <div className="mt-14 pt-10 border-t border-border/40 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-2xl mx-auto text-left">
          <div className="space-y-1">
            <p className="text-2xl font-bold tracking-tight text-foreground">100%</p>
            <p className="text-xs text-muted-foreground">Open knowledge & free access</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold tracking-tight text-foreground">0ms</p>
            <p className="text-xs text-muted-foreground">Bloatware or intrusive trackers</p>
          </div>
          <div className="col-span-2 sm:col-span-1 space-y-1">
            <p className="text-2xl font-bold tracking-tight text-foreground">Next 16</p>
            <p className="text-xs text-muted-foreground">Streaming server components</p>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-border/40">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Fresh Off The Press
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Featured Articles
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-xs font-medium text-foreground hover:text-muted-foreground inline-flex items-center gap-1 transition-colors"
          >
            <span>View all</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {articles.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border/70 p-12 text-center max-w-md mx-auto">
            <p className="text-sm font-medium text-foreground">No articles found</p>
            <p className="text-xs text-muted-foreground mt-1">
              Start your Strapi CMS server to fetch articles.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((item, index) => {
              const article = item.attributes || item;
              const imageUrl = article.cover?.url ? `${strapiHost}${article.cover.url}` : null;
              const publishedDate = article.publishedAt || article.createdAt;
              const formattedDate = publishedDate
                ? new Date(publishedDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : null;

              return (
                <article
                  key={item.id}
                  className="group flex flex-col rounded-2xl border border-border/50 bg-card hover:border-border transition-all duration-300 hover:shadow-xs overflow-hidden"
                >
                  <Link
                    href={`/blogpost/${article.slug}`}
                    className="relative aspect-[16/10] w-full overflow-hidden bg-muted block"
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={article.cover?.alternativeText || article.title}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-muted-foreground/40 text-xs">
                        No cover
                      </div>
                    )}
                  </Link>

                  <div className="flex flex-col flex-1 p-5">
                    {formattedDate && (
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formattedDate}</span>
                      </div>
                    )}

                    <h3 className="text-base font-semibold tracking-tight text-foreground line-clamp-2 transition-colors">
                      <Link href={`/blogpost/${article.slug}`} className="hover:underline underline-offset-4">
                        {article.title}
                      </Link>
                    </h3>

                    {(article.description || article.content) && (
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-2 leading-relaxed flex-1">
                        {article.description || article.content}
                      </p>
                    )}

                    <div className="pt-4 mt-4 flex items-center justify-between border-t border-border/40">
                      <Link
                        href={`/blogpost/${article.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-medium text-foreground hover:text-muted-foreground transition-colors"
                      >
                        <span>Read article</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Feature Highlights Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="rounded-3xl border border-border/50 bg-secondary/30 p-8 sm:p-12">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Why We Built BlogSpace
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Designed for readers, crafted for developers.
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
              We believe technical writing should be beautiful, accessible, and fast.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-card border border-border/50 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-foreground">
                <Code2 className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-sm text-foreground">Headless Power</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Separating content in Strapi from the Next.js presentation layer gives complete editorial control.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/50 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-foreground">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-sm text-foreground">Minimal Aesthetic</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                No bloated tracking scripts or flashing ads. Just clean typography and effortless readability.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/50 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-foreground">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-sm text-foreground">Turbopack Speed</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Powered by Next.js 16 and React 19 for instant navigation and optimal Largest Contentful Paint (LCP).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 mb-12">
        <div className="rounded-3xl border border-border/60 bg-gradient-to-b from-card to-secondary/30 p-8 sm:p-14 text-center space-y-6">
          <div className="max-w-md mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Stay in the loop
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Receive notifications whenever a new article or tutorial is published. No spam, ever.
            </p>
          </div>

          <form
            className="flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full sm:flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-full border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-foreground text-background text-xs sm:text-sm font-medium hover:bg-foreground/90 transition-all duration-200 active:scale-95"
            >
              Subscribe
            </button>
          </form>

          <p className="text-[11px] text-muted-foreground">
            Join other engineers and thinkers. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </main>
  );
}
