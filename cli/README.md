# CLI

Asyncy CLI is designed to be the core toolkit to interact with Asyncy.

::: warning Alpha
Asyncy CLI is currently in Alpha stage. We value your feedback and patience.
To join Alpha please fill out [this form](https://asyncy.click/beta).
:::

## Install
To get started install the Asyncy CLI ([Contribute](https://github.com/asyncy/cli))

<table width="100%">
<tr>
<td style="text-align:center" width="50%" valign="top">
<h1><img src="./apple-logo.svg" width="40"> macOS</h1>

<a href="https://github.com/asyncy/cli/releases/download/0.0.6/asyncy-0.0.6.pkg" class="button">Download the installer</a>

<small>Also available via Homebrew:</small>

```shell
brew install asyncy/brew/asyncy
```

</td>
<td style="text-align:center" width="50%" valign="top">
<h1><img src="./windows-logo.svg" width="40"> Windows</h1>

Download the appropriate installer:

<div><a href="https://github.com/asyncy/cli/releases/download/0.0.6/asyncy-x64.exe" class="button">64-bit installer</a></div>

<div><a href="#" class="button">32-bit installer</a></div>

</td>
</tr>
</table>

<table width="100%">
<tr>
<td style="text-align:center" valign="top">
<h1><img src="./ubuntu-logo.svg" width="40"> Ubuntu 16+</h1>

```shell
sudo snap install asyncy --classic
```

<small><a href="https://snapcraft.io/">Snap is available on other Linux OS.</a></small>

</td>
</tr>
</table>

<table width="100%">
<tr>
<td style="text-align:center" valign="top">
<h3>Direct from Python</h3>

We strongly recommend using the other installation techniques.
The CLI is also available via `python-pip`.

```shell
pip install asyncy
```

</td>
</tr>
</table>



## Getting Started

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
