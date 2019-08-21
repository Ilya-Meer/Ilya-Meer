const ghpages = require('gh-pages')

ghpages.publish(
  'public',
  {
    branch: 'master',
    repo: 'https://github.com/Ilya-Meer/Ilya-Meer.github.io.git',
  },
  () => {
    console.log('Deploy Complete!')
  }
)