type Metadata = {
  title: string | null
  description: string | null
  image_url: string | null
}

export async function parseMetadata(url: string): Promise<Metadata> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Markhive/1.0)' },
      signal: AbortSignal.timeout(5000),
    })

    if (!res.ok) return { title: null, description: null, image_url: null }

    const html = await res.text()

    const title =
      extractMeta(html, 'og:title') ??
      extractMeta(html, 'twitter:title') ??
      extractTag(html, 'title')

    const description =
      extractMeta(html, 'og:description') ??
      extractMeta(html, 'twitter:description') ??
      extractMeta(html, 'description')

    const rawImage =
      extractMeta(html, 'og:image') ??
      extractMeta(html, 'twitter:image')

    const image_url = rawImage ? toAbsoluteUrl(rawImage, url) : null

    return { title, description, image_url }
  } catch {
    return { title: null, description: null, image_url: null }
  }
}

function extractMeta(html: string, property: string): string | null {
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${property}["']`, 'i'),
    new RegExp(`<meta[^>]+name=["']${property}["'][^>]+content=["']([^"']+)["']`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${property}["']`, 'i'),
  ]

  for (const pattern of patterns) {
    const match = html.match(pattern)
    if (match?.[1]) return decode(match[1].trim())
  }

  return null
}

function extractTag(html: string, tag: string): string | null {
  const match = html.match(new RegExp(`<${tag}[^>]*>([^<]+)</${tag}>`, 'i'))
  return match?.[1] ? decode(match[1].trim()) : null
}

function toAbsoluteUrl(src: string, base: string): string {
  try {
    return new URL(src, base).href
  } catch {
    return src
  }
}

function decode(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
}
