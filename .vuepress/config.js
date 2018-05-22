module.exports = {
  title: 'Asyncy',
  description: 'Microservice choreography as a platform.',
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
      '/faq/',
      {
        title: 'Building Applications',
        children: [
          '/storyscript/',
          '/services/',
        ]
      },
      {
        title: 'Developer Tools',
        children: [
          '/cli/',
          '/plugins/',
          // '/testing/'
        ]
      },
      // {
      //   title: 'Deploying',
      //   collapsable: false,
      //   children: [
      //     '/alpha/',
      //     '/asyncy_cloud/',
      //     '/kubernetes/',
      //   ]
      // },
      {
        title: 'Frontends',
        children: [
          '/app/',
          '/hub/',
        ]
      },
      {
        title: 'API',
        children: [
          '/rest-api/',
          '/graphql/',
        ]
      },
      '/support/',
      '/diagrams/'
    ]
  }
}
