import { NextSeo, NextSeoProps } from "next-seo"
import NextHead from "next/head"

type Props = {
  canonical: NextSeoProps["canonical"]
  title: NextSeoProps["title"]
  description: NextSeoProps["description"]
  image?: { width: number; height: number; url: string }
  keywords?: string[]
  twitter?: NextSeoProps["twitter"]
  themeColor?: NextSeoProps["themeColor"]
}
export default function CustomHead({
  canonical,
  title,
  description,
  image,
  keywords,
  themeColor = "#007538",
  twitter = { handle: "@pentasventures" },
}: Props) {
  return (
    <>
      <NextHead>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />

        <meta
          name="robots"
          content={process.env.NEXT_PUBLIC_NODE_ENV !== "development" ? "index,follow" : "noindex,nofollow"}
        />
        <meta
          name="googlebot"
          content={process.env.NEXT_PUBLIC_NODE_ENV !== "development" ? "index,follow" : "noindex,nofollow"}
        />

        <meta name="keywords" content={`${keywords && keywords.length ? keywords.join(",") : keywords}`} />
        <meta name="author" content="PENTAS VENTURES" />
        <meta name="referrer" content="no-referrer" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="geo.region" content="US" />

        {/* START FAVICON */}
        {/* <link rel="manifest" href="/site.webmanifest" /> */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="mask-icon" href="/favicon-32x32.png" color={themeColor} />
        <meta name="msapplication-TileColor" content={themeColor} />
        <meta name="theme-color" content={themeColor} />
        <link rel="icon" href="/favicon.ico" />
        {/* END FAVICON */}

        <link rel="canonical" href={canonical}></link>

        <title>{title}</title>
      </NextHead>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          type: "website",
          locale: "en_US",
          images: [
            {
              url: image ? image.url : "/img/pentas-ventures-logo.png",
              width: image?.width ? image.width : 522,
              height: image?.height ? image.height : 84,
              alt: title,
            },
          ],
          defaultImageWidth: 522,
          defaultImageHeight: 84,
          site_name: "pentasventures.com",
        }}
        twitter={{
          handle: twitter.handle,
          cardType: "summary_large_image",
        }}
      />
    </>
  )
}
