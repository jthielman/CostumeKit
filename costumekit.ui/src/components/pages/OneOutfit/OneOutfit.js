import React from 'react';

import outfitData from '../../../helpers/data/outfitData';
import garmentData from '../../../helpers/data/garmentData';
import settingData from '../../../helpers/data/settingData';

import GarmentCard from '../../shared/GarmentCard/GarmentCard';

import './OneOutfit.scss';

class OneOutfit extends React.Component {
  state = {
    outfit: {},
    garments: [],
    settings: [],
    nameEditMode: false,
    descriptionEditMode: false,
    settingEditMode: false,
  }

  getOutfit = (outfitId) => {
    outfitData.getOneOutfit(outfitId)
      .then((response) => this.setState({ outfit: response }))
      .catch((err) => console.error('error in get outfit', err));
  }

  getGarments = (outfitId) => {
    garmentData.getGarmentsByOutfitId(outfitId)
      .then((response) => this.setState({ garments: response }))
      .catch((err) => console.error('error in get garments', err));
  }

  getSettings = () => {
    settingData.getAllSettings()
      .then((settings) => this.setState({ settings }))
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    const { outfitId } = this.props.match.params;
    this.getOutfit(outfitId);
    this.getGarments(outfitId);
    this.getSettings();
  }

  editButtonClick = (e) => {
    e.preventDefault();
    e.persist();
    const { id } = e.currentTarget;
    this.setState({ [id]: true });
  }

  handleChange = (e) => {
    const { value, id } = e.target;
    const { outfit, settings } = this.state;
    const newSetting = settings.filter((setting) => setting.id === parseInt(value, 10));
    if (id === 'setting') {
      outfit.settingId = parseInt(value, 10);
      outfit.settingName = newSetting[0].name;
    } else {
      outfit[id] = value;
    }
    this.setState({ outfit });
  }

  saveChanges = (e) => {
    e.preventDefault();
    const { outfit } = this.state;
    const editMode = `${e.currentTarget.id.slice(4).toLowerCase()}EditMode`;
    outfitData.updateDetails(outfit)
      .then(() => {
        this.setState({ [editMode]: false });
      });
  }

  render() {
    const {
      outfit,
      garments,
      settings,
      nameEditMode,
      descriptionEditMode,
      settingEditMode,
    } = this.state;
    return (
      <div className="OneOutfit container">
        <div className="row d-flex justify-content-center align-items-baseline">
          <div className="col-4">
            {nameEditMode
              ? <div className="row input-group">
                  <input id="name" className="form-control form-control-lg" type="text" value={outfit.name} onChange={this.handleChange} />
                  <div className="input-group-append">
                    <button id="saveName" type="button" className="btn btn-outline-secondary" onClick={this.saveChanges}><i className="fas fa-check"></i></button>
                  </div>
                </div>
              : <div id="Name" className="row d-flex justify-content-between align-items-baseline">
                  <h2>{outfit ? outfit.name : ''}</h2>
                  <button type="button" className="btn text-muted" id="nameEditMode" onClick={this.editButtonClick}><i className="fas fa-pen-fancy"></i></button>
                </div>
            }
            {settingEditMode
              ? <div className="row input-group">
                  <select className="form-control" id="setting" onChange={this.handleChange} value={outfit.settingId}>
                    <option key="0" value={null}></option>
                    {settings.map((setting) => <option key={setting.id} value={setting.id}>{setting.name}</option>)}
                  </select>
                  <div className="input-group-append">
                    <button id="saveSetting" type="button" className="btn btn-outline-secondary" onClick={this.saveChanges}><i className="fas fa-check"></i></button>
                  </div>
                </div>
              : <div className="row d-flex justify-content-between align-items-baseline">
                  <h4 className="text-muted">{outfit.settingName}</h4>
                  <button type="button" className="btn text-muted" id="settingEditMode" onClick={this.editButtonClick}><i className="fas fa-pen-fancy"></i></button>
                </div>
            }
          </div>
          {descriptionEditMode
            ? <div className="col-6 input-group">
                <textarea id="description" className="form-control" value={outfit.description} onChange={this.handleChange} />
                <div className="input-group-append">
                  <button id="saveDescription" type="button" className="btn btn-outline-secondary" onClick={this.saveChanges}><i className="fas fa-check"></i></button>
                </div>
              </div>
            : <div className="row d-flex justify-content-between align-items-baseline">
                <p className="outfit-description col">{outfit.description}</p>
                <button type="button" className="btn text-muted" id="descriptionEditMode" onClick={this.editButtonClick}><i className="fas fa-pen-fancy"></i></button>
              </div>
          }
        </div>
        <h3>Garments:</h3>
        <div className="row justify-content-center">
          {garments.length > 0 ? garments.map((garment) => <GarmentCard garment={garment} key={garment.id} outfit={outfit} getGarments={this.getGarments} />)
            : <p>Looks like there are no garments yet.  Care to add some?</p>}
        </div>
      </div>
    );
  }
}

export default OneOutfit;
