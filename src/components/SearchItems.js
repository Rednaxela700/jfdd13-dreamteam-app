import React from 'react'
import { Continents } from "./Continents";
import searchbarIcon from '../assets/searchbarIcon.svg'

export const SearchInputs = ({
  handleInputChange, setSelectedContinent,
  rangeValue, searchQuery, handleRangeSlider
}) => (
    <section className="search__queries">
      <div className="search__hero">
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
          <select name="selectContinent" id="" onChange={(e) => setSelectedContinent(e.target.value)}>
            <option value="Wybierz kontynent">Wybierz kontynent</option>
            {Continents.map(item => (
              <option key={item.key} value={item.text}>{item.text}</option>
            ))}
          </select>
        </div>
        <div className="filter__container">
          <button className="filter__btn">All</button>
          <button className="filter__btn">Popular destinations</button>
          <button className="filter__btn">European cities</button>
          <button className="filter__btn">Backpacking</button>
          <button className="filter__btn">Sightseeing</button>
        </div>
        <form
          className="search__input"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'right'
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              padding: '0 8px',
              height: '100%'
            }}
          >
            Maksymalna cena za dobę: {rangeValue || '0'}zł
                        </span>
          <input
            type={'range'}
            min={0}
            max={2000}
            step={100}
            onChange={handleRangeSlider}
            name={'show'}
            value={rangeValue}
            style={{ minHeight: '40px' }}
          />
        </form>
      </div>
    </section>
  )

export const FilteredQueryResult = ({
  trip, setSelectedTrip, favourites,
  setFavouriteTrip, defaultImg
}) => (
    <div key={trip.id} className={''}>
      <div
        onClick={() => {
          setSelectedTrip(trip)
        }}
      >
        <div style={{ position: 'relative' }}>
          <img
            className={'search__image'}
            src={trip.tripImageUrl || defaultImg}
            label={{
              ribbon: true,
              color: 'blue',
              content: `${trip.city}`
            }}
            style={{ cursor: 'pointer' }}
            alt=""
          />
          <p
            className={'iconFavourites'}
            name={favourites[trip.id] !== undefined ? 'heart' : 'heart outline'}
            size={'large'}
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation();
              setFavouriteTrip(trip.id)
            }}
          />
        </div>
        <p>{trip.title}</p>
      </div>
    </div>
  )

export const ResultsGrid = ({ queryOutput }) => (
  <div
    className="search__results"
  >

    {queryOutput()}
  </div>
)

export const NoQueryResult = ({ message }) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
    <h2>{message ? message :
      "Nie ma takiej wycieczki, ale możesz ją dodać!"}</h2>
  </div>
)