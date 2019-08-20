import React from 'react'
import { Link } from 'gatsby';
import classNames from 'classnames';

import styles from './styles.module.css'

const Header = (props) => {
  const {
    location
  } = props;

  const isHomePage = location.pathname === '/'
  const isBlogPage = location.pathname === '/blog';

  const isBlogPostPage = !isHomePage && !isBlogPage;

  const renderHeader = () => (
    <nav className={
      classNames([
        styles.siteNav,
        isHomePage ? styles.homeNav : '',
        isBlogPostPage ? styles.postPage : ''
      ])
    }>
      {!isHomePage && (
        <div className={styles.homeLink}><Link to="/">Home</Link></div>
      )}
      <ul>
        {!isBlogPage && (
          <li><Link to="/blog">Blog</Link></li>
        )}
        <li>
          <a href="https://github.com/Ilya-Meer/" target="_blank" rel="noopener noreferrer">
            Github
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/ilya-meerovich/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </li>
      </ul>
    </nav>
  )

  return (
    <div>
      <header>
        {renderHeader()}
      </header>
    </div>
  )
}

export default Header;
