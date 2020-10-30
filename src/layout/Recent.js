import React, {Component} from 'react'
import {Carousel} from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export class DemoCarousel extends Component {
  render() {
    return (
      <Carousel
        infiniteLoop
        centerMode
        centerSlidePercentage={('centerSlidePercentage', 80, {})}
      >
        <div>
          <p className="">Legend 1</p>
        </div>
        <div>
          <p className="">Legend 2</p>
        </div>
        <div>
          <p className="">Legend 3</p>
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

