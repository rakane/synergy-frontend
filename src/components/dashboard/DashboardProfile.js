import React from 'react';
import { Image } from 'cloudinary-react';

import './DashboardProfile.css';

import websiteArt from '../../assets/website.svg';
import locationArt from '../../assets/location.svg';
import twitterArt from '../../assets/twitter.png';
import instagramArt from '../../assets/instagram.png';
import facebookArt from '../../assets/facebook.png';
import youtubeArt from '../../assets/youtube.png';
import linkedinArt from '../../assets/twitter.png';

const DashboardProfile = ({
  name,
  handle,
  bio,
  website,
  location,
  twitter,
  facebook,
  youtube,
  linkedin,
  instagram
}) => {
  return (
    <div id="profile">
      <Image
        className="profile-image"
        cloudName="dozvpglka"
        publicId={'profile/' + handle}
        crop="scale"
      />
      <h1 id="profile-name">{name}</h1>
      <h2 id="profile-handle" className="muted">
        @{handle}
      </h2>
      {bio.length !== 0 && (
        <div>
          <p className="profile-info">{bio}</p>
        </div>
      )}
      {website.length !== 0 && (
        <div className="profile-row">
          <img src={websiteArt} alt="website icon" />
          <p className="profile-info">{website}</p>
        </div>
      )}
      {location.length !== 0 && (
        <div className="profile-row">
          <img className="media-link" src={locationArt} alt="location icon" />
          <p className="profile-info">{location}</p>
        </div>
      )}
      {youtube !== undefined && youtube.length !== 0 && (
        <div className="profile-row">
          <img src={youtubeArt} alt="youtube icon" />
          <p className="profile-info">{youtube}</p>
        </div>
      )}
      {twitter !== undefined && twitter.length !== 0 && (
        <div className="profile-row">
          <img src={twitterArt} alt="twitter icon" />
          <p className="profile-info">{twitter}</p>
        </div>
      )}
      {facebook !== undefined && facebook.length !== 0 && (
        <div className="profile-row">
          <img src={facebookArt} alt="facebook icon" />
          <p className="profile-info">{facebook}</p>
        </div>
      )}
      {linkedin !== undefined && linkedin.length !== 0 && (
        <div className="profile-row">
          <img src={linkedinArt} alt="linkedin icon" />
          <p className="profile-info">{linkedin}</p>
        </div>
      )}
      {instagram !== undefined && instagram.length !== 0 && (
        <div className="profile-row">
          <img className="media-link" src={instagramArt} alt="website icon" />
          <p className="profile-info">{instagram}</p>
        </div>
      )}
    </div>
  );
};

export default DashboardProfile;
