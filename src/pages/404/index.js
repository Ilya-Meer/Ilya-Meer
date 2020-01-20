import '../../../static/stylesheets/normalize.css';
import '../../../static/stylesheets/global.css';
import React, { Component, Fragment } from 'react';
import Scene from '../../components/ThreeJSScene';
import SEO from '../../components/SEO';
import Header from '../../components/Header';
import font from '../../../static/assets/fonts/raleway_404.json';
import styles from './styles.module.css';

class NotFoundPage extends Component {
  render() {
    const { location } = this.props;

    const displayText = '404';
    const colour = 0x000;
    const size = 75;

    return (
      <Fragment>
        <SEO title="404: Not Found" />
        <Header location={location} />
        <div className={styles.contentWrapper}>
          <h1 className={styles.pageTitle}>Whoops!</h1>
          <p className={styles.lead}>
            Looks like the page you're looking for isn't here, sorry about that.
            Try one of the links above.
          </p>
        </div>
        <Scene
          font={font}
          displayText={displayText}
          colour={colour}
          size={size}
          style={{ position: 'absolute' }}
        />
      </Fragment>
    );
  }
}

export default NotFoundPage;
