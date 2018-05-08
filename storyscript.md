# Storyscript

> Simple, yet powerful example.

```coffeescript
http server as request
    id = uuid uuid4

    # Using https://machinebox.io/
    details = machinebox/videobox request.body

    mongodb insert 'videos' {'id': id, 'details': details}

    if details.contains_nudity is false

        # Using https://github.com/xiph/daala
        video = xiph/daala request.body

        s3 put 's3://my-bucket/video/{{id}}.mp4' video
```

**Readable high-level logic that choreographs microservices.**

Inspired by the [Zen of Pyhton](https://zen-of-python.info/)
where functions are microservices. This dynamic-type programming language is expressive, readable and syntax-light where application logic is written is transparent operations that execute microservices under-the-hood.

Storyscript's (or Stories for short) focus on **the application goals only**. Asyncy takes care of all the devops such as **logs, metrics, fail-over, rate-limiting, tracebacks and scaling**. This enabled developers to prototype into production applications quickly.

The example on the right illustrates this well. The services needed to upload, analyze, compress and archive a video are expressed in a procedural which is highly readable without any "extra" development debt. In comparison, the same application would likely take hundreds of lines of code, not to mention all the devops that would be manually programmed.

The syntax emphasis is on **readability, flexibility, and transparency**.
All the operations developers expect are built-in and likely quite familiar.

## Strings

```coffeescript
data = "foobar"

long_string = "Hi Friend,
This is a long string."
# >>> "Hi Friend, This is a long string."

more_data = """
    The quick brown fox
    jumps over the lazy dog.
"""
# >>> The quick brown fox\njumps over the lazy dog.

where = "Earth"
data_formatted = "Hello, {{where}}"
# >>> "Hello, Earth"
```

:::v-pre
Like Python and many other languages, Storyscript supports strings as delimited by the `"` or `'` characters.
Storyscript also supports string interpolation within "-quoted strings, using `{{ … }}`.
:::
Single-quoted strings are literal. You may even use interpolation in object keys.

Multiline strings are allowed in Storyscript.
Lines are joined by a single space unless they end with a backslash.
Indentation is ignored.

Block strings, delimited by `"""` or `'''`, can be used to hold formatted or indentation-sensitive text (or, if you just don’t feel like escaping quotes and apostrophes).
The indentation level that begins the block is maintained throughout, so you can keep it all aligned with the body of your code.

Double-quoted block strings, like other double-quoted strings, allow interpolation.

## Numbers

```coffeescript
int = 1
number = 1.2
```

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.


## Comments

```coffeescript
###
Large
  Comment
Block
####

# Inline comment

foo = "bar"  # end of line comment
```

In Storyscript, comments are denoted by the `#` character to the end of a line,
or from `###` to the next appearance of `###`.
Comments are ignored by the compiler, though the compiler makes its best effort at reinserting your comments into the output JavaScript after compilation.


## Boolean

```coffeescript
# These are true
foo = true
foo = yes

# These are false
bar = false
bar = no
```

As in YAML, `on` and `yes` are the same as boolean `true`, while `off` and `no` are boolean `false`.

## Lists

```coffeescript
list_inline = [string, 1, 2]
list = [
  string
  1
  2
]

object_inline = {'foo': 'bar', 'apples': 'oranges'}
object = {
  'foo': 'bar'
  'apples': 'oranges'
}
```

The Storyscript literals for objects and arrays look very similar to Python. When each property is listed on its own line, the commas are optional.

## Conditions

```coffeescript
if foo = bar
    ...
else
    ...

if (foo > 0 or cat is not dog) or foobar like /regexp/
  ...
```

`if`/`else` statements can be written without the use of parentheses and curly brackets. As with functions and other block expressions, multi-line conditionals are delimited by indentation.


## Crontab and waits

```coffeescript
wait '5 minutes'
  ...

every 'thursday at 5pm'
  ...

crontab '0 5,17 * * *'
  # run twice a day
  ...

in '5 days'
  ...
```

Storyscript comes with built-in crontab and waits.

## Looping

```coffeescript
for child in siblings
  ...

foreach siblings as child
  ...

while foobar
  ...
```

In Storyscript, loops provide a way to iterate over data.

## Containers

```coffeescript
container cmd arg1 arg2 --foo bar
  --kwarg value

# Assign output to variable
output = container cmd foobar

# Streaming container
my-team/our-container my-command as data
  log data
```

In Storyscript, the syntax to run a container appears natural to that of shell/bash.
Keyword arguments may by indented in a new line.

## Async

> Example of an asynchronous loop

```coffeescript
found = 0
total = users count
# This will fork the Story by `N` users to complete the operations
async foreach users as user
    profile = fullcontact person --email user.email
    if profile
        found += 1

# Now return to asynchronous operations
log "Found {{found}} of {{total}} users."
# >>> Found 10 or 12 users.
```

As the name may suggest, asynchronous operations are trivial in Storyscript powered by Asyncy.
By adding `async` to any container or loop will make the operation asynchronous.

When `async` is applied to **loops** the Story will **wait** until all items are complete before continuing the Story.

> Example of an asynchronous container

```coffeescript
async some_long_operation arg1

data = async some_long_operation arg2
...         # stuff can happen while some_long_operation is running
log data    # wait for some_long_operation to complete before logging
```

When `async` is applied to **services** it will execute the service and continuing the Story without waiting for the result. However, when the assigned variable (e.g., `data` on the right) is needed the Story will pause until the operation is complete.
