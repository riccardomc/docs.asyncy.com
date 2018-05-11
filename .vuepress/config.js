module.exports = {
  title: 'Asyncy Docs',
  description: '',
  ga: 'UA-111475156-5',
  themeConfig: {
    repo: 'asyncy/docs.asyncy.com',
    repoLabel: 'Contribute!',
    editLinks: true,
    nav: [
      { text: 'Platform', link: 'https://5af1a22e1f12b77e9ad384c2--asyncy-homepage.netlify.com/platform' },
      { text: 'Documentation', link: '/' },
      { text: 'About', link: 'https://5af1a22e1f12b77e9ad384c2--asyncy-homepage.netlify.com/about' },
      { text: 'Events', link: 'https://5af1a22e1f12b77e9ad384c2--asyncy-homepage.netlify.com/events' },
      { text: 'Contact', link: 'https://5af1a22e1f12b77e9ad384c2--asyncy-homepage.netlify.com/contact' }
    ],
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
