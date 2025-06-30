import { useEffect, useState } from "react";

export function Main() {
  const [inputValues, setInputValues] = useState({
    film: "",
    description: "",
  });

  const [filmList, setFilmList] = useState(() => {
    const saved = localStorage.getItem('filmList')
    return saved ? JSON.parse(saved) : []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState(null);

  function addFilm() {
    if (inputValues.film.trim() === "") {
      return alert("Whrite a movie name!");
    } else {
      setIsLoading(true);

      async function asyncCall() {
        try {
          const request = await fetch(`http://www.omdbapi.com/?apikey=175f84a0&t=${inputValues.film}`)
          const json = await request.json()
          console.log(json);

          if (json.Response === "False" || json.Poster === "N/A") {
            const filmWithPoster = {
              ...inputValues,
              poster:
                "https://nftcalendar.io/storage/uploads/2022/02/21/image-not-found_0221202211372462137974b6c1a.png",
            };

            setFilmList((prev) => [...prev, filmWithPoster]);
            setInputValues({ film: "", description: "" });
            setIsLoading(false);
            return;
          }

          const filmWithPoster = {
            film: json.Title,
            age: json.Year,
            poster: json.Poster,
            description: inputValues.description,
            plot: json.Plot,
          };

          setFilmList((prev) => [...prev, filmWithPoster]);
          setInputValues({ film: "", description: "" });

          setIsLoading(false);
        } catch (error) {
          console.log(error);

          const filmWithPoster = {
            ...inputValues,
            poster:
              "https://nftcalendar.io/storage/uploads/2022/02/21/image-not-found_0221202211372462137974b6c1a.png",
          };

          setFilmList((prev) => [...prev, filmWithPoster]);
          setInputValues({ film: "", description: "" });
          setIsLoading(false);
        }
      }

      asyncCall()
    }
  }

  function deleteFilm(key) {
    setFilmList((prevList) => prevList.filter((_, index) => index !== key));
  }

  function moreAboutFilm(obj) {
    setSelectedFilm(obj);
  }

  useEffect(() => {
    localStorage.setItem('filmList', JSON.stringify(filmList))
  }, [filmList]);

  return (
    <main>
      <h1 className="main-h">
        {isLoading ? "Try find your film..." : "Your favourite movie list!"}
      </h1>
      <form
        action=""
        className="form-to-add-film"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder="Harry Potter"
          id="film-name"
          value={inputValues.film}
          onChange={(e) => {
            setInputValues({ ...inputValues, film: e.target.value });
          }}
        />
        <textarea
          placeholder="This film is very interesting!"
          id="description"
          value={inputValues.description}
          maxLength="200"
          onChange={(e) => {
            setInputValues({ ...inputValues, description: e.target.value });
          }}
        ></textarea>
        <button onClick={() => addFilm()} type="button">
          Add film
        </button>
      </form>
      <div className="cards">
        {filmList.map((obj, key) => {
          return (
            <div
              key={key}
              className="film-card"
              onClick={() => moreAboutFilm(obj, key)}
            >
              <img src={obj.poster} alt={obj.film} />
              <p>{obj.film}</p>
              <p>{obj.age}</p>
              <button
                className="delete-card"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFilm(key);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
      {selectedFilm && (
        <div className="more-about-film">
          <div className="content">
            <h2>More About: {selectedFilm.film}</h2>
            <img src={selectedFilm.poster} alt={selectedFilm.film} />
            {selectedFilm.age && (
              <p>
                <strong>Year:</strong> {selectedFilm.age}
              </p>
            )}
            {selectedFilm.description && (
              <p>
                <strong>Description:</strong> {selectedFilm.description}
              </p>
            )}
            {selectedFilm.plot && (
              <p>
                <strong>Plot:</strong> {selectedFilm.plot}
              </p>
            )}
            <button onClick={() => setSelectedFilm(null)}>Close</button>
          </div>
        </div>
      )}
    </main>
  );
}
