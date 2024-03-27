import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import SEO from '../../components/SEO';
import { ThemeContext } from '../../contexts/ThemeContext';
import useBodyToggle from '../../utils/useBodyToggle';
import coffeeLog from '../../../data/coffeeLog.json';
import Layout from '../../components/Layout';

const SelectionStyle = css`
  ::selection {
    color: ${({ colours }) => colours.selectionColour};
    background: ${({ colours }) => colours.selectionBackground};
  }
`;

const CoffeeLogIntro = styled.div`
  width: 80%;
  max-width: 42rem;
  margin: 0 auto;
  color: ${({ colours }) => colours.textContent};

  *${SelectionStyle};

  p {
    font-family: ${({ fonts }) => fonts.text};
  }
`

const Heading = styled.h1`
  margin: 0.125em 0 0.125em 0;
  font-size: 1.75em;
  font-weight: 600;
  font-family: ${({ fonts }) => fonts.heading};
`;

const LogWrapper = styled.div`
  margin: 0 auto;

  *${SelectionStyle};
`;

const Container = styled.div`
  padding: 10px;
  display: block;

  @media all and (min-width: 450px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(315px, 1fr));
  }

  @media all and (min-width: 800px) {
    display: block;
  }
`

const StyledCard = styled.div`
  align-self: center;
  display: block;
  margin: 10px;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid ${({ colours }) => colours.accent};
  font-family: ${({ fonts }) => fonts.text};
  color: ${({ colours }) => colours.textContent};
  overflow-wrap: break-word;

  hr {
    width: 100%;
  }

  .card-section {
    display: block;
  }

  .field-group {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
  }

  .field-group span:first-of-type {
    font-size: 12px;
    color: ${({ colours }) => colours.accent};
  }

  @media all and (min-width: 800px) {
    display: flex;
    flex-direction: column;

    .card-section {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    }

    .field-group {
      max-width: 250px;
      margin: 5px;
    }
  }

`;

const renderOrigin = (originInfo) => {
  return originInfo.split("\n").map((segment, idx) => {
    const [field, value] = segment.split(":");
    return (
      <div
        key={field + value + idx}
        className="field-group"
      >
        <span>{field}</span>
        <span>{value}</span>
      </div>
    );
  });
};

const CoffeeCard = ({ data, fonts, colours }) => {
  return (
    <StyledCard
      fonts={fonts}
      colours={colours}
    >
      <div className="card-section">
        {renderOrigin(data.origin)}
        <div className="field-group">
          <span>Varietal:</span>
          <span>{data.varietal || "-/-"}</span>
        </div>
        <div className="field-group">
          <span>Process:</span>
          <span>{data.process || "-/-"}</span>
        </div>
        <div className="field-group">
          <span>Roaster:</span>
          <span>{data.roaster}</span>
        </div>
        <div className="field-group">
          <span>Tasting Notes:</span>
          <span>{data.tastingNotes || "-/-"}</span>
        </div>
        <div className="field-group">
          <span>Elevation:</span>
          <span>{data.elevation ? `${data.elevation}masl` : "-/-"}</span>
        </div>
      </div>
      <hr />
      <div className="card-section">
        <div className="field-group">
          <span>Name:</span>
          <span>{data.name || "-/-"}</span>
        </div>
        <div className="field-group">
          <span>Purchase Location:</span>
          <span>{data.purchaseLocation}</span>
        </div>
        <div className="field-group">
          <span>Date first consumed:</span>
          <span>{data.dateFirstConsumed}</span>
        </div>
        <div className="field-group">
          <span>Notes:</span>
          <span>{data.otherNotes || "-/-"}</span>
        </div>
      </div>
    </StyledCard>
  );
};

const Coffee = ({ location, data }) => {
  const {
    theme: { colours },
    fonts,
  } = useContext(ThemeContext);

  useBodyToggle(colours);

  return (
    <Layout location={location} wide>
      <SEO title="Coffee Log" />
      <CoffeeLogIntro
        colours={colours}
        fonts={fonts}
      >
        <Heading fonts={fonts}>
          Coffee Log
        </Heading>
        <p>
          A list of all the specialty coffees I've tried in the past while, either at home or in a coffee shop. I tried to include as much detail as I could find. The spelling of varietals, place names, etc. is taken from the packaging.
        </p>
        <p>
          My current home setup consists of:
          <ul>
            <li>Hario V60-02 - Plastic</li>
            <li>Aeropress</li>
            <li>1Zpresso ZP6 Special grinder</li>
          </ul>
        </p>
      </CoffeeLogIntro>
      <LogWrapper colours={colours}>
        <Container>
          {coffeeLog
            .sort((a, b) => Date.parse(b.dateFirstConsumed) - Date.parse(a.dateFirstConsumed))
            .map((coffee) => (
              <CoffeeCard
                key={coffee.tastingNotes + coffee.dateFirstConsumed}
                data={coffee}
                fonts={fonts}
                colours={colours}
              />
          ))}
        </Container>
      </LogWrapper>
    </Layout>
  )
}

export default Coffee;
