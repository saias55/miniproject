import {Link} from 'react-router-dom'

import './index.css'

const PopularImagesPage = props => {
  const {eachPopular} = props
  const {posterPath, id, title} = eachPopular
  return (
    <Link to={`/movies/${id}`}>
      <li className="margin-details-popular">
        <img src={posterPath} alt={title} className="popular-image-details" />
      </li>
    </Link>
  )
}

export default PopularImagesPage
