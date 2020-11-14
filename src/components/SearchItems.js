import React from 'react'
import searchbarIcon from '../assets/searchbarIcon.svg'
import { Link } from 'react-router-dom';
import Select from 'react-select/';
// import Slider, { Range } from 'rc-slider';

export const SearchInputs = ({
  handleInputChange, setSelectedContinent,
  rangeValue, searchQuery, handleRangeSlider, continents
}) => {
  const selectOptions = continents.map(el => {
    const obj = Object.create({});
    obj.value = el
    obj.label = el
    return obj
  })
  return (
    <section className="search__queries">
      <div className="site-hero">
        <h1 className="hero__title search__title">Where to next?</h1>
        <div className="searchbar">
          <div className="icon__container">
            <img src={searchbarIcon} alt="" className="icon__item"/>
          </div>
          <input
            className="searchbar__input"
            onChange={handleInputChange}
            placeholder={'Search destination'}
            value={searchQuery}
          />
          <button type="submit" className="cta">search</button>
        </div>
      </div>
      <div className="search__filters">
        <div className="search__input">
          <Select
            options={selectOptions}
            className='filter__select'
            styles={{
              menu: provided => ({...provided, zIndex: 2, cursor: 'pointer'}),
              control: (provided, state) => ({
                ...provided,
                outlineColor: state.isFocused ? '#FAC55C' : null || state.isHovered ? '#FAC55C' : null,
                borderColor: state.isFocused ? '#FAC55C' : null

              }),
            }}
            onChange={setSelectedContinent}
          />
        </div>
        <div className="filter__container">
          <button className="filter__btn">All</button>
          <button className="filter__btn">Popular destinations</button>
          <button className="filter__btn">European cities</button>
          <button className="filter__btn">Backpacking</button>
          <button className="filter__btn">Sightseeing</button>
        </div>
        <div className="search__input filter__slider">
          <input
            type={'range'}
            min={0}
            max={2000}
            step={100}
            onChange={handleRangeSlider}
            name={'show'}
            value={rangeValue}
            className='filter__slider__item'
          />
          <span className='filter__price'>
            {rangeValue || '0'}zł
          </span>
        </div>
      </div>
    </section>
  )
}

export const FilteredQueryResult = ({
  trip, setSelectedTrip, favourites,
  setFavouriteTrip, defaultImg
}) => (
    <div
      key={trip.id}
      className='trip__wrapper'
      onClick={() => {
        setSelectedTrip(trip)
      }}
    >
      <img
        className={'trip__image'}
        src={trip.tripImageUrl || defaultImg}
        label={{
          ribbon: true,
          color: 'blue',
          content: `${trip.city}`
        }}
        alt=""
      />
      <span
        className={'trip__icon'}
        name={favourites[trip.id] !== undefined ? 'heart' : 'heart outline'}
        onClick={(e) => {
          e.stopPropagation();
          setFavouriteTrip(trip.id)
        }}
      />
      <Link to={`/trip/${trip.id}`} className='trip__overlay'>
        <p className='trip__title'>
          {trip.title}
        </p>
      </Link>
    </div>
  )

export const NoQueryResult = ({ message }) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
    <h2>{message ? message :
      "Nie ma takiej wycieczki, ale możesz ją dodać!"}</h2>
  </div>
)