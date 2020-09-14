import React, { Component, Fragment } from "react";
import {
    Grid,
    Image,
    Icon,
    Modal,
    Header,
    Button
} from 'semantic-ui-react'
import {NoQueryResult} from './SearchItems'
import { fetchTrips, fetchFromFavorites, toggleFavorite } from "../services/TripService";
import {ShowLoader} from "./Loader";

const defaultImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTDgEOsiQyCYSqiBVVAWAxMkKz8jiz80Qu0U8MuaiGJryGMTVR&s';

class Favourites extends Component {
    state = {
        results: [],
        selectedTrip: null,
        favourites: {},
        fetched: false
    };

    async componentDidMount() {
        const allTrips = await fetchTrips();
        fetchFromFavorites(favourites => {
            const favouritesList = allTrips.filter((trip) => favourites[trip.id] !== undefined)
            this.setState({
                results: favouritesList,
                favourites,
                fetched: true
            })
        })
    }

    async handleFavIcon(tripId) {
      await toggleFavorite(tripId);
    }

    queryOutput() {
        return (
            !this.state.fetched ? ShowLoader() :

        this.state.results.length === 0 ?
            <NoQueryResult message={"Nie polubiłeś/aś jeszcze żadnej wycieczki"}/>
            :
            this.state.results.map(trip => (
            <div key={trip.id} className={'tripContainer'}>
                <Grid.Column style={{ padding: '0 2rem' }} onClick={() => {
                    this.setState({
                        selectedTrip: trip
                    })
                }}>
                    <div style={{ position: 'relative' }}>
                        <Image
                            className="TripImage"
                            src={trip.tripImageUrl || defaultImg}
                            label={{
                                ribbon: true,
                                color: "blue",
                                content: `${trip.city}`
                            }}
                            centered={true}
                            style={{ cursor: 'pointer' }}
                        >
                        </Image>
                        <Icon
                            className={'iconFavourites'}
                            size={'large'}
                            inverted
                            name={this.state.favourites[trip.id] ? 'heart' : 'heart outline'}
                            onClick={(e) => {
                                e.stopPropagation();
                                this.handleFavIcon(trip.id)
                            }} />
                    </div>
                    <p>{trip.title}</p>
                </Grid.Column>
            </div>
        ))
        )
    }

    render() {
        const { selectedTrip } = this.state
        return (
            <div className="search">
                <Grid container
                    style={
                        {
                            display: 'flex',
                            justifyContent: 'flex-start',
                            flexDirection: 'column',
                            height: '100%',
                            margin: 'auto !important'
                        }
                    }>
                    <Grid.Row
                        columns={3} style={{ display: 'flex', height: '100%' }}
                    >
                        {this.queryOutput()}
                    </Grid.Row>
                </Grid>
                <Modal
                    dimmer={"blurring"}
                    open={this.state.selectedTrip != null}
                    onClose={() => {
                        this.setState({
                            selectedTrip: null
                        })
                    }}
                >
                    {selectedTrip != null && <Fragment>
                        <Modal.Header>{selectedTrip.title}</Modal.Header>
                        <Modal.Content image>
                            <Image
                                wrapped
                                size="large"
                                src={selectedTrip.tripImageUrl || defaultImg}
                            />
                            <Modal.Description>
                                <Header>{selectedTrip.city}</Header>
                                <ul style={{ padding: "0 0 0 1.5rem" }}>
                                    <li>{selectedTrip.continent}</li>
                                    <li>Cena za dobę za osobę: {selectedTrip.price} PLN</li>
                                    <li>Data wyjazdu: {selectedTrip.date}</li>
                                    <li>Opis: {selectedTrip.description}</li>
                                </ul>
                            </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color="black"
                                onClick={() => {
                                    this.setState({
                                        selectedTrip: null
                                    })
                                }}
                            >
                                Wyjdź
                            </Button> 
                        </Modal.Actions>
                    </Fragment>}
                </Modal>
            </div>
        );
    };
}

export default Favourites