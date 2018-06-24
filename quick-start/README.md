---
prev: false
next: /storyscript/
---

# Quick Start

Welcome to Asyncy :tada: We are very excited to have share our product in early Alpha with you.

::: warning Invite Only
The steps below are for users that have requested access to Asyncy Alpha.
:::

## Dependencies

In order to start Asyncy Alpha you will need the following services installed.

1. :whale: [Docker >=18.02](https://docs.docker.com/install/) and [Docker-Compose >=1.21](https://docs.docker.com/compose/install/)
2. :snake: Python >=3
3. :smile: Happiness

Now that you have the dependencies installed, let's install Asyncy.

## Install the CLI
To get started install the Asyncy CLI

```shell
brew install asyncy/brew/asyncy
```
> <small> :computer: **Not using macOS?** Checkout [all the installation options](/cli/#install).</small>

Then create a new folder for your project.

```shell
cd ~/my-story
```

Now, login to Asyncy Alpha.

```shell
asyncy login
```

The login will then bootstrap the Alpha environment by pulling the stack and running it. See all commands by running `asyncy`.

:sparkles::cake::sparkles:

## Your first Story

Storyscript is a new programming language, but do not worry, it's built for developers taking favourite features of many languages. You'll see familiar syntax to Python, Ruby, Clojure and Node.

Let's start with some templates. Run the following command to list all story templates.

```shell
asyncy bootstrap
```

Let's choose the http endpoint.

```shell
asyncy bootstrap http > hello.story
```

This will template out a story that registers with Asyncy Gateway.
The story looks like this:

```coffeescript
http-endpoint method:'get' path:'/' as request, response
    response write 'Hello world!'
```

Next, commit the changes. Anytime you change your stories you need to commit the changes in `git`.

```shell
git add . && git commit -m 'initial commit :tada:'
```

Ship it! :rocket:

```shell
asyncy deploy
```
> <small>or `git push asyncy master`</small>

You just deployed your first Story on Asyncy. Nice job! :tada:

```shell
curl http://asyncy.net
Hello world!
```

> <small>The DNS [asyncy.net](http://asyncy.net) points to `localhost` :thumbsup:</small>

Next, checkout our blog post on writing stories.

::: tip Blog
Read [How to write Stories](https://medium.com/asyncy/how-to-write-stories-a7cffd270225) on Medium (2 minutes)
:::
