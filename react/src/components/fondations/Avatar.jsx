import React from 'react'

export default function Avatar({url, styles}) {
  return (
    <img src={url ? url : "https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg"} alt="img" className={styles} />
  )
}
