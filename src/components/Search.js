import React, {useState, useEffect} from 'react';
import {
  fetchTrips,
  fetchFromFavorites,
  toggleFavorite,
} from "../services/TripService";
import {Continents} from "./Continents";
import {SearchInputs, FilteredQueryResult, NoQueryResult} from "./SearchItems";
import TripModal from "./TripModal";

const initialRange = 1999;
const defaultImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTDgEOsiQyCYSqiBVVAWAxMkKz8jiz80Qu0U8MuaiGJryGMTVR&s';

const Search = () => {
  const [rangeValue, setRangeValue] = useState(initialRange);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState('');
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [favouriteTrip, setFavouriteTrip] = useState(false);
  useEffect(() => {
    (async () => {
      const results = await fetchTrips()
      setResults(results)
      if (favouriteTrip) {
        await handleFavIcon(favouriteTrip)
        setFavouriteTrip(false)
      }
      await fetchFromFavorites(favourites => {
        setFavourites(favourites)
        setFetched(true)
        // stopFetching()
      })
    })()
    return () => {
      // setFetched(true)
      // stopFetchingFromUser(userData.id)
    }
  }, [favouriteTrip])

  const handleFavIcon = async (tripId) => {
    await toggleFavorite(tripId)
  }
  const handleRangeSlider = (e) => setRangeValue(Number(e.target.value))

  const handleInputChange = (e) => setSearchQuery(e.target.value)

  const filterResults = () => {
    const continent = Continents.find(continent => continent.value === selectedContinent)
    const continentText = continent ? continent.label.toLowerCase() : '';
    const userQuery = searchQuery.toLowerCase()
    return results.filter(trip => (
        trip.continent.toLowerCase().includes(continentText) &&
        trip.title.toLowerCase().includes(userQuery) &&
        Number(trip.price) < rangeValue
      ) ||
      (
        trip.city.toLowerCase().includes(userQuery) &&
        trip.continent.toLowerCase().includes(continentText) &&
        Number(trip.price < rangeValue)
      ))
  }
  const filteredResults = filterResults();

  return (
    <div className={'search'}>
      <SearchInputs
        handleInputChange={handleInputChange}
        setSelectedContinent={setSelectedContinent}
        handleRangeSlider={handleRangeSlider}
        selectedContinent={selectedContinent}
        rangeValue={rangeValue}
        searchQuery={searchQuery}
      />
      <div className="search__results">
        {
          filteredResults.length === 0 ?
            <NoQueryResult/>
            :
            filteredResults.map(trip => (
              <FilteredQueryResult
                trip={trip}
                key={trip.id}
                setFavouriteTrip={setFavouriteTrip}
                setSelectedTrip={setSelectedTrip}
                favourites={favourites}
                defaultImg={defaultImg}
              />
            ))
        }
      </div>
      <TripModal
        selectedTrip={selectedTrip}
        setSelectedTrip={setSelectedTrip}
      />
    </div>
  )
}

export default Search;
