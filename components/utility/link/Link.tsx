import NextLink from "next/link"
import { forwardRef, useMemo } from "react"

const SHALLOW_URLS = ["?demo=true"]

const Link = forwardRef(
  ({ href, children, className, scroll = false, shallow, ariaLabel = "go to page", ...props }: any, ref) => {
    const attributes = {
      ref,
      className,
      ...props,
    }

    const isProtocol = useMemo(() => href?.startsWith("mailto:") || href?.startsWith("tel:"), [href])

    const needsShallow = useMemo(() => !!SHALLOW_URLS.find((url) => href?.includes(url)), [href])

    const isAnchor = useMemo(() => href?.startsWith("#"), [href])
    const isExternal = useMemo(() => href?.startsWith("http"), [href])

    if (typeof href !== "string") {
      return (
        <button type="button" {...attributes}>
          {children}
        </button>
      )
    }

    if (isProtocol || isExternal) {
      return (
        <a {...attributes} href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )
    }

    return (
      <NextLink
        aria-label={ariaLabel}
        href={href}
        passHref={isAnchor}
        scroll={scroll}
        {...attributes}
        {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
        style={{ textDecoration: "none" }}
      >
        {children}
      </NextLink>
    )
  }
)

Link.displayName = "Link"

export default Link
