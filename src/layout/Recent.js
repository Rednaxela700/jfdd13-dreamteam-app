import React, { Component } from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import img1 from '../assets/Bergen.jpg'
import img2 from '../assets/Madrid.jpg'
import img3 from '../assets/Thailand.jpg'

const FunctionalCarousel = ()=> {
  const SingleImage = (props)=> (
    <div className="carousel__slide__wrapper">
      <img src={props.image}
        // style={{ maxWidth: image.width, height: image.height }}
           className="" alt="" />
      <div className="carousel__slide__content">
        <p>New Year's Eve in</p>
        <h3>Thailand</h3>
      </div>
    </div>
  )

  const mockImgs = [img1, img2, img3];

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
      {mockImgs.map((image, idx) => (<SingleImage key={idx} image={image}/>))}
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