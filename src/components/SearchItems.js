import React from 'react'
import { data } from "../data";
import { Continents } from "./Continents";

export const SearchInputs = ({
  handleInputChange, handleSelect, selectedContinent,
  rangeValue, searchQuery, handleRangeSlider
}) => (
    <div>
      <div>
        <div>
          <input
            onChange={handleInputChange}
            placeholder={'Dokąd chcesz pojechać'}
            value={searchQuery}
          />
          <datalist id={'places'}>
            {data.map(v => <option key={v.id}>{v.city}</option>)}
          </datalist>
        </div>
      </div>
      <div>
        <div>
          <select name="selectContinent" id="" onChange={handleSelect}>
            <option value="Wybierz kontynent">Wybierz kontynent</option>
            {Continents.map(item => (
              <option key={item.key} value={item.text}>{item.text}</option>
            ))}
          </select>
        </div>
        <form
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
    </div>
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