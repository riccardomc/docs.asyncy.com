module.exports = {
  title: 'Λ S N C Y',
  description: 'Write smarter code.',
  ga: 'UA-111475156-5',
  themeConfig: {
    algolia: {
      apiKey: 'daa25e161a8e69d7649ae46784fa45d5',
      indexName: 'asyncy'
    },
    lastUpdated: 'Last Updated',
    repo: 'asyncy/docs.asyncy.com',
    repoLabel: 'Edit in GitHub',
    editLinks: true,
    nav: [
      {
        text: 'More',
        items: [
          { text: 'Platform Overview', link: 'https://asyncy.com/platform' },
          { text: 'Blog', link: 'https://medium.com/asyncy' },
          { text: 'Asyncy App', link: 'https://app.asyncy.com' },
          { text: 'Asyncy Hub', link: 'https://hub.asyncy.com' }
        ]
      }
    ],
    sidebar: [
      '/quick-start/',
      {
        title: 'Applications',
        collapsable: false,
        children: [
          '/storyscript/',
          '/services/',
        ]
      },
      {
        title: 'Developer Tools',
        collapsable: false,
        children: [
          '/cli/',
          // '/plugins/',
          // '/testing/'
        ]
      },
      // {
      //   title: 'API',
      //   collapsable: false,
      //   children: [
      //     '/rest-api/',
      //     '/graphql/',
      //   ]
      // },
      '/faq/',
      '/support/',
      '/diagrams/'
    ]
  }
}
