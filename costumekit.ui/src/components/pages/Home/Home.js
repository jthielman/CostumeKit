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
    newOutfitName: '',
    newOutfitDescription: '',
    newOutfitSettingId: 1,
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

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ newOutfitName: e.target.value });
  }

  descriptionChange = (e) => {
    e.preventDefault();
    this.setState({ newOutfitDescription: e.target.value });
  }

  settingChange= (e) => {
    e.preventDefault();
    this.setState({ newOutfitSettingId: parseInt(e.target.value, 10) });
  }

  addOutfit = (e) => {
    e.preventDefault();
    const {
      newOutfitName, newOutfitDescription, userId, newOutfitSettingId,
    } = this.state;
    const outfitToAdd = {
      name: newOutfitName,
      description: newOutfitDescription,
      userId,
      settingId: newOutfitSettingId,
    };
    outfitData.addOutfit(outfitToAdd)
      .then((newOutfit) => {
        console.log(newOutfit);
        this.props.history.push(`/outfit/${newOutfit.id}`);
      })
      .catch((err) => console.error('error in addOutfit', err));
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
              <input type="text" className="form-control" id="outfitName" placeholder="Aragorn" onChange={this.nameChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="outfitDescription">Tell about your outfit</label>
              <textarea className="form-control" id="outfitDescription" rows="3" placeholder="Isildur's heir, Elessar, the Elfstone, Telcontar, Thorongil..." onChange={this.descriptionChange} />
            </div>
            <div className="form-group">
              <label htmlFor="settingDropdown">Pick a setting</label>
              <select className="form-control" id="settingDropdown" onChange={this.settingChange}>
                {settings.map((setting) => <option key={setting.id} value={setting.id}>{setting.name}</option>)}
              </select>
            </div>
            <button onClick={this.addOutfit} type="submit" className="btn btn-primary">Add outfit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Home;
