import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {IoIosAlert} from 'react-icons/io'

import SliderPage from '../SliderPage'

const detailsOfAPI = {
  initial: 'INITIAL',
  loader: 'LOADER',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TrendingNowPage extends Component {
  state = {statusOfAPI: detailsOfAPI.initial, trendingMovies: []}

  componentDidMount() {
    this.getTopRatedMovies()
  }

  getTopRatedMovies = async () => {
    this.setState({statusOfAPI: detailsOfAPI.loader})
    const url = 'https://apis.ccbp.in/movies-app/trending-movies'
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
        trendingMovies: updatedData,
      })
    } else {
      this.setState({statusOfAPI: detailsOfAPI.failure})
    }
  }

  getSpinnerDetails = () => (
    <div testid="loader">
      <Loader type="ThreeDots" width={50} height={50} />
    </div>
  )

  onSuccess = () => {
    const {trendingMovies} = this.state

    return (
      <div>
        <SliderPage sliderImageDetails={trendingMovies} />
      </div>
    )
  }

  onFailure = () => (
    <div>
      <IoIosAlert size="20" color="red" />
      <p>Something went wrong. Please try Again</p>
      <button type="button" onClick={this.getTopRatedMovies}>
        Try Again
      </button>
    </div>
  )

  getSwitchDetails = () => {
    const {statusOfAPI} = this.state

    switch (statusOfAPI) {
      case detailsOfAPI.loader:
        return this.getSpinnerDetails()

      case detailsOfAPI.success:
        return this.onSuccess()

      case detailsOfAPI.failure:
        return this.onFailure()

      default:
        return null
    }
  }

  render() {
    return <>{this.getSwitchDetails()}</>
  }
}

export default TrendingNowPage
