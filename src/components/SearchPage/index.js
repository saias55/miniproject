import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'
import PopularImagesPage from '../PopularImagesPage'
import FailureView from '../FailureView'
import './index.css'

const detailsOfAPI = {
  initial: 'INITIAL',
  loader: 'LOADER',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class SearchPage extends Component {
  state = {statusOfAPI: detailsOfAPI.initial, searchText: ''}

  componentDidMount() {
    this.getSearchDetails()
  }

  getSearchDetails = async () => {
    this.setState({statusOfAPI: detailsOfAPI.loader, searchList: []})
    const {searchText} = this.state
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchText}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const updatedData = data.results.map(eachSearch => ({
        id: eachSearch.id,
        backdropPath: eachSearch.backdrop_path,
        posterPath: eachSearch.poster_path,
        title: eachSearch.title,
      }))
      this.setState({
        searchList: updatedData,
        statusOfAPI: detailsOfAPI.success,
      })
    } else {
      this.setState({statusOfAPI: detailsOfAPI.failure})
    }
  }

  gettingSearchText = event => this.setState({searchText: event})

  apiSearch = () => this.getSearchDetails()

  getSpinner = () => (
    <div testid="loader" className="loader-details">
      <Loader type="ThreeDots" width={50} height={50} />
    </div>
  )

  getSearchSuccess = () => {
    const {searchList, searchText} = this.state
    const len = searchList.length
    if (len === 0) {
      return (
        <div>
          <img
            src="https://res.cloudinary.com/dojn2omox/image/upload/v1701757257/kgfsnoe166nqsvucyzih.png"
            alt="no movies"
          />
          <p>Your search for {searchText} did not find any matches.</p>
        </div>
      )
    }

    return (
      <ul className="search-unordered-details">
        {searchList.map(eachSearch => (
          <PopularImagesPage eachPopular={eachSearch} key={eachSearch.id} />
        ))}
      </ul>
    )
  }

  onSearchPageFailure = () => this.getSearchDetails()

  onFailure = () => <FailureView failurePage={this.onSearchPageFailure} />

  getLoaderSearchOrFailure = () => {
    const {statusOfAPI} = this.state
    switch (statusOfAPI) {
      case detailsOfAPI.loader:
        return this.getSpinner()

      case detailsOfAPI.success:
        return this.getSearchSuccess()

      case detailsOfAPI.failure:
        return this.onFailure()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="searchMainPage">
        <Header
          gettingSearchText={this.gettingSearchText}
          apiSearch={this.apiSearch}
        />
        {this.getLoaderSearchOrFailure()}
      </div>
    )
  }
}

export default SearchPage
