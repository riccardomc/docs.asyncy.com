# Storyscript

Storyscript is a syntax-light high-level programming language that **orchestrates microservices**.
Application logic is expressive and transparent by requiring **named arguments** in all functions and microservices.
Built-in **service discovery** provides a powerful environment for finding services and autocomplete to assist with inputs and outputs.

> PLACEHOLDER
![alt text](https://d3vv6lp55qjaqc.cloudfront.net/items/05261A22002y0V0O0Z3I/IMG_BF788F07F5BB-1.jpeg?X-CloudApp-Visitor-Id=83fe0c93eb8bf3e54296d5fae9a976e4&v=3aea9602)
> PLACEHOLDER


Storyscript (or Stories for short) focuses on the **application logic** rather than all the *tape and glue* that bind applications together. The underlining services have a standard for **logs, metrics, fail-over, rate-limiting, tracebacks and scaling** which eliminates the need to write it within the application. This cultivates a development environment primed for rapid application development in a production-ready platform.

Let's build a quick application for example. Our goals are to upload, analyze, compress and archive a video. A non-trivial application but in a **couple lines of Storyscript** we made it.

```coffeescript
# Registers with Asyncy Server as an endpoint
http-endpoint method:'post' path:'/upload' as request, response
    # generate a unique id for this upload
    id = uuid uuid4

    video = request.files.myUploadedVideo

    # using https://machinebox.io find the video topics
    topics = machinebox/videobox content:video

    if 'nudity' in details
        response finish code:400 message:'Sorry, nudity found in image.'
    else
        response finish code:201 message:'Success! Will process and store asynchronously.'

    # save record in mongodb
    mongodb insert db:'uploads' data:{'id': id, 'topics': topics}

    # using https://github.com/xiph/daala let's compress it to h264
    video = xiph/daala video:video codex:'h264'

    # upload to AWS S3
    s3 put target:'/video/{{id}}.mp4' data:video
```

In comparison, the same application would likely take **hundreds of lines of code**, not to mention that each service above includes metrics, logging and scaling out-of-the-box.

> **Give it a spin!** Source code and demo here: https://github.com/asyncy/example-upload-video

Time to jump into syntax.

## Syntax Overview

```coffeescript
###
Welcome!
  This is a comment block
###

# Strings
myString = "Hello"
stringWithPlaceholders = "Say {{string}}!"
# >>> Say Hello!

# Numbers
one = 1
onethree = 1.3

# Boolean
foo = true
bar = false

# List
letters = ['a', 'b', 'c']
letters[0]
# >>> 1

# Object
fruit = {'apple': 'red', 'banana': 'yellow'}
fruit.apple
# >>> red

# Regexp
pattern = /^foobar$/

# files
path = `/folder/name.ext`

# Null
empty = null

# Conditions
if one > 1
    # then do this
else if one == 1
    # then do this
else
    # do this

# Loops
for child in siblings
    # ...

foreach siblings as child
    # ...

while foobar
    # ...

# Services
output = service cmd key:value

# Functions
function walk distance:number -> someOutput:sting
    # ...
    return "Ok, walked {{distance}}km!"

walk distance:10
# >>> Ok, walked 10km!
walk distance:6.1
# >>> Ok, walked 6.1km!

# Chaining calls
myService cmd foo:(myString split by:',')
              bar:(myObject find key:(myList random))
```


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

Like many traditional programming languages, Storyscript supports strings as delimited by the `"` or `'` characters.
Storyscript also supports string interpolation within "-quoted strings, using `{{ variable }}`.
Single-quoted strings are literal. You may even use interpolation in object keys.

Multiline strings are allowed in Storyscript.
Lines are joined by a single space unless they end with a backslash.
Indentation is ignored.

Block strings, delimited by `"""` or `'''`, can be used to hold formatted or indentation-sensitive text (or, if you just don’t feel like escaping quotes and apostrophes).
The indentation level that begins the block is maintained throughout, so you can keep it all aligned with the body of your code.

Double-quoted block strings, like other double-quoted strings, allow interpolation.

### Mutations

```shell
"abc" length
# >>> 3

"abc" replace before:'b' after:'Z'
# >>> aZc

"foo bar" capitalize
# >>> Foo Bar

"a,b,c" split by:','
# >>> ['a', 'b', 'c']

"abc" upper
# >>> ABC

"ABC" lower
# >>> abc
```

## Numbers

```coffeescript
int = 1
number = 1.2
```


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
foo = true
bar = no
```

## Lists

```coffeescript
list_inline = [string, 1, 2]
list_multiline = [
  string,
  1,
  2
]
```

### Mutations

```python
['a', 'b', 'c'] length
# >>> 3

['a', 'b', 'c'] join by:','
# >>> a,b,c

['a', 'b', 'c'] reverse
# >>> ['c', 'b', 'a']

['a', 'b', 'c'] shift from:'left'
# >>> a
# the list becomes ['b', 'c']

['a', 'b', 'c'] index of:'b'
# >>> 1

['1', '2', '3'] apply function:Int
# >>> [1, 2, 3]

['a', 'b', 'c'] random
# randomly choose >>> a
```

## Objects

```coffeescript
object_inline = {'foo': 'bar', 'apples': 'oranges'}
object_multiline = {
  'foo': 'bar',
  'apples': 'oranges'
}
```

### Mutations

```python
{'a': 1, 'b': 2} length
# >>> 2

{'a': 1, 'b': 2} keys
# >>> ['a', 'b']

{'a': 1, 'b': 2} values
# >>> [1, 2]

{'a': 1, 'b': 2} items
# >>> [['a', 1], ['b', 2]]

{'a': 1, 'b': 2} pop key:'a'
# >>> 1
# resulting object = {'b': 2}
```


## Conditions

```coffeescript
if foo = bar
  # ...
else if foo > bar
  # ...
else
  # ...

if (foo > 0 or cat is not dog) or foobar like /regexp/
  # ...
```

`if`/`else` statements can be written without the use of parentheses and curly brackets. As with functions and other block expressions, multi-line conditionals are delimited by indentation.

## Looping

```coffeescript
for child in siblings
  # ...

foreach siblings as child
  # ...

while foobar
  # ...
```

In Storyscript, loops provide a way to iterate over data.

## Services

```coffeescript
# Service with command and arguments
service cmd key:value anotherKey:value

# Service without command and assigned to variable
output = service key:value
                 anotherKey:value

# Streaming service
service dothis key:value as data
    # ...
```

In Storyscript, the syntax to run a service appears natural and arguments are named for transparency.
Arguments may by indented in a new line.

## More coming soon...

More exciting features are coming soon:

1. Built-in cron/waiting
2. Asynchronous primitives
