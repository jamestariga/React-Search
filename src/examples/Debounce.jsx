import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import useDebounce from '../hook/useDebounce'

const App = () => {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)
  const [results, setResults] = useState([])

  const searchRef = useRef()
  const firstRender = useRef(true)

  const url = `http://openlibrary.org/search.json?q=${debouncedSearch}`

  useEffect(() => {
    searchRef.current.focus()
  }, [])

  useEffect(() => {
    /* Preventing the useEffect from double firing. Only use this in development when using strict mode */
    if (firstRender.current) {
      firstRender.current = false
      return
    }

    /* A way to prevent the useEffect from running when the component unmounts. */
    let ignore = false

    const fetchData = async () => {
      const response = await axios.get(url)
      console.log(search)

      if (!ignore) {
        setResults(response.data.docs)
        console.log(results)
      }

      return () => {
        ignore = true
      }
    }

    fetchData()
  }, [debouncedSearch])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <div className='flex justify-center items-center p-10'>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col items-center space-y-6'
        >
          <div className='flex flex-row space-x-4 items-center'>
            <label htmlFor='search'>Type</label>
            <input
              id='search'
              type='text'
              ref={searchRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search'
              className='border border-black text-black rounded-lg p-2 w-full focus:border-sky-400 focus:outline-none'
            />
          </div>
          <button
            type='submit'
            className='bg-sky-400 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline'
          >
            Search
          </button>
        </form>
      </div>
      <div className='flex flex-col items-center space-y-6'>
        {results.map((result, id) => (
          <div key={id}>
            <div className='flex flex-col items-center space-y-4'>
              <h3>{result.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
