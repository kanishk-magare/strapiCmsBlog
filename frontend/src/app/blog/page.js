import Link from 'next/link'
import React from 'react'
import { ArrowUpRight, Calendar } from 'lucide-react'

async function fetchdata() {
    const strapiUrl = "http://localhost:1337/api/articles?populate=*"
    try {
        const response = await fetch(strapiUrl, { cache: 'no-store' })
        const res = await response.json()
        return { data: res, host: "http://localhost:1337" }
    } catch (error) {
        try {
            const response = await fetch("http://localhost:3001/api/articles?populate=*", { cache: 'no-store' })
            const res = await response.json()
            return { data: res, host: "http://localhost:3001" }
        } catch (err) {
            console.error("Failed to fetch from Strapi:", err)
            return { data: null, host: "http://localhost:1337" }
        }
    }
}

const Blog = async () => {
    const { data: res, host: strapiHost } = await fetchdata()
    const articles = res?.data || []

    return (
        <main className="min-h-screen bg-background">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
                {/* Header Section */}
                <div className="mb-10 space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Our Journal
                    </p>
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                        Articles & Stories
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
                        Thoughtful reads, tutorials, and technology insights fetched live from Strapi.
                    </p>
                </div>

                {/* Articles Grid */}
                {articles.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-border/70 p-12 text-center max-w-md mx-auto my-12">
                        <p className="text-sm font-medium text-foreground">No articles found</p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Check that your Strapi CMS is running and articles are published.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {articles.map((item) => {
                            const article = item.attributes || item
                            const imageUrl = article.cover?.url ? `${strapiHost}${article.cover.url}` : null
                            const publishedDate = article.publishedAt || article.createdAt
                            const formattedDate = publishedDate
                                ? new Date(publishedDate).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric',
                                  })
                                : null

                            return (
                                <article
                                    key={item.id}
                                    className="group flex flex-col rounded-2xl border border-border/50 bg-card hover:border-border transition-all duration-300 hover:shadow-xs overflow-hidden"
                                >
                                    {/* Cover Image */}
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
                                                No image
                                            </div>
                                        )}
                                    </Link>

                                    {/* Article Details */}
                                    <div className="flex flex-col flex-1 p-5">
                                        {/* Date / Metadata */}
                                        {formattedDate && (
                                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span>{formattedDate}</span>
                                            </div>
                                        )}

                                        {/* Title */}
                                        <h2 className="text-lg font-semibold tracking-tight text-foreground line-clamp-2 transition-colors">
                                            <Link
                                                href={`/blogpost/${article.slug}`}
                                                className="hover:underline underline-offset-4"
                                            >
                                                {article.title}
                                            </Link>
                                        </h2>

                                        {/* Description / Content snippet */}
                                        {(article.description || article.content) && (
                                            <p className="text-sm text-muted-foreground line-clamp-2 mt-2 leading-relaxed flex-1">
                                                {article.description || article.content}
                                            </p>
                                        )}

                                        {/* Read More Link */}
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
                            )
                        })}
                    </div>
                )}
            </div>
        </main>
    )
}

export default Blog

