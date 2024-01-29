import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import {Link} from 'react-router-dom'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

const SliderPage = props => {
  const {sliderImageDetails} = props
  const renderSlider = () => (
    <Slider {...settings}>
      {sliderImageDetails.map(eachLogo => {
        const {id, posterPath, title} = eachLogo

        return (
          <Link to={`/movies/${id}`}>
            <div className="slick-item" key={id}>
              <img className="logo-image" src={posterPath} alt={title} />
            </div>
          </Link>
        )
      })}
    </Slider>
  )

  return <div className="details">{renderSlider()}</div>
}

export default SliderPage
