import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {IoIosAlert} from 'react-icons/io'

import TopRated from '../TopRated'

import Header from '../Header'

import SocialMediaPage from '../SocialMediaPage'
import SliderPage from '../SliderPage'
import TrendingNowPage from '../TrendingNowPage'
import './index.css'

const detailsOfAPI = {
  initial: 'INITIAL',
  loader: 'LOADER',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    statusOfAPI: detailsOfAPI.initial,
    originalList: [],
  }

  componentDidMount() {
    this.getMovieImages()
  }

  getMovieImages = async () => {
    this.setState({statusOfAPI: detailsOfAPI.loader})
    const url = 'https://apis.ccbp.in/movies-app/originals'
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
        originalList: updatedData,
      })
    } else {
      this.setState({statusOfAPI: detailsOfAPI.failure})
    }
  }

  getPosterSpinner = () => (
    <div testid="loader" className="loader-details">
      <Loader type="ThreeDots" width={50} height={50} color="red" />
    </div>
  )

  getPosterSuccess = () => {
    const {originalList} = this.state
    const len = originalList.length - 1
    const random = Math.floor(Math.random() * len)
    const posterDetails = originalList[random]
    // console.log(posterDetails)
    const {overview, backDropPath, title} = posterDetails
    return (
      <div
        style={{backgroundImage: `url(${backDropPath})`}}
        className="poster-image-details"
      >
        <Header />
        <div className="poster-details">
          <h1 className="poster-head">{title}</h1>
          <p className="poster-par-details">{overview}</p>
          <button type="button" className="poster-button-details">
            Play
          </button>
        </div>
      </div>
    )
  }

  getOriginalSlider = () => {
    const {originalList} = this.state
    return <SliderPage sliderImageDetails={originalList} />
  }

  onHomeFailure = () => (
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

  onOriginalFailure = () => (
    <div>
      <IoIosAlert size="20" color="red" alt="failure view" />
      <p>Something went wrong. Please try Again</p>
      <button type="button" onClick={this.getMovieImages}>
        Try Again
      </button>
    </div>
  )

  getPosterDetails = () => {
    const {statusOfAPI} = this.state

    switch (statusOfAPI) {
      case detailsOfAPI.loader:
        return this.getPosterSpinner()

      case detailsOfAPI.success:
        return this.getPosterSuccess()

      case detailsOfAPI.failure:
        return this.onHomeFailure()
      default:
        return null
    }
  }

  getOriginals = () => {
    const {statusOfAPI} = this.state
    switch (statusOfAPI) {
      case detailsOfAPI.loader:
        return this.getPosterSpinner()

      case detailsOfAPI.success:
        return this.getOriginalSlider()

      case detailsOfAPI.failure:
        return this.onOriginalFailure()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-page-main-container">
        {this.getPosterDetails()}
        <div>
          <h1>Trending Now</h1>
          <TrendingNowPage />
          <h1>Top Rated</h1>
          <TopRated />
          <h1>Originals</h1>
          {this.getOriginals()}
        </div>
        <div className="social-apps-in-center ">
          <SocialMediaPage />
        </div>
      </div>
    )
  }
}

export default Home
