import React from 'react';

import outfitData from '../../../helpers/data/outfitData';
import settingData from '../../../helpers/data/settingData';

import './AddOutfitDropdown.scss';

class AddOutfitDropdown extends React.Component {
  state = {
    userId: 1,
    settings: [],
    newOutfitName: '',
    newOutfitDescription: '',
    newOutfitSettingId: 0,
    errors: {
      name: '',
      description: '',
      setting: '',
    },
  }

  getSettings = () => {
    settingData.getAllSettings()
      .then((settings) => this.setState({ settings }))
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.getSettings();
  }

  openDropdown = (e) => {
    e.preventDefault();
    document.getElementById('new-outfit-form').classList.toggle('show');
  }

  handleChange = (event) => {
    event.preventDefault();
    const { id, value } = event.target;
    const { errors } = this.state;

    switch (id) {
      case 'newOutfitName':
        errors.name = value.length > 50 || value.length === 0
          ? 'Name must be between 1 and 50 characters'
          : '';
        break;
      case 'newOutfitDescription':
        errors.description = value.length > 200
          ? 'Description limited to 200 characters'
          : '';
        break;
      case 'newOutfitSettingId':
        errors.setting = value === ''
          ? 'Please choose a setting'
          : '';
        break;
      default:
        break;
    }

    this.setState({ errors, [id]: value });
  }

  validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => {
        val.length > 0 && (valid = false);
      },
    );
    return valid;
  }

  addOutfit = (e) => {
    e.preventDefault();
    const {
      errors, newOutfitName, newOutfitDescription, userId, newOutfitSettingId,
    } = this.state;
    if (this.validateForm(errors) && newOutfitSettingId > 0) {
      const outfitToAdd = {
        name: newOutfitName,
        description: newOutfitDescription,
        userId,
        settingId: parseInt(newOutfitSettingId, 10),
      };
      outfitData.addOutfit(outfitToAdd)
        .then((newOutfit) => this.props.history.push(`/outfit/${newOutfit.id}`))
        .catch((err) => console.error('error in addOutfit', err));
    }
  }

  render() {
    const { settings, errors } = this.state;
    return (
      <div className="AddOutfitDropdown dropdown">
          <button onClick={this.openDropdown} className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            Make a New Outfit!
          </button>
          <form className="dropdown-menu p-4" id="new-outfit-form" aria-labelledby="dropdownMenuButton" noValidate>
            <div className="form-group">
              <label htmlFor="newOutfitName">Name your outfit</label>
              <input type="text" className="form-control" id="newOutfitName" placeholder="Aragorn" onChange={this.handleChange}/>
              <span className="error">{errors.name.length > 0 && errors.name}</span>
            </div>
            <div className="form-group">
              <label htmlFor="newOutfitDescription">Tell about your outfit</label>
              <textarea className="form-control" id="newOutfitDescription" rows="3" placeholder="Isildur's heir, Elessar, the Elfstone, Telcontar..." onChange={this.handleChange} />
              <span className="error">{errors.description.length > 0 && errors.description}</span>
            </div>
            <div className="form-group">
              <label htmlFor="newOutfitSettingId">Pick a setting</label>
              <select className="form-control" id="newOutfitSettingId" onChange={this.handleChange}>
                <option key="0" value={null}></option>
                {settings.map((setting) => <option key={setting.id} value={setting.id}>{setting.name}</option>)}
              </select>
              <span className="error">{errors.setting.length > 0 && errors.setting}</span>
            </div>
            <button onClick={this.addOutfit} type="button" className="btn btn-primary">Add outfit</button>
          </form>
        </div>
    );
  }
}

export default AddOutfitDropdown;
