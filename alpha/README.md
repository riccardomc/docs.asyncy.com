# Asyncy Alpha Release

During Alpha you can write stories, build services and run applications, almost like you would in Asyncy Beta, but with caveats.

1. [Request access](https://asyncy.click/beta-invite) to Asyncy Alpha
1. Write Stories with [Storyscript](/storyscript/)
1. Find services in the [Asyncy Hub](https://hub.asyncy.com/) or [Build your own](/services/).
1. Debug stories with `asyncy test`
1. Deploy stories with `asyncy deploy` or `git push asyncy master`

::: tip Custom Services
Contact the Asyncy Team to submit your service to the Asyncy Hub. It's a manual process during Alpha.
:::

## Feedback and Questions

Please provide your comments and ideas during Alpha in [Slack](https://asyncy.click/slack) or [anonymously](https://asyncy.click/feedback).


## Your Environment

- [Application](http://asyncy.net) - Your application.
- [Grafana](http://grafana.asyncy.net) - Metrics
- [Kibana](http://kibana.asyncy.net) - Logs
- [Proxy](http://asyncy.net:8080) - Traefik reverse proxy


## Caveats
- **Single-App Mode** Asyncy Alpha is single application mode and can only run one-app per machine, so jam it all in one repo!
- **Devtools are not built yet.** We are building IDE plugins, syntax highlighting, autocompleting and more which will significantly help writing stories and debugging.
- **Service constraints.** Currently there is no support for containers that stream information (such as streaming tweets into Storyscript).
- **Microservices do not scale.** During Alpha it's 1 container per service. It wont be an issue, but just to keep in mind.
- **Asyncy Hub** is partially complete with many features are not available.



## Bugs

Please find and file bugs here: [Issues](https://github.com/asyncy/alpha/issues)

Contribute by picking at [[good first issue]](https://github.com/search?q=org:asyncy+state:open+label:"good+first+issue") or something that needs to be done [[now]](ttps://github.com/search?q=org:asyncy+state:open+label:now).
