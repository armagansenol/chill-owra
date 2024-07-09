import s from "./loading-spinner.module.scss"

import cx from "clsx"
interface Props {
  className?: string
}
const LoadingSpinner = (props: Props) => {
  return (
    <div className={cx(s.spinner, props.className)}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export { LoadingSpinner }
