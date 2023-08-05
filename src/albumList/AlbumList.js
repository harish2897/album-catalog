import React from 'react'
import './AlbumList.css'
import { useSelector, useDispatch } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'


const AlbumList = () => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.albumData)
  const { albumMainData, selectedAlbum } = data
  const navigate = useNavigate()

  const onSelect = (id, isVisited) => {
    const dt = selectedAlbum.data.albums.map((album) => {
      if (album.id === id) {
        return { ...album, visited: !isVisited }
      }
      return album
    })

    const fdt = {
      ...selectedAlbum,
      data: {
        albums: dt,
        count: isVisited ? selectedAlbum.data.count + 1 : selectedAlbum.data.count - 1
      }
    }

    dispatch({
      type: 'SET_SELECTED_ALBUM', selectedAlbum: fdt
    })


    const mainDt = { ...albumMainData, [selectedAlbum.selectedId]: fdt.data }

    dispatch({ type: 'SET_ALBUM_MAIN_DATA', albumMainData: mainDt })

  }

  return (
    <>
      <header className='header'>
        <h1 onClick={()=>{navigate('/')}}>Albums</h1>
      </header>
      {selectedAlbum?.selectedId && <h3 className='album-title'>Selected album:{selectedAlbum?.selectedId}</h3>}
      {selectedAlbum?.data ? selectedAlbum.data.albums.map((data) => (
        <div className={`list-item ${data.visited ? 'visited' : ''}`} key={data.id} onClick={() => onSelect(data.id, data.visited)}>
          {data.title}
        </div>
      )) :
        <h1 className="loader-container">No Album is selected</h1>
      }
      <footer className='footer'>
        <div className='tabs'>
          <div className='tab '><Link to={`/`} style={{ textDecoration: 'none', color: 'white' }}>Home</Link></div>
          <div className='tab active'><Link to={`/albumList`} style={{ textDecoration: 'none', color: 'white' }}>Album List</Link></div>
        </div>
      </footer>
    </>
  )
}

export default AlbumList