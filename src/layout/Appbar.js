import React from 'react';
import { Icon } from "semantic-ui-react";

function Appbar() {

  return (
    <header className="Appbar">
      <h1 className='AppBarHeader'>
        <p>
          <Icon name="paper plane outline" />
          WHERE.TO
        </p>
      </h1>
    </header>);
}

export default Appbar;