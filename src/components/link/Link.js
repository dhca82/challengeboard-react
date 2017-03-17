import React from 'react'

function Link({ path, children, onClick }) {
  return (
    <a href={`#/${path}`} onClick={onClick}>{children}</a>
  )
}

export default Link;
