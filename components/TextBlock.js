import cx from "clsx"
import React from "react"

export const TextBlock = ({ nodes }) => {
  if (!nodes) {
    return null
  }

  return nodes.map((value, index) => {
    const {
      annotations: { bold, italic, strikethrough, underline },
      text,
    } = value

    if (bold || italic || strikethrough || underline || text.link) {
      return (
        <span
          key={index}
          className={cx({
            "font-bold": bold,
            italic: italic,
            "line-through": strikethrough,
            underline: underline,
          })}
        >
          {text.link ? (
            <a href={text.link.url}>{text.content}</a>
          ) : (
            text.content
          )}
        </span>
      )
    }

    return <React.Fragment key={index}>{text.content}</React.Fragment>
  })
}
