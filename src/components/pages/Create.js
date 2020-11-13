import React, {Fragment} from 'react';
import TripForm from "../Form/Form";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";

const Create = () => {
  return (
    <Fragment>
      <Header/>
      <main className="wrapper">
        <TripForm/>
      </main>
      <Footer/>
    </Fragment>);
};

export default Create;