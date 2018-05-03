# Building Containers

> Simple container that works in Asyncy

```Dockerfile
FROM         alpine
RUN          apk add curl
ENTRYPOINT   ["curl"]
```

```
res = my-container 'http://asyncy.com'
# >>> <head>...
```

Our mission is to make container support **as simple as possible without restricting container capabilities**.

Follow the [Docker Docs](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/) for Dockerfile best practices

A container can accept input and write output (like a traditional function) or stream output into the Storyscript  (like web servers, chat bots, social streams).

* Try to keep images to a bare minimum. Consider using a base image from `alpine`.
* Include an `EXPOSE` instruction for external access
* Include an `ENTRYPOINT`

An `asyncy.yml` file should be provided which outlines the command structure and operations of the container as seen below in the documentation.

## Input

```sh
# shell
docker run --rm owner/repo args --kwargs
```

```
# Storyscript
owner/repo args --kwargs

alias args --kwargs
```

A container accepts input in the same way `docker run` works or most cli's.

<aside class="notice">
Lists and objects are JSON encoded when passed as arguments or keyword arguments.
</aside>

## Output

> Simple container

```
data = alpine echo 'Hello world'
log data
# >>> 'Hello world'
```

> Streaming container example

```
twitter stream '#FOSS' as tweet
    log tweet.message
# >>> "Everything should be #FOSS"
# >>> "Checkout my new project on @github #FOSS"
```

Data written to `stdout` is considered the result of the containers operation and assigned to a variable in the Story.

Streaming containers (http connections, data yielding, etc.) write output to `stdout` with a newline character that distinguishes a new chunk of data.

Containers may also interface via a http server. Data could be `HTTP POST` to the container and the response from the container is provided back into the Story. See an example container using this strategy [here](https://github.com/asyncy/example-container-http).


## Alias

Containers can be assigned aliases which shorten the name from their repository slug from, for example, `asyncy/asyncy-pageres` to just `pageres`.

Aliases are currently granted by Asyncy Staff while in beta.

## Commands

```
# asyncy.yml
commands:
  compress:
    help: Compress a video
    args:
    - name: foo
      type: string
      required: false         # default
      help: Short description
    kwargs:
    - name: block
      type: json
    result:
      type: json
```

Defining commands outline container operations and assist service discovery during Storyscript development.

In addition to the basics above, there are advanced configurations.

### Validation

> Patterns

```
# asyncy.yml
commands:
  go:
    args:
    - name: color hex
      type: string
      pattern: '^\#?\w{6}$'
```

> Enums

```
commands:
  go:
    args:
    - name: choose
      type: string
      enum:
      - thing_one
      - thing_two
```

### Argument Positions

> Argument Positions

```
commands:
  go:
    format: '{bar} {foo} * **' # default
    args:
    - foo
    - bar
```

Modify argument positions the container receives.
By default the container expects variables to be in the order they are defined.


### Additional args and kwargs

```
# asyncy.yml
commands:
  go:
    additional_args:
      type: string
    additional_kwargs: false
```

Optionally disable additional args and kwargs.

### Entrypoint


```
# asyncy.yml
commands:
  entrypoint:  # reserved keyword
    ...
```

Container may not a need a command and operate with an entrypoint.


## Environment

Define required environment variables.

```
# asyncy.yml
env:
  access_token:
    type: string      # define the object type: string, int, list
    pattern: "^key_"  # regexp validation
    required: true    # default
    help: |
      Description of how the user should produce this variable
```

Containers will **only** get the environment variables that are requested.
Application and other container environment variables are strictly not provided.

## Metrics

There are multiple available options to write metrics into the Asyncy platform backed by [Prometheus](https://prometheus.io/).

### Namespacing

There are many ways to organize metrics. While Asyncy will not enforce a specific organizational model for your metrics, it is important to always properly namespace your collected data. This gives you the flexibility to easily slice and dice your metrics at a later date.

See [Prometheus Metric and Label Naming](https://prometheus.io/docs/practices/naming/) to get a better understanding of best practices.

### StatsD

> StatsD basic usage

```shell
echo "accounts.authentication.password.failure.no_email_found:1|c" | nc -u -w1 statsd 8125
```

> StatsD with tag support

```shell
echo "accounts.authentication.password.failure.no_email_found:1|c|#tag:value,another_tag:another_value" | nc -u -w1 statsd 8125
```

Containers can write metrics to StatsD.

The Asyncy platform runs [statsd_exporter](https://github.com/prometheus/statsd_exporter) provided by the Prometheus project.

| Endpoint | Port | Protocol |
| --- | --- | --- |
| `statsd` | `8125` | `tcp` + `udp` |


See [https://github.com/etsy/statsd](https://github.com/etsy/statsd) for usage details.

### Flat Files (Metrics 2.0)

> Flat Files (Metrics 2.0)

```shell
echo '
{
    what=github_response_time
    http_code=206
    http_method=GET
    host=api.github.com
    service=github-api
    stat=upper_90
    target_type=gauge
    unit=ms
}
meta: {
    story=my-new-awesome-story,
    env=production
}
' >> /var/lib/asyncy/metrics.dat
```

Write [Metrics 2.0](http://metrics20.org/) output to `/var/lib/asyncy/metrics.dat`

### Prometheus Exporters and Integrations
<!-- TODO -->


## Logs

> Log format

```
asyncy: app=$ASYNCY_APP_ID story=$ASYNCY_STORY_ID log_hash=$ASYNCY_LOG_HASH line=<line-number> created=<unix-timestamp> source_file=<full-path-to-source-file> [<level>] <message>
```

> Syslog Example

```py
#!/usr/bin/env python

import logging
import logging.handlers
import os

# set asyncy variables
app_id = os.environ['ASYNCY_APP_ID']
story_id = os.environ['ASYNCY_STORY_ID']
log_hash = os.environ['ASYNCY_LOG_HASH']
syslog_host = os.environ['ASYNCY_LOG_HOST']
syslog_port = os.environ['ASYNCY_LOG_PORT']

# define the logger and set the logging level
logger = logging.getLogger('asyncy')
logger.setLevel(logging.INFO)

# add handler
handler = logging.handlers.SysLogHandler(address=(syslog_host, int(syslog_port)))

# add formatter
record_layout = '%(name)s: app=' +  app_id + ' story=' + story_id + ' log_hash=' + log_hash + ' line=%(lineno)d created=%(created)f source_file=%(pathname)s [%(levelname)s] %(message)s'
formatter = logging.Formatter(record_layout)

handler.formatter = formatter
logger.addHandler(handler)

# log the message
logger.info("Logging my story")
```

> Log file Example

```shell
#!/usr/bin/env bash

LOGGER_NAME="asyncy"
LOGGER_LEVEL="INFO"
LOG_FILE="/var/log/asyncy/story.log"

logMsg() {
  LOGGER_LEVEL="$1"
  LOGGER_MESSAGE="$2"
  TIMESTAMP=$(date +'%b %e %R:%S')
  echo "$TIMESTAMP $HOSTNAME $LOGGER_NAME: app=$ASYNCY_APP_ID story=$ASYNCY_STORY_ID log_hash=$ASYNCY_LOG_HASH line=$LINENO created=$(date +%s) source_file=$0 [$LOGGER_LEVEL] $LOGGER_MESSAGE" >> $LOG_FILE
}

logMsg "INFO" "Logging my story"
```

Write logs to `syslog` or to `/var/log/asyncy/story.log`

Containers are passed the following environment variables to be used in logging to Asyncy:

- `ASYNCY_APP_ID`
- `ASYNCY_STORY_ID`
- `ASYNCY_LOG_HASH`

Syslog environment variables:

- `ASYNCY_LOG_HOST`
- `ASYNCY_LOG_PORT`


### Logging Levels

Asyncy accepts the standard Python [logging levels](https://docs.python.org/2/library/logging.html#logging-levels)

| Level    |
|----------|
| CRITICAL |
| ERROR    |
| WARNING  |
| INFO     |
| DEBUG    |
| NOTSET   |


## Volumes

Containers have no volume access by default. However, if a file type is provided as an argument it will be attached to the volume the file exists in.

### Cache Volume
A temporary volume is unique to each Storyline and destroyed when the Storyline finishes. If a Storyline is paused the volume will persist until.

```
# asyncy.yml
volumes:
  cache:
    dest: /mnt/asyncy/cache
    mode: rw
  repo:
    dest: /mnt/asyncy/repository
    mode: rw
  foobar:  # custom title
    dest: /mnt/asyncy/data
```

### Repository Volume
This volume is a clone of the repository from which the Storyscript is stored.
Access the repository assets e.g., images, html and source code.
Changes made to this volume will not commit back to source repository.

### Persistent Volume

Persistent volumes may be created and shared between containers. Used for storing long-term data.

## Interface

Define how Asyncy calls your container.

### cli
```
# asyncy.yml
interface: cli
```

### http(s)
```
# asyncy.yml
interface:
  http:
    ssl: false
    port: 8080
    path: /path/data?key=value
```

## Scaling

Define scaling schedules.

```
# asyncy.yml
scale:
  # [TODO]
```

## Ports

List the ports that need binding upon container startup.

```
# asyncy.yml
ports:
  - 8080
```

## System Requirements

Define containers system requirements.

```
# asyncy.yml
system:
  cpu: 1         # default
  gpu: 0         # default
  memory: 250GB  # default
```

## Health Checks

Inherit from the Dockerfile's `HEALTHCHECK`. https://docs.docker.com/engine/reference/builder/#healthcheck

## Lifecycle

Asyncy will startup containers before they are called in the Storyscript and shutdown the container once no longer needed.
A user-defined command may be provided to prepare the containers execution environment or clean-up workspace.

```
# asyncy.yml
lifecycle:
  startup: ./startup.sh
  shutdown: ./shutdown.sh
```

This command must exit with status 0. `stdout` is logged and not accessable in the Storyline.

## Linux Capacities

All capacities are stripped from the containers.
It's required to list linux capacities in the configuration.
Learn more about [Docker runtime privilege and linux capabilities](https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities).

```
# asyncy.yml
cap:
  - chown
```
> The configuration above will designate `chown` to be included in the capabilities.
