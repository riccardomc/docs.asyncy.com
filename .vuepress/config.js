module.exports = {
  title: 'Asyncy',
  description: 'Microservice choreography as a platform.',
  ga: 'UA-111475156-5',
  themeConfig: {
    repo: 'asyncy/docs.asyncy.com',
    repoLabel: 'Edit in GitHub',
    editLinks: true,
    nav: [
      { text: 'Platform', link: 'https://asyncy.com/platform' },
      { text: 'Blog', link: 'https://medium.com/asyncy' },
      { text: 'App', link: 'https://app.asyncy.com' },
      { text: 'Hub', link: 'https://hub.asyncy.com' }
    ],
    sidebar: [
      '/quick-start/',
      {
        title: 'Building Applications',
        collapsable: false,
        children: [
          '/storyscript/',
          '/services/',
        ]
      },
      // {
      //   title: 'Development',
      //   collapsable: false,
      //   children: [
      //     '/cli/',
      //     '/plugins/',
      //     '/testing/'
      //   ]
      // },
      // {
      //   title: 'Deploying',
      //   collapsable: false,
      //   children: [
      //     '/alpha/',
      //     '/asyncy_cloud/',
      //     '/kubernetes/',
      //   ]
      // },
      // {
      //   title: 'User Interfaces',
      //   children: [
      //     '/app/',
      //     '/hub/',
      //   ]
      // },
      // {
      //   title: 'API',
      //   children: [
      //     '/rest-api/',
      //     '/graphql/',
      //   ]
      // },
      // {
      //   title: 'Diagrams',
      //   children: [
      //   ]
      // },
      '/faq/',
      '/support/'
    ]
  }
}
