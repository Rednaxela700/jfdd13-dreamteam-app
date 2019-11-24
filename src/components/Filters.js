import _ from 'lodash';
import React, { Component } from 'react';
import { Grid, Dropdown, Form, Search } from 'semantic-ui-react';
import TripContainer from './TripContainer';

const continents = [
  {key: 'afr', value:1, text: "Afryka"},
  {key: 'apd', value:2, text: "Ameryka Południowa"},
  {key: 'apn', value:3, text: "Ameryka Północna"},
  {key: 'ant', value:4, text: "Antarktyda"},
  {key: 'aus', value:5, text: "Australia i Oceania"},
  {key: 'azj', value:5, text: "Azja"},
  {key: 'eur', value:6, text: "Europa"}
];
const places = [
  {value:'Amsterdam'},
  {value:'Bangkok'},
  {value:'Berlin'},
  {value:'Innsbruck'},
  {value:'Johannesburg'},
  {value:'Kraków'},
  {value:'Lizbona'},
  {value:'Londyn'},
  {value:'Los Angeles'},
  {value:'Madryt'},
  {value:'Mexico City'},
  {value:'Monachium'},
  {value:'Moskwa'},
  {value:'Neapol'},
  {value:'Nowy Jork'},
  {value:'Rzym'},
  {value:'Sydney'},
  {value:'Tokio'},
  {value:'Trójmiasto'},
  {value:'Vancouver'},
  {value:'Wiedeń'},
];

const initialState = { isLoading: false, results: [], value: '' }

class Filters extends Component {
  state = {
    initialState,
    show: 999
  }
  handleContinentSelect = (e, { result }) => this.setState({ value: result.title });
  handleContinentChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.text)

      this.setState({
        isLoading: false,
        results: _.filter(continents, isMatch),
      })
    }, 300)
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  toggleVisibility = () =>
    this.setState((prevState) => ({ visible: !prevState.visible }));

  render() {
    const { isLoading, value, results } = this.state;
    const {show} = this.state;
    
    return (
      <div className="search">
        <Grid padded={true}>
          <Grid.Row columns={1} centered={true}>
            <Grid.Column width={12}>
              <Search
                input={{icon:'search', 
                iconPosition:'left', 
                placeholder:'Podaj destynację...', 
                fluid:true}}
                onResultSelect={this.handleContinentSelect}
                onSearchChange={_.debounce(this.handleContinentChange, 500, {
                  leading: true,
                })}
                results={results}
                value={value}
                {...this.props}
              
              />

                {/* <datalist id='places'>
                  {places.map(v => <option> {v.value}</option>)}
                </datalist> */}
          </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2} centered={true}>
            <Grid.Column width={6} >
              <Dropdown clearable fluid options={continents} selection placeholder='Wybierz kontynent...'/>
            </Grid.Column>
            <Grid.Column as={Form} width={6} textAlign={"right"}>
              <Form.Input inline
                label={`Twój budżet: ${show} PLN`}
                min={99}
                max={2000}
                step={100}
                type="range"
                onChange={this.handleChange}
                name="show"
                value={show}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <TripContainer />
      </div>
    );
  };
}
export default Filters;