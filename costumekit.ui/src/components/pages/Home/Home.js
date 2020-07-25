import React from 'react';

import outfitData from '../../../helpers/data/outfitData';
import settingData from '../../../helpers/data/settingData';

import OutfitCard from '../../shared/OutfitCard/OutfitCard';

import './Home.scss';

class Home extends React.Component {
  state = {
    outfits: [],
    userId: 1,
    settings: [],
  }

  getOutfits = () => {
    const { userId } = this.state;
    outfitData.getUserOutfits(userId)
      .then((outfits) => this.setState({ outfits }))
      .catch((err) => console.error(err));
  }

  getSettings = () => {
    settingData.getAllSettings()
      .then((settings) => this.setState({ settings }))
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.getOutfits();
    this.getSettings();
  }

  openDropdown = (e) => {
    e.preventDefault();
    document.getElementById('new-outfit-form').classList.toggle('show');
  }

  render() {
    const { outfits, settings } = this.state;
    return (
      <div className="Home container">
        <h2>Your outfits:</h2>
        <div className="row">
          {outfits.map((outfit) => <OutfitCard outfit={outfit} key={outfit.id}/>)}
        </div>
        <div className="dropdown">
          <button onClick={this.openDropdown} className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Make a New Outfit!
          </button>
          <form className="dropdown-menu p-4" id="new-outfit-form" aria-labelledby="dropdownMenuButton">
            <div className="form-group">
              <label htmlFor="outfitName">Name your outfit</label>
              <input type="email" className="form-control" id="outfitName" placeholder="Aragorn" />
            </div>
            <div className="form-group">
              <label htmlFor="outfitDescription">Tell about your outfit</label>
              <textarea type="password" className="form-control" id="outfitDescription" placeholder="Isildur's heir, Elessar, the Elfstone..." />
            </div>
            <div className="form-group">
              <label htmlFor="settingDropdown">Example select</label>
              <select className="form-control" id="settingDropdown">
                {settings.map((setting) => <option key={setting.id}>{setting.name}</option>)}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Sign in</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Home;
