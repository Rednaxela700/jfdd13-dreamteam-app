import React from 'react';
import { Grid, Image, Header, Container, Pagination} from 'semantic-ui-react';

const imgSrc ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTDgEOsiQyCYSqiBVVAWAxMkKz8jiz80Qu0U8MuaiGJryGMTVR&s';

function Trip() {
  return (
    <Grid.Column>
      <Image src={imgSrc} centered={true}/>
    </Grid.Column>
  );
}

export default Trip;