import React, {useContext} from 'react'
import {Carousel} from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import AppContext from '../context/app/AppContext'

const FunctionalCarousel = () => {
  const appContext = useContext(AppContext);
  const {trips} = appContext
  const SingleImage = (props) => (
    <div className="carousel__slide__wrapper">
      <div className="carousel__slide__container">
        <img src={props.image}
          // style={{ maxWidth: image.width, height: image.height }}
             className="" alt=""/>
        <div className="carousel__slide__overlay"/>
        <div className="carousel__slide__content">
          <p>{props.title}</p>
          <h3>{props.city}</h3>
        </div>
      </div>
    </div>
  )

  return (
    <Carousel
      // autoPlay
      infiniteLoop
      axis="horizontal"
      dynamicHeight={true}
      centerMode={true}
      centerSlidePercentage={65}
      className="carousel"
      showThumbs={false}
    >
      {trips.slice(0, 5).map(({city, title, tripImageUrl}, idx) => (
        <SingleImage key={idx} title={title} city={city} image={tripImageUrl}/>))}
    </Carousel>
  );
}

export default function Recent() {
  return (
    <section className="recent">
      <h2 className="section__title recent__title">Recently Added</h2>
      <div className="recent__container">
        <FunctionalCarousel/>
      </div>
    </section>
  )
}