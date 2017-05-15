import React from 'react';
import PropTypes from 'prop-types';

import { Input } from 'react-toolbox';

import { SPOTIFY_URI_FORMAT } from 'constants';
import theme from './theme.scss';

const SpotifyURIInput = ({ value, actions }) => {
  const isValid = value.length === 0 || !!value.match(SPOTIFY_URI_FORMAT);

  return (
    <Input
      theme={theme}
      className='operations-input'
      type='text'
      value={value}
      label='Paste Spotify URI'
      hint='Must match valid Spotify URI format'
      error={isValid ? '' : 'Invalid Spotify URI'}
      onChange={actions.emitSpotifyURIUpdate}
      required/>
  );
};

SpotifyURIInput.propTypes = {
  value: PropTypes.string,
  actions: PropTypes.shape({
    emitSpotifyURIUpdate: PropTypes.func.isRequired
  })
};

export default SpotifyURIInput;
