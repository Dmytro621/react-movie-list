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
    age: '',
    description: ''
  })

  const [filmList, setFilmList] = useState([])

  function addFilm() {
    setFilmList((prev) => [...prev, inputValues])
    setInputValues({ film: '', age: '', description: '' })
  }

  return (
    <>
      <h1 className='main-h'>Your favourite movie list!</h1>
      <form action="" className="form-to-add-film">
        <input
          type="text"
          placeholder="Harry Potter"
          id="film-name"
          value={inputValues.film}
          onChange={(e) => {
            setInputValues({ ...inputValues, film: e.target.value })
          }}
        />
        <input
          type="number"
          placeholder="2005"
          id="releace-year"
          value={inputValues.age}
          onChange={(e) => {
            const onlyDigits = e.target.value.replace(/\D/g, '')
            if(onlyDigits.length <= 4)  {setInputValues({ ...inputValues, age: onlyDigits })}
          }}
          onKeyDown={(e) => { if (e.key === 'e' || e.key === 'E' || e.key === '+' || e.key === '-') e.preventDefault() }}
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
      <ul className="film-list">
        {filmList.map((obj, key) => {
          return (
            <li key={key}>
              <p>{obj.film}</p>
              <p>{obj.age}</p>
              <p>{obj.description}</p>
            </li>
          )
        })}
      </ul>
    </>
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
      <Header/>
      <Routes>
        <Route path='*' element={<Main />} />
        <Route path='/about' element={<About/>} />
      </Routes>
    </>
  )
}

export default App
