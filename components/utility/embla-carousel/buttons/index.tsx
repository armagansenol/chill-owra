import React, { PropsWithChildren } from "react"

type PropType = PropsWithChildren<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>

export const DotButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  )
}

export const PrevButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props

  return (
    <button className="embla__button embla__button--prev" type="button" {...restProps}>
      {children}
    </button>
  )
}

export const NextButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props

  return (
    <button className="embla__button embla__button--next" type="button" {...restProps}>
      {children}
    </button>
  )
}
