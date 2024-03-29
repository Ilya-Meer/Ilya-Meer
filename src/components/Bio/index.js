import React, { useContext } from 'react';
import { Link } from 'gatsby'
import { ThemeContext } from '../../contexts/ThemeContext';
import { StyledWrapper } from './style';

const Bio = ({ colours }) => {
  const { fonts } = useContext(ThemeContext);

  return (
    <StyledWrapper fonts={fonts} colours={colours}>
      <h1>Hi there!</h1>
      <p>
        I'm Ilya Meerovich, a software engineer based in Vancouver, BC.
      </p>
      <p>
        <span>Outside of work I enjoy reading, occasionally writing, </span>
        <Link to="/coffee">drinking coffee</Link>
        <span>, and learning how to be more effective with the information I consume.</span>
      </p>
      <p>
        You can reach me by{' '}
        <a target="_blank" rel="noreferrer" href="mailto:ilya.meerov@gmail.com">
          email
        </a>
        .
      </p>
    </StyledWrapper>
  );
};
export default Bio;
