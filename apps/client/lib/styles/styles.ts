import { CSSProperties } from 'react';

const styledToolbar: CSSProperties = {
  height: '64px',
  paddingRight: '20px',
  borderColor: '#FFDE03',
};
const card: CSSProperties = {
  display: 'grid',
  maxWidth: '100%',
  justifyContent: 'center',
  justifyItems: 'center',
  alignItems: 'center',
  alignContent: 'center',
  padding: '20px 10px',
};
const textField = {
  width: '100%',
};
const container = {
  paddingTop: '50px',
  paddingBottom: '50px',
};
const oAuthLoginBtn = {
  width: '100%',
  height: '50px',
  fontWeight: '500',
  letterSpacing: '1px',
};

export {
  styledToolbar, card, textField, container, oAuthLoginBtn,
};
