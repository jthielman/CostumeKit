import React from 'react';

import outfitData from '../../../helpers/data/outfitData';

import OutfitCard from '../../shared/OutfitCard/OutfitCard';

import './Home.scss';

class Home extends React.Component {
  state = {
    outfits: [],
    userId: 1,
  }

  getOutfits = () => {
    const { userId } = this.state;
    outfitData.getUserOutfits(userId)
      .then((outfits) => this.setState({ outfits }))
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.getOutfits();
  }

  render() {
    const { outfits } = this.state;
    return (
      <div className="Home container">
        <h2>Your outfits:</h2>
        <div className="row">
          {outfits.map((outfit) => <OutfitCard outfit={outfit} key={outfit.id}/>)}
        </div>
        <div>
          <button className="btn btn-success">Make a New Outfit!</button>
        </div>
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Dropdown button
          </button>
          <form className="dropdown-menu p-4" aria-labelledby="dropdownMenuButton">
            <div className="form-group">
              <label for="exampleDropdownFormEmail2">Email address</label>
              <input type="email" className="form-control" id="exampleDropdownFormEmail2" placeholder="email@example.com" />
            </div>
            <div className="form-group">
              <label for="exampleDropdownFormPassword2">Password</label>
              <input type="password" className="form-control" id="exampleDropdownFormPassword2" placeholder="Password" />
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="dropdownCheck2" />
              <label className="form-check-label" for="dropdownCheck2">
                Remember me
              </label>
            </div>
            <button type="submit" className="btn btn-primary">Sign in</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Home;
