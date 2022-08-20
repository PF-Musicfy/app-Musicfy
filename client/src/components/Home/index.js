import React from 'react'
import HomeAlbum from './HomeAlbums/index'
import styles from './indexMain.module.css'



export default function Home() {
  return (
    <div className={styles.indexMainHome}>
        <HomeAlbum />
    </div>
  )
}
