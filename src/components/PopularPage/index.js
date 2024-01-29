import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'
import PopularImagesPage from '../PopularImagesPage'

import SocialMediaPage from '../SocialMediaPage'
import './index.css'

const detailsOfAPI = {
  initial: 'INITIAL',
  loader: 'LOADER',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class PopularPage extends Component {
  state = {statusOfAPI: detailsOfAPI.initial, popularMoviesList: []}

  componentDidMount() {
    this.getMovies()
  }

  getMovies = async () => {
    this.setState({statusOfAPI: detailsOfAPI.loader})

    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.results.map(eachMovieImage => ({
        id: eachMovieImage.id,
        backDropPath: eachMovieImage.backdrop_path,
        posterPath: eachMovieImage.poster_path,
        title: eachMovieImage.title,
        overview: eachMovieImage.overview,
      }))
      this.setState({
        statusOfAPI: detailsOfAPI.success,
        popularMoviesList: updatedData,
      })
    } else {
      this.setState({statusOfAPI: detailsOfAPI.failure})
    }
  }

  getSpinner = () => (
    <div testid="loader" className="loader-details">
      <Loader type="TailSpin" width={50} height={50} color="red" />
    </div>
  )

  getPopularMovies = () => {
    const {popularMoviesList} = this.state
    return (
      <ul className="popular-flex-container">
        {popularMoviesList.map(eachPopular => (
          <PopularImagesPage eachPopular={eachPopular} key={eachPopular.id} />
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
      <button type="button" onClick={this.getMovieImages}>
        Try Again
      </button>
    </div>
  )

  renderPopularDetails = () => {
    const {statusOfAPI} = this.state

    switch (statusOfAPI) {
      case detailsOfAPI.loader:
        return this.getSpinner()

      case detailsOfAPI.success:
        return this.getPopularMovies()

      case detailsOfAPI.failure:
        return this.onFailure()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-bgc">
        <Header />
        <div className="popular-padding">{this.renderPopularDetails()}</div>
        <div className="social-apps-in-center">
          <SocialMediaPage />
        </div>
      </div>
    )
  }
}

export default PopularPage
