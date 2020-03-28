---
title: A little script to generate React components
date: "2020-03-28T05:17:06.735Z"
description: ''
---

Setting up the boilerplate to write a React component can be tedious. On its own, making a directory and putting some files in it with some basic import statements is not a big deal, but doing it over and over (especially when setting up a project) can chip away at your mental resources. 

So I wanted to share a little script to help take out some of the legwork. 

Assuming the following directory structure:

```javascript
root
├── scripts
│    └── createComponent.js
├── src
│   ├── components
│   ├── pages
│   └── ...
└── ...
```

The script affords the following example usage: 

`$ node scripts/createComponent.js component Header`

And yields the following result:

```javascript
root
├── scripts
│    └── createComponent.js
├── src
│   ├── components
│   │      └── Header
│   │            ├── __tests__
│   │            │      └── index.test.js
│   │            ├── header.module.css
│   │            └── index.js
│   │          
│   │          
│   └── pages
└── ...
```

This assumes you're using CSS Modules, but you can change the file names to suit your setup. 

The idea is that presentation components that we might like to generate in the `components` directory can be placed there by specifying `component` in the terminal. Container components to be placed in `pages` can be sent there by using `page` instead.

The script creates the directory with the name you specify, and then for each file that is generated, I have it add some of the imports and boilerplate that I find myself writing most often (React, propTypes, export statement, etc.), but your needs may vary :) 

No doubt a more robust version of this could take the form of a full-fledged CLI, with more configuration options, or a wizard or something. For now, this little script is already paying for itself. 

Here it is in its entirety:


```javascript
const fs = require('fs');
const path = require('path');

const [, , dirType, componentName] = process.argv;

let dir;
if (dirType === 'c' || dirType === 'component') dir = 'components';
if (dirType === 'p' || dirType === 'page') dir = 'pages';

const pathToComponent = path.join(__dirname, '..', 'src', dir, componentName);

/**
 * Component Creation Driver
 */

const createComponent = () => {
  fs.mkdirSync(pathToComponent);

  createIndex();
  createStyle();
  createTest();
};

/**
 * File Creation Templates
 */

const createIndex = () => {
  const blankComponent = `
import React from 'react';
import PropTypes from 'prop-types';

function ${componentName}(props) {
    return (
        <div></div>
    )
}

export default ${componentName};

${componentName}.propTypes = {

}
  `;

  fs.writeFileSync(path.join(pathToComponent, 'index.js'), blankComponent);
};

const createStyle = () => {
  const blankCSS = `
@value (

) from '../../shared-styles/index.css';
  `;

  fs.writeFileSync(
    path.join(pathToComponent, `${componentName.toLowerCase()}.module.css`),
    blankCSS
  );
};

const createTest = () => {
  const testDir = path.join(pathToComponent, '__tests__');
  fs.mkdirSync(testDir);

  const blankTest = `
import React from 'react';
import { shallow } from 'enzyme';
import ${componentName} from '..';

it('renders without crashing', () => {
  const wrapper = shallow(<${componentName} />);
  expect(wrapper).toMatchSnapshot();
});
  `;

  fs.writeFileSync(path.join(testDir, 'index.test.js'), blankTest);
};

createComponent();

```

Happy Coding!