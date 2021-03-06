# Storyscript

Storyscript is a syntax-light high-level programming language that **orchestrates microservices**.
Application logic is expressive and transparent by requiring **named arguments** in all functions and microservices.
Built-in **service discovery** provides a powerful environment for finding services and autocomplete to assist with inputs and outputs.

# Table of Contents
[[toc]]

## About Storyscript

Storyscript (or Stories for short) focuses on the **application logic** rather than all the *tape and glue* that bind applications together. The underlining services have a standard for **logs, metrics, fail-over, rate-limiting, tracebacks and scaling** which eliminates the need to write it within the application. This cultivates a development environment primed for rapid application development in a production-ready platform.

Let's build a quick application for example. Our goals are to upload, analyse, compress and archive a video. A non-trivial application but in a **couple lines of Storyscript** we made it.

```coffeescript
# Registers with Asyncy Server as an endpoint
http-endpoint method:'post' path:'/upload' as request, response
    response write 'Success! Processing asynchronously.'
    response set_status 201
    response finish

    # At this we are running asynchronously

    # generate a unique id for this upload
    id = uuid uuid4

    video = request.files.myUploadedVideo

    # using https://machinebox.io find the video topics
    topics = machinebox/videobox content:video

    # save record in mongodb
    mongodb insert db:'uploads' data:{'id': id, 'topics': topics}

    # using https://github.com/xiph/daala let's compress it to h264
    video = xiph/daala video:video codex:'h264'

    # upload to AWS S3
    s3 put target:'/video/{{id}}.mp4' data:video
```

In comparison, the same application would likely take **hundreds of lines of code**, not to mention that each service above includes metrics, logging and scaling out-of-the-box.

<!-- > Blog: [Why Asyncy built a DSL called Storyscript](/) -->


## Syntax Overview

```coffeescript
###
Meet Storyscript
###

# Strings
myString = "Hello"
"Say {{string}}!"  # string formatting
# Say Hello!

# Numbers
one = 1
onethree = 1.3

# Boolean
foo = true
bar = false

# List
letters = ['a', 'b', 'c']
letters[0]
# 1

# Object
fruit = {'apple': 'red', 'banana': 'yellow'}
fruit.apple
# red
fruit['banana']
# yellow

# Regexp
pattern = /^foobar/
('foobar' like pattern)
# true

# Files (provided by the service File)
file write path:'/folder/hello.txt' content:'hello world'
file read path:'/folder/hello.txt'
# hello world

# Date
birthday = date year:2018 month:1 day:1
tomorrow = (date now) + (interval days:1)

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
foreach myList as item
    # more stuff here

while foobar
    # more stuff here

# Services
output = service cmd key:value

# Functions
function walk distance:number -> string
    # more stuff here
    return "Ok, walked {{distance}}km!"

walk distance:10
# Ok, walked 10km!

# Chaining calls
myService cmd foo:(myString split by:',')
              bar:(myObject find key:(myList random))

# import another story
import 'folder/file' as MyFunction
# Call a method in that story
res = MyFunction key:value

# try and catch
try
  # more stuff here
catch as error
  # more stuff here
  retry  # try the block again
  # -or-
  raise  # bubble it up
```

## Semantics

### Procedure

```coffeescript
output = doThird foo:(doSecond (doFirst ...)) bar:(doSecond ...)
```

Parentheses MUST be used to produce inline procedures. The innermost Parentheses will be executed first moving out to the outermost.

Same level parentheses MAY be called at the same time which done by parallel processing in new threads.

First set of parentheses when assigning variables is optional. E.g., `a = myList length` is the same as `a = (myList length)`.

### Mutations

```coffeescript
myList = []
myLlist append item:1  # mutates myList by appending the new item
(myList == [1])
# true

myString = 'abc'
myString adjust replace:'a' with:'Z'  # does not mutate the original string
# Zbc
myString
# abc
```

A variable MAY be mutated by it's type methods.

The comment, `Mutating Methods`, is added to examples below that identify methods as mutating the variable. This indicates a method that will mutate the variable and not requires reassignment.

### Variable Scope

Variables are not global.

```coffeescript
n = 1

every minutes:3
  n increment
  log n
```

```
+0  INFO 2
+3m INFO 3
+6m INFO 4
```

Functions do not have access to local variables. All variables must be provided as arguments.

```coffeescript
n = 1

function incr ->
  n increment
```

```
Syntax error. Variable "n" is not defined at line 4.
```

### Compiling

Storyscript is a dynamically compiled language. Type checking is performed at compile time, but not in a traditional way. From the perspective of the developer the following steps are performed during compile time.

Compile time consists of four primary processes:

1. **Linting** is performed to check syntax and grammar.
1. **Translation** is performed which translates the Storyscripts into event-logic tree.
1. **Dependancy** checks are performed to ensure command and arguments exists.
1. **Type-Checking** is performed on the Stories the ensure data integrity.

The type-checking includes the following checks:

1. Type mutation method exists.
2. Arguments are of the expected type.


### Execution Model

Storyscripts are executed by an interpretation engine (not compiled to C or Java).

#### Deployment

1. All dependancies are gathered and prepared for execution.
1. The Asyncy Engine is prepared with the Stories as first-class assets for swift execution.
1. Every Storyscript is executed allowing them to register with the gateway, cron, etc.

#### Execution

A story may [execute in many ways](/faq/#how-are-storyscripts-started).

1. The Engine received notice to start a Story with or without starting arguments.
1. The Story is executed in a single thread.
1. When a service is called the Engine will communicate with the service passing necessary data to and from the service back into the primary thread.
1. Asynchronous commands may generate new threads and execute in the same pattern above.

```coffeescript
foo = serviceA
parts = foo split ','
bar = serviceB name:parts[0]
```

The Story above is would perform the following operations:

1. Interface with `serviceA`.
1. Set `foo` to the results of `serviceA`.
1. Perform `split` on `foo`.
1. Set `parts` to the results of the mutation above.
1. Interface with `serviceB` providing the argument `name` equal to the first item in `parts`.
1. Set `bar` to the results of `serviceB`.


## Strings

```coffeescript
data = "foobar"

long_string = "Hi Friend,
This is a lo\
ng string."
# Hi Friend, This is a long string.

more_data = """
    The quick brown fox
    jumps over the lazy dog.
"""
# The quick brown fox\njumps over the lazy dog.

where = "Earth"
data_formatted = "Hello, {{where}}"
# Hello, Earth
```

::: v-pre
Like many traditional programming languages, Storyscript supports strings as delimited by the `"` or `'` characters.
Storyscript also supports string interpolation within "-quoted strings, using `{{ variable }}`.
Single-quoted strings are literal. You may even use interpolation in object keys.
:::

Multiline strings are allowed in Storyscript.
Lines are joined by a single space unless they end with a backslash.
Indentation is ignored.

Block strings, delimited by `"""` or `'''`, can be used to hold formatted or indentation-sensitive text (or, if you just don’t feel like escaping quotes and apostrophes).
The indentation level that begins the block is maintained throughout, so you can keep it all aligned with the body of your code.

Double-quoted block strings, like other double-quoted strings, allow interpolation.

### String Methods

```coffeescript
"abc" length
# 3

"abc" adjust replace:'b' with:'Z'
# aZc

"foo bar" capitalize
# Foo Bar

"foo bar" capitalize words:1
# Foo bar

"a,b,c" split by:','
# ['a', 'b', 'c']

"abc" uppercase
# ABC

"ABC" lowercase
# abc
```

## Numbers

```coffeescript
int = 1
number = 1.2
```

### Number Methods

```coffeescript
1 is_odd
# true

2 is_even
# true

-1 absolute
# 1

# Mutating Methods

n = 1
n decrement
# 0

n increment
# 1
```


## Comments

```coffeescript
###
Large
  Comment
Block
###

# Inline comment

foo = "bar"  # end of line comment
```

In Storyscript, comments are denoted by the `#` character to the end of a line,
or from `###` to the next appearance of `###`.
Comments are ignored by the compiler, though the compiler makes its best effort at reinserting your comments into the output JavaScript after compilation.


## Boolean

```coffeescript
happy = true
sad = false
```

## Lists

```coffeescript
list_inline = ["string", 1, 2]
list_multiline = [
  "string",
  1,
  2
]
```

### List Methods

```python
['a', 'b', 'c'] length
# 3

['a', 'b', 'c'] join by:':'
# a:b:c

['a', 'b', 'c'] index of:'b'
# 1

['a', 'b', 'c'] random
# c

# Mutating Methods

['a', 'b', 'c'] reverse
# ['c', 'b', 'a']

['a', 'b', 'c'] shift from:'left'
# a
# the list becomes ['b', 'c']

['1', '2', '3'] apply method:int
# [1, 2, 3]

['a', 'c', 'b'] sort dir:'asc'
# ['a', 'b', 'c']

myList = [1, 2, 3]
[(myList min), (myList max), (myList sum), (myList reduce)]
# [1, 3, 6, -4]
# also try: average, mean, mode
```

Join a couple method in one line. `((('123' split) apply int) sum) == 6`

## Date, Internals and Ranges

```coffeescript
birthday = date year:2018 month:1 day:2
tomorrow = (date now) + (interval days:1)

range = Range from:(date now) to:tomorrow
```

### Date Methods

```coffeescript
[bday year, bday month, bday day, bday hour, bday minute, bday second]
# [2018, 1, 2, 17, 32, 18]

bday format to:'YYYY-mm-dd'
# 2018-01-02
```

### Range Methods

```coffeescript
range days round:'down' # number of days within the range
# also try: year, months, days, hours, minutes, seconds
# round: down, nearest, up
```


## Objects

```coffeescript
object_inline = {'foo': 'bar', 'apples': 'oranges'}
object_multiline = {
  'foo': 'bar',
  'apples': 'oranges'
}
```

### Object Methods

```python
{'a': 1, 'b': 2} length
# 2

{'a': 1, 'b': 2} keys
# ['a', 'b']

{'a': 1, 'b': 2} values
# [1, 2]

{'a': 1, 'b': 2} items
# [['a', 1], ['b', 2]]

# Mutating Methods

obj = {'a': 1, 'b': 2}
obj pop key:'a'
# 1
obj
# {'b': 2}
```


## Conditions

```coffeescript
if foo == bar
  # more stuff here
else if foo > bar
  # more stuff here
else
  # more stuff here

if (foo > 0 or cat is not dog) or foobar like /regexp/
  # more stuff here
```

`if`/`else` statements can be written without the use of parentheses and curly brackets. As with functions and other block expressions, multi-line conditionals are delimited by indentation.

## Looping

```coffeescript
foreach myList as item
    # more stuff here

foreach myList as index, item
    # more stuff here

foreach myObject as key
    # more stuff here

foreach myObject as key, value
    # more stuff here

while (foobar is true)
    # more stuff here
```

Accessing list index or object keys is handled automatically.

```coffeescript
n = 5
res = while (n decrement) as i
  yield i
# res = [4, 3, 2, 1]
```

Data can be collected during loops and passed to an output list.

```coffeescript
foreach myList as item
    # more stuff here
    if do_end_loop
        end
    if do_skip_to_next_item
        continue
    # more stuff here
```

Loops have reserved keywords for ending and continuing loops.

## Functions

```coffeescript
function getUser id:int -> object
    someone = (sql query:'select * from users where id={{id}} limit 1;')[0]
    someone.contact = fullcontact person email:someone.email
    return someone

userA = getUser id:7
userB = getUser id:10
```

The example above is a function what queries the database and also downloads their FullContact profile.

Function must define their inputs and outputs which help with transparency, autocomplete and type checking during the Asyncy CI process.

Functions **MAY** declare one output and identify it's type. If an output type is used the function **MUST** use `return` and return that type.

```coffeescript
function add this:int that:int -> int
   return this + that
```

Functions that do not have an output may not use `return`. An error is thrown if a return is used.

```coffeescript
function doThis ->
    # ...

function doThat ->
    return 1
>>> ERROR: Function must set type of return or not return anything.
```


## Services

```coffeescript
# Service with command and arguments Service
service cmd key:value foo:bar

# Service without command
service key:value foo:bar

# Service output assigned to variable
foobar = service cmd key:value

# Arguments may by indented under the service
service cmd key:value
            foo:bar
```

In Storyscript, the syntax to run a service appears natural and arguments are named for transparency.

These services may be Docker containers that expose commands and define their interface. More details in [Services](/services/)

```coffeescript
tweet = "hello"
twitter tweet message:tweet
# would result in ```twitter tweet message:"hello"```
```

Containers, commands and argument names are **static grammar** and **interpreted literally**.

## Streaming Service

Services may stream data and the output is submitted back to Storyscript.

```coffeescript
service cmd key:value as data
    # iter service output
```

A good example of this is streaming Tweets by hashtag.

```coffeescript
twitter stream hashtag:'asyncy' as tweet
    res = machinebox/language data:tweet.message
    if res.tone == 'good'
        twitter retweet id:tweet.id
        twitter like id:tweet.id
```

Every new tweet will be passed into the block below in the variable `tweet`.
Then machine learning will determine if the tone of the tweet's message is good or bad. The streaming service will wait for new tweets until the story is ended.


## Importing

```coffeescript{1}
import 'utils/users' as Users
# Call the function "get" which is defined in the Storyscript
res = Users.get key:value
```

Import other Storyscripts by using the `import method from file` syntax.

The file path is **relative** to the Storyscript where the `import`. Use `/folder/...` for importing from the project root or `../folder` to import from the parent folder.

::: tip
The `.story` is optional. `/stories/users.story` is equivalent to `/stories/users`.
:::

```coffeescript
# foo.story
import 'bar' as Bar

# bar.story
import 'foo' as Foo
```

Stories MAY recursively import other stories, as seen above.


## Operations

```coffeescript{2}
if something_went_wrong
    end story
```

Use `end story` to stop the story and exit now.

```coffeescript{2}
if this_data == ''
    pause story
```

Pause the Story which will allow user-intervention to inspect and adjust accordingly.

::: warning
Pausing a Story will close any open thread (http connections, streaming services, etc.).
:::

## Exception Handling

```coffeescript
try
  # more stuff here
catch as error
  # more stuff here
finally
  # more stuff here
```

In Storyscript, the `try` expressions catch exceptions and pass the error to the `catch` block.

The `finally` block is **always** entered regardless of an exception being raised or not, use it for cleanup commands.

You may omit both the `catch` and `finally`.

```coffeescript
try
  # more stuff here
catch as error
  # more stuff here
  raise
```

Use the `raise` keyword to raise the exception, bubbling up to the next try block or stopping the story.


## Regular Expressions

```coffeescript
pattern = /^foo/
```

Regular expressions are supported without any special characters of escaping necessary.

### Regular Expressions Methods

```coffeescript
pattern = /(?P<key>\w):(?P<value>\w)/
myString = 'foo:bar'

pattern matches str:myString
# true

pattern find in:myString
# {"key": "foo", "value": "bar"}

/(\w+)/ find in:'foo bar' many:true
# ['foo', 'bar']

/(?P<name>\w+)/ find in:'foo bar' many:true
# [{'name': 'foo'}, {'name': 'bar'}]
```

## Wait and Cron

The [`wait`](https://hub.asyncy.com/service/wait), [`every`](https://hub.asyncy.com/service/every) and [`cron`](https://hub.asyncy.com/service/wait) are services in the Asyncy Hub.

```coffeescript
wait days:5 hours:2
    # do this in 5 days and 2 hours

wait date:((date now) + (interval day:1))
    # Hello, Tomorrow!

every hour:9
    # daily at 9am do this...

cron tab:'* * * * 9'
    # daily at 9am do this...
```

## Files

Asyncy provides access to a shared volume, unique to the Application. This volume should be treated as an ephemeral file storage, where contents are deleted at the end of the Story.

[`file`](https://hub.asyncy.com/service/file) is a service in the Asyncy Hub.

```coffeescript
file write path:'/folder/hello.txt' content:'hello world'
file read path:'/folder/hello.txt'
# hello world
```

## Types

```coffeescript
1 type
# int

true type
# bool

"" type
# string

[] type
# list

{} type
# object

null type
# null

(date now) type
# date

(interval days:1) type
# interval

(range from:foo to:bar) type
# range

/^foobar/ type
# regexp

function foobar -> int
    return 1

function foobar ->
    # ... no return allowed

foobar type
# function
```

Use the method `type` to get the type of a variable as a string.

```coffeescript
(1 is int) and (true is bool) and ("" is string)
# true

([] is list) and ({} is object)
# true

(1 is number) and (1.2 is number)
# true

{} is string
# false
```

Type checking can be applied to any type.

## Async
::: warning Coming Soon!
This behavior is not yet developed. Feedback welcome!
:::

Asynchronous commands provide a way to scale out processes and apply multithreading to data flow.

```coffeescript
res = async some_long_process cmd
# more stuff here
log data:res.data  # will wait until res is complete until data is resolved

# run through all users at the same time, spawning users(N) processes
async foreach users as user
  user.profile = fullcontact person email:user.email
```
