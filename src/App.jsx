import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css'

function Header() {
  return (
    <nav>
      <Link to={'/'}>Home</Link>
      <Link to={'/about'}>About</Link>
    </nav>
  )
}

function Main() {
  const [inputValues, setInputValues] = useState({
    film: '',
    description: '',
  })

  const [filmList, setFilmList] = useState([])

  function addFilm() {
    if (inputValues.film === '') {
      return alert('Whrite a movie name!')
    }  else {
      fetch(`http://www.omdbapi.com/?apikey=175f84a0&t=${inputValues.film}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)

          if (data.Response === 'False' || data.Poster === 'N/A') {
            const filmWithPoster = {
              ...inputValues,
              poster: 'https://nftcalendar.io/storage/uploads/2022/02/21/image-not-found_0221202211372462137974b6c1a.png'
            }
  
            setFilmList((prev) => [...prev, filmWithPoster])
            setInputValues({ film: '', description: '' })
            return
          }
          
          const filmWithPoster = {
            film: data.Title,
            age: data.Year,
            poster: data.Poster,
            description: inputValues.description
          }

          setFilmList((prev) => [...prev, filmWithPoster])
          setInputValues({ film: '', description: '' })

          
        })
        .catch((error) => {
          console.log(error)

          const filmWithPoster = {
            ...inputValues,
            poster: 'https://nftcalendar.io/storage/uploads/2022/02/21/image-not-found_0221202211372462137974b6c1a.png'
          }

          setFilmList((prev) => [...prev, filmWithPoster])
          setInputValues({ film: '', description: '' })

        })
    }
  }

  function deleteFilm(key) {
    setFilmList((prevList => prevList.filter((_, index) => index !== key)))
  }

  return (
    <main>
      <h1 className='main-h'>Your favourite movie list!</h1>
      <form action="" className="form-to-add-film" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Harry Potter"
          id="film-name"
          value={inputValues.film}
          onChange={(e) => {
            setInputValues({ ...inputValues, film: e.target.value })
          }}
        />
        <textarea
          placeholder="This film is very interesting!"
          id="description"
          value={inputValues.description}
          maxLength="200"
          onChange={(e) => {
            setInputValues({ ...inputValues, description: e.target.value })
          }}
        ></textarea>
        <button onClick={() => addFilm()} type="button">Add film</button>
      </form>
      <div className="cards">
        {filmList.map((obj, key) => {
          return (
            <div key={key} className='film-card'>
              <img src={obj.poster} alt={obj.film} />
              <p>{obj.film}</p>
              <p>{obj.age}</p>
              <button className='delete-card' onClick={() => {deleteFilm(key)}}>Delete</button>
            </div>
          )
        })}
      </div>
    </main>
  )
}

function Footer() {
  return (
    <footer>
      <a href="https://github.com/Dmytro621" target='_blank'>My github!</a>
    </footer>
  )
}

function About() {
  return (
    <><h2>You can save your favourite movie here!</h2></>
  )
}

function App() {
  return (
    <>
      <div className="wrapper">
        <Header/>
        <Routes>
          <Route path='*' element={<Main />} />
          <Route path='/about' element={<About/>} />
        </Routes>
        <Footer/>
      </div>
    </>
  )
}

export default App
