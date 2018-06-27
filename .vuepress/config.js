module.exports = {
  title: 'Λ S Y N C Y',
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
    sidebarDepth: 1,
    nav: [
      { text: 'Platform', link: 'https://asyncy.com/platform' },
      {
        text: 'More',
        items: [
          { text: 'Blog', link: 'https://medium.com/asyncy' },
          { text: 'Asyncy Hub', link: 'https://hub.asyncy.com' }
        ]
      }
    ],
    sidebar: [
      '/quick-start/',
      '/storyscript/',
      '/services/',
      '/cli/',
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
