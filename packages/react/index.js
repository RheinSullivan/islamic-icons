import React from "react"

export function IslamicIcon({ src, alt = "", size = 24, className, ...props }) {
  return React.createElement("img", { src, alt, width: size, height: size, className, ...props })
}

export const createIslamicIcon = (src, displayName) => {
  const Icon = (props) => React.createElement(IslamicIcon, { src, ...props })
  Icon.displayName = displayName || "IslamicIcon"
  return Icon
}
