import React from 'react';
import { render } from 'react-dom';


import { JournalApp } from './JournalApp';
import './styles/styles.scss';



const rootElement = document.getElementById("root");

render(
  <JournalApp />, 
  rootElement
);
 