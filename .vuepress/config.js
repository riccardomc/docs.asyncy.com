module.exports = {
  title: 'Asyncy Docs',
  description: '',
  ga: 'UA-111475156-5',
  themeConfig: {
    repo: 'asyncy/docs.asyncy.com',
    repoLabel: 'Contribute!',
    editLinks: true,
    sidebar: [
      '/',
      {
        title: 'Building Applications',
        collapsable: false,
        children: [
          '/storyscript/',
          '/services/',
        ]
      },
      {
        title: 'Development',
        collapsable: false,
        children: [
          '/cli/',
          '/plugins/',
          '/testing/'
        ]
      },
      {
        title: 'Deploying',
        collapsable: false,
        children: [
          '/alpha/',
          '/asyncy_cloud/',
          '/kubernetes/',
        ]
      },
      {
        title: 'User Interfaces',
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
      {
        title: 'Diagrams',
        children: [
        ]
      },
      '/faq/'
    ]
  }
}
