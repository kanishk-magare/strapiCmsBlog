import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Share2, User } from 'lucide-react'

async function fetchArticle(slug) {
    const strapiUrl = `http://localhost:1337/api/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
    try {
        const response = await fetch(strapiUrl, { cache: 'no-store' })
        const json = await response.json()
        const article = json?.data?.[0]
        return { article: article?.attributes || article || null, host: "http://localhost:1337" }
    } catch {
        try {
            const response = await fetch(
                `http://localhost:3001/api/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
                { cache: 'no-store' }
            )
            const json = await response.json()
            const article = json?.data?.[0]
            return { article: article?.attributes || article || null, host: "http://localhost:3001" }
        } catch {
            return { article: null, host: "http://localhost:1337" }
        }
    }
}

export async function generateMetadata({ params }) {
    const { slug } = await params
    const { article } = await fetchArticle(slug)
    const title = article?.title || slug.replace(/-/g, ' ')
    return {
        title: `${title} | BlogSpace`,
        description: article?.description || `Read ${title} on BlogSpace.`,
    }
}

export default async function Page({ params }) {
    const { slug } = await params
    const { article, host: strapiHost } = await fetchArticle(slug)

    const title = article?.title || slug.replace(/-/g, ' ')
    const description = article?.description || ''
    const imageUrl = article?.cover?.url ? `${strapiHost}${article.cover.url}` : null
    const publishedDate = article?.publishedAt || article?.createdAt
    const formattedDate = publishedDate
        ? new Date(publishedDate).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
          })
        : null
    const authorName = article?.author?.name || 'Editorial Team'
    const categoryName = article?.category?.name || 'General'

    return (
        <main className="min-h-screen bg-background">
            <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
                {/* Back to Blog Navigation */}
                <div className="mb-8">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-all duration-200 group"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
                        <span>Back to all articles</span>
                    </Link>
                </div>

                {/* Article Header */}
                <header className="space-y-4 pb-8 border-b border-border/40">
                    {/* Category & Read Time */}
                    <div className="flex items-center gap-3 text-xs">
                        <span className="px-2.5 py-1 rounded-full font-medium bg-secondary text-secondary-foreground">
                            {categoryName}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="w-3.5 h-3.5" />
                            <span>4 min read</span>
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
                        {title}
                    </h1>

                    {/* Subtitle / Description */}
                    {description && (
                        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-normal pt-1">
                            {description}
                        </p>
                    )}

                    {/* Author & Published Info */}
                    <div className="flex items-center justify-between pt-4 text-xs sm:text-sm text-muted-foreground">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-foreground font-semibold">
                                <User className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="font-medium text-foreground">{authorName}</p>
                                {formattedDate && (
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Calendar className="w-3 h-3" />
                                        <span>{formattedDate}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-xs uppercase tracking-wider text-muted-foreground/80">Article</span>
                        </div>
                    </div>
                </header>

                {/* Hero / Cover Image */}
                {imageUrl && (
                    <div className="my-8 sm:my-10">
                        <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border/40 bg-muted shadow-xs">
                            <img
                                src={imageUrl}
                                alt={article?.cover?.alternativeText || title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {article?.cover?.caption && (
                            <p className="text-xs text-center text-muted-foreground italic mt-2.5">
                                {article.cover.caption}
                            </p>
                        )}
                    </div>
                )}

                {/* Article Content */}
                <div className="py-6 sm:py-8">
                    {article ? (
                        <div className="space-y-6 text-foreground/90 leading-relaxed text-base sm:text-lg">
                            {Array.isArray(article.blocks) && article.blocks.length > 0 ? (
                                article.blocks.map((block, idx) => {
                                    if (block.type === 'paragraph' && Array.isArray(block.children)) {
                                        const text = block.children.map((c) => c.text).join('')
                                        return <p key={idx}>{text}</p>
                                    }
                                    if (block.type === 'heading' && Array.isArray(block.children)) {
                                        const text = block.children.map((c) => c.text).join('')
                                        return (
                                            <h2 key={idx} className="text-2xl font-bold tracking-tight text-foreground mt-8 mb-3">
                                                {text}
                                            </h2>
                                        )
                                    }
                                    if (block.type === 'quote' && Array.isArray(block.children)) {
                                        const text = block.children.map((c) => c.text).join('')
                                        return (
                                            <blockquote key={idx} className="border-l-2 border-foreground/40 pl-4 italic text-muted-foreground my-6">
                                                "{text}"
                                            </blockquote>
                                        )
                                    }
                                    if (block.body) {
                                        return <p key={idx}>{block.body}</p>
                                    }
                                    return null
                                })
                            ) : (
                                <p className="whitespace-pre-line text-foreground/80">
                                    {article.content || article.description || "Content is being prepared for this story."}
                                </p>
                            )}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-border/60 p-10 text-center space-y-3">
                            <p className="font-medium text-foreground">Post not found in CMS</p>
                            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                                The article matching slug <code className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">{slug}</code> may not be published yet.
                            </p>
                            <div className="pt-2">
                                <Link
                                    href="/blog"
                                    className="inline-flex items-center justify-center rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background hover:bg-foreground/90 transition-colors"
                                >
                                    View Available Articles
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Section */}
                <footer className="mt-12 pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-xs font-medium text-foreground hover:text-muted-foreground transition-colors"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Explore more stories</span>
                    </Link>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>Published with Strapi CMS</span>
                    </div>
                </footer>
            </article>
        </main>
    )
}

