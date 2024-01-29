import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import SliderPage from '../SliderPage'
import RefreshPage from '../RefreshPage'

const detailsOfAPI = {
  initial: 'INITIAL',
  loader: 'LOADER',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class OriginalsPage extends Component {
  state = {statusOfAPI: detailsOfAPI.initial, originalsMovies: []}

  componentDidMount() {
    this.getTopRatedMovies()
  }

  getTopRatedMovies = async () => {
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
        originalsMovies: updatedData,
      })
    }
  }

  getSpinnerDetails = () => (
    <div testid="loader">
      <Loader type="ThreeDots" width={50} height={50} />
    </div>
  )

  onSuccess = () => {
    const {originalsMovies} = this.state

    return (
      <div>
        <SliderPage sliderImageDetails={originalsMovies} />
      </div>
    )
  }

  reload = () => this.getTopRatedMovies()

  onFailure = () => <RefreshPage reload={this.reload} />

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

export default OriginalsPage
