import { useEffect, useState } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

const App = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const data = useSelector((state) => state.albumData)
  const { albumMainData, filteredData } = data
  const [searchField, setSearchField] = useState('')
  const [isSearchPerformed, setIsSearchPerformed] = useState(false)
  const [isDataFound, setIsDataFound] = useState(true)
  const [dataList, setDataList] = useState({})


  useEffect(() => {
    if (!Object.keys(albumMainData).length) {
      setIsSearchPerformed(true)
      fetch('https://jsonplaceholder.typicode.com/albums')
        .then(response => response.json())
        .then(data => {
          transformResponseData(data)
          setIsDataFound(true)
        })
        .catch(error => {
          console.error('Error fetching data:', error)
          setIsDataFound(false)
          setIsSearchPerformed(false)
        });
    } else if (Object.keys(filteredData).length) {
      setDataList(filteredData)
    } else {
      setDataList(albumMainData)
    }
  }, []);

  const transformResponseData = (data) => {
    let transformedData = {}
    data.forEach((item) => {
      if (transformedData[item.userId]) {
        transformedData[item.userId]['count'] = transformedData[item.userId]['count'] + 1
        transformedData[item.userId]['albums'].push({
          id: item.id,
          title: item.title,
          visited: false
        })

      } else {
        transformedData[item.userId] = {
          count: 1,
          albums: [{
            id: item.id,
            title: item.title,
            visited: false
          }]
        }

      }
    })
    dispatch({ type: 'SET_ALBUM_MAIN_DATA', albumMainData: transformedData })
    setDataList(transformedData)
    setIsSearchPerformed(false)
  }

  const handleOnclick = (selectedAlbum) => {

    dispatch({
      type: 'SET_SELECTED_ALBUM', selectedAlbum: {
        selectedId: selectedAlbum,
        data: albumMainData[selectedAlbum]
      }
    })

    navigate('/albumList')
  }

  const onSearchClick = () => {
    setSearchField('')
    setIsSearchPerformed(true)
    let searchedData = albumMainData[searchField]

    if (searchedData) {
      setIsDataFound(true)
      dispatch({
        type: 'SET_FILTERED_DATA', filteredData: {
          [searchField]: searchedData
        }
      })


      setDataList({ [searchField]: searchedData })
    } else {
      setDataList({})
      dispatch({
        type: 'SET_FILTERED_DATA', filteredData: {}
      })
      setIsDataFound(false)
    }
    setIsSearchPerformed(false)

  }


  return (
    <div className="App">

      <header className='header'>
        <h1>Albums</h1>
        <div className='search-container'>
          <input type='text' value={searchField} placeholder='Enter id to search...' onChange={(e) => setSearchField(e.target.value)} className='search-bar' />
          <button className={`${searchField.length > 0 ? 'search-button' : 'search-button disabled'}`} disabled={!searchField.length > 0} onClick={() => onSearchClick()}>
            Search
          </button>
          <button className='search-button' onClick={() => {
            setDataList(albumMainData)
            setIsDataFound(true)
          }}>
            Reset
          </button>
        </div>
      </header>

      {
        isSearchPerformed &&
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      }

      {
        !isDataFound && <h1 className="loader-container">No data found</h1>
      }
      <div className='content'>
        {Object.keys(dataList).length > 0 && Object.keys(dataList).map(userId => (
          <div className="card" key={userId} onClick={() => handleOnclick(userId)}>
            <div className="circle-top-right">{albumMainData[userId].count}</div>
            <div className="circle-center">
              <p className="title">UserId:{userId}</p>
            </div>
          </div>
        )
        )
        }
      </div>

      <footer className='footer'>
        <div className='tabs'>
          <div className='tab active'><Link to={`/`} style={{ textDecoration: 'none', color: 'white' }}>Home</Link></div>
          <div className='tab'><Link to={`/albumList`} style={{ textDecoration: 'none', color: 'white' }}>Album List</Link></div>
        </div>
      </footer>

    </div>
  );
}

export default App;
