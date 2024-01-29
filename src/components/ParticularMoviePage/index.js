import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Cookies from 'js-cookie'

import Header from '../Header'
import GenrePage from '../GenrePage'
import AudioPage from '../AudioPage'
import SimilarMoviesPage from '../SimilarMoviesPage'
import SocialMediaPage from '../SocialMediaPage'

import './index.css'

const detailsOfAPI = {
  initial: 'INITIAL',
  loader: 'LOADER',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class ParticularMoviePage extends Component {
  state = {statusOfAPI: detailsOfAPI.initial, similarList: []}

  componentDidMount() {
    this.getParticularMovie()
  }

  getParticularMovie = async () => {
    this.setState({statusOfAPI: detailsOfAPI.loader})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)
    if (response.ok) {
      const updatedData = {
        budget: data.movie_details.budget,
        adult: data.movie_details.adult,
        backdropPath: data.movie_details.backdrop_path,
        id: data.movie_details.id,
        overview: data.movie_details.overview,
        posterPath: data.movie_details.poster_path,
        releaseDate: data.movie_details.release_date,
        runtime: data.movie_details.runtime,
        title: data.movie_details.title,
        voteAverage: data.movie_details.vote_average,
        voteCount: data.movie_details.vote_count,
        genres: data.movie_details.genres.map(eachGenre => ({
          id: eachGenre.id,
          name: eachGenre.name,
        })),
        similarMovies: data.movie_details.similar_movies.map(eachMap => ({
          backdropPath: eachMap.backdrop_path,
          id: eachMap.id,
          posterPath: eachMap.poster_path,
          title: eachMap.title,
        })),
        spokenLanguages: data.movie_details.spoken_languages.map(
          eachSpoken => ({
            id: eachSpoken.id,
            englishName: eachSpoken.english_name,
          }),
        ),
      }
      this.setState({
        similarList: updatedData,
        statusOfAPI: detailsOfAPI.success,
      })
      console.log(updatedData)
    } else {
      this.setState({statusOfAPI: detailsOfAPI.failure})
    }
  }

  getSpinner = () => (
    <div tesid="loader" className="loader-details">
      <Loader type="TailSpin" width={50} height={50} color="red" />
    </div>
  )

  getSingleImagePage = () => {
    const {similarList} = this.state
    const {
      backdropPath,
      title,
      runtime,
      releaseDate,
      overview,
      adult,
    } = similarList
    const result = adult ? 'A' : 'U/A'
    console.log(backdropPath)
    return (
      <div
        style={{backgroundImage: `url(${backdropPath})`}}
        className="particular-image-bgi"
      >
        <Header />
        <div className="poster-description-details">
          <h1 className="poster-heading">{title}</h1>
          <div className="poster-items-in-flex">
            <p className="poster-par">{runtime}mins</p>
            <div>
              <button type="button" className="poster-button-details">
                {result}
              </button>
            </div>
            <p className="poster-releaseDate"> {releaseDate}</p>
          </div>
          <p className="poster-overview-details">{overview}</p>
          <button type="button" className="poster-play-button-details">
            Play
          </button>
        </div>
      </div>
    )
  }

  getGenreSimilarMoviesSuccess = () => {
    const {similarList} = this.state
    const {similarMovies} = similarList
    return (
      <ul className="similar-items-display">
        {similarMovies.map(eachSimilar => (
          <SimilarMoviesPage eachSimilar={eachSimilar} key={eachSimilar.id} />
        ))}
      </ul>
    )
  }

  getSimilarMovies = () => {
    const {statusOfAPI} = this.state
    switch (statusOfAPI) {
      case detailsOfAPI.success:
        return this.getGenreSimilarMoviesSuccess()

      default:
        return null
    }
  }

  getGenreSuccess = () => {
    const {similarList} = this.state
    const {genres} = similarList
    return (
      <ul>
        {genres.map(eachG => (
          <GenrePage eachG={eachG} id={eachG.id} />
        ))}
      </ul>
    )
  }

  getAudioSuccess = () => {
    const {similarList} = this.state
    const {spokenLanguages} = similarList
    return (
      <ul>
        {spokenLanguages.map(eachA => (
          <AudioPage eachA={eachA} key={eachA.id} />
        ))}
      </ul>
    )
  }

  onFailure = () => (
    <div>
      <img
        src="https://res.cloudinary.com/dojn2omox/image/upload/v1701685821/ajbhizawkpwpo1aw7pnx.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={this.getParticularMovie}>
        Try Again
      </button>
    </div>
  )

  getBackGroundImage = () => {
    const {statusOfAPI} = this.state
    switch (statusOfAPI) {
      case detailsOfAPI.loader:
        return this.getSpinner()

      case detailsOfAPI.success:
        return this.getSingleImagePage()

      case detailsOfAPI.failure:
        return this.onFailure()
      default:
        return null
    }
  }

  getGenres = () => {
    const {statusOfAPI} = this.state
    switch (statusOfAPI) {
      case detailsOfAPI.success:
        return this.getGenreSuccess()

      default:
        return null
    }
  }

  getAvailbleAudio = () => {
    const {statusOfAPI} = this.state
    switch (statusOfAPI) {
      case detailsOfAPI.success:
        return this.getAudioSuccess()

      default:
        return null
    }
  }

  render() {
    const {similarList} = this.state
    const {voteCount, voteAverage, budget, releaseDate} = similarList
    return (
      <div className="particular-bgc">
        {this.getBackGroundImage()}
        <div className="genre-audio-budget-in-flex">
          <div>
            <h1>Genres</h1>
            {this.getGenres()}
          </div>
          <div>
            <h1>Audio Available</h1>
            {this.getAvailbleAudio()}
          </div>
          <div>
            <h1>Rating Count</h1>
            <p>{voteCount}</p>
            <h1>Rating Average</h1>
            <p>{voteAverage}</p>
          </div>
          <div>
            <h1>Budget</h1>
            <p>{budget}</p>
            <h1>Release Date</h1>
            <p>{releaseDate}</p>
          </div>
        </div>
        <div>
          <h1 className="more-like-this-details">More Like This</h1>
          {this.getSimilarMovies()}
        </div>
        <div style={{backgroundcolor: 'black'}} className="center-social">
          <SocialMediaPage />
        </div>
      </div>
    )
  }
}

export default ParticularMoviePage
