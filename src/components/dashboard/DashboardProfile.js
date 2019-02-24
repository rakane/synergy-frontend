import React from 'react';

import './DashboardProfile.css';

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
      {/*Todo: Profile Image*/}
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
        <div>
          <p className="profile-info">{website}</p>
        </div>
      )}
      {location.length !== 0 && (
        <div>
          <p className="profile-info">{location}</p>
        </div>
      )}
      {youtube !== undefined && youtube.length !== 0 && (
        <div>
          <p className="profile-info">{youtube}</p>
        </div>
      )}
      {twitter !== undefined && twitter.length !== 0 && (
        <div>
          <p className="profile-info">{twitter}</p>
        </div>
      )}
      {facebook !== undefined && facebook.length !== 0 && (
        <div>
          <p className="profile-info">{facebook}</p>
        </div>
      )}
      {linkedin !== undefined && linkedin.length !== 0 && (
        <div>
          <p className="profile-info">{linkedin}</p>
        </div>
      )}
      {instagram !== undefined && instagram.length !== 0 && (
        <div>
          <p className="profile-info">{instagram}</p>
        </div>
      )}
    </div>
  );
};

export default DashboardProfile;
