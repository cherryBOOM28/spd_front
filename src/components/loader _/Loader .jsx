import React from 'react';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Loader = ({ loading }) => {
  return (
    <div className="sweet-loading">
      <ClipLoader css={override} size={50} color={'#1B3884'} loading={loading} />
    </div>
  );
};

export default Loader;
