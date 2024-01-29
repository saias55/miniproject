import {Link} from 'react-router-dom'

import './index.css'

const SimilarMoviesPage = props => {
  const {eachSimilar} = props
  const {id, posterPath, title} = eachSimilar

  return (
    <li className="margin-details">
      <Link to={`/movies/${id}`}>
        <img src={posterPath} alt={title} className="similar-image-details" />
      </Link>
    </li>
  )
}

export default SimilarMoviesPage
