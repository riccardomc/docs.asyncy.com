# CLI

Asyncy CLI is designed to be the core toolkit to interact with Asyncy.

::: tip Alpha
Asyncy CLI is currently in Alpha stage. We value your feedback and patience.
:::

## Install
To get started install the Asyncy CLI ([Contribute](https://github.com/asyncy/cli))

```shell
pip install --user asyncy
```

Then login to your Asyncy account.

```shell
asyncy login
Email:
Password:
```

Now you are authenticated to use the Asyncy Platform

:sparkles::cake::sparkles:

## Updating

```shell
pip install --user -U asyncy
```

:tada: Holla at me upgrade!

## Usage
```shell
asyncy --help
Usage: asyncy [OPTIONS] COMMAND [ARGS]...

Options:
  --help  Show this message and exit.

Commands:
  deploy    Deploy your Story project git push asyncy...
  login     Login to Asyncy
  logs      Show compose logs
  ls        List services and user interfaces
  shutdown  Show stack status and health
  start     Start the Asyncy Stack
  status    Show stack status and health
  test      Test the Stories
  update    Pull new updates to the Asyncy Stack
```

Get more details on each command by applying `--help` to the command.

```shell
asyncy deploy --help
Usage: asyncy deploy [OPTIONS]

  Deploy your Story project

      git push asyncy master

Options:
  -f, --force  Forse push
  --help       Show this message and exit.
```
