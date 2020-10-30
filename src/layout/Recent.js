import React, { Component } from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import img1 from '../assets/Bergen.jpg'
import img2 from '../assets/Madrid.jpg'
import img3 from '../assets/Thailand.jpg'
export class DemoCarousel extends Component {
  prepareImages(img) {
    // const image = new Image(816,583)
    const image = img
    return (
      <div className="carousel__slide__wrapper">
        <img src={image}
          // style={{ maxWidth: image.width, height: image.height }}
          className="" alt="" />
        <div className="carousel__slide__content">
          <p>New Year's Eve in</p>
          <h3>Thailand</h3>
        </div>
      </div>
    )
  }
  render() {

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
        <div>
          {this.prepareImages(img1)}
        </div>
        <div>
          {this.prepareImages(img2)}
        </div>
        <div>
          {this.prepareImages(img3)}
        </div>
      </Carousel>
    );
  }
};

export default function Recent() {
  return (
    <section className="recent">
      <h2 className="section__title recent__title">Recently Added</h2>
      <div className="recent__container">
        <DemoCarousel></DemoCarousel>
      </div>
    </section>
  )
}

