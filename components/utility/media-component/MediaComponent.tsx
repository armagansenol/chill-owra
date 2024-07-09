import { Img } from "@/components/utility/img"
import { Video } from "@/components/utility/video"
import { Media } from "@/types"

import cx from "clsx"
interface MediaComponentProps {
  media: Media
  priority?: boolean
  className?: string
}

export default function MediaComponent(props: MediaComponentProps) {
  const { className = "object-cover", media, priority = false } = props

  const mediaComponents = {
    image: (
      <Img
        alt="Slider Content Visual"
        className={cx(className)}
        src={media.src}
        priority={priority}
        height={media.height ?? 1000}
        width={media.width ?? 1000}
      />
    ),
    video: <Video className="object-cover" src={media.src as string} />,
  }

  return mediaComponents[media.type]
}
