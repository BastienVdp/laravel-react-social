import React from 'react'
import Img from "../../assets/avatar.png"
export default function Avatar({url, styles}) {
  return (
    <img src={url ? url : Img} alt="img" className={styles} />
  )
}
