# Diagrams




[[toc]]

## How to read diagrams

The diagrams are to be read from top-down, following the arrows which represent data flow.

```
         +---------------+          +---------------+
         |               |          |               |
         |  Component A  |          |  Component B  |
         |               |          |               |
         +-------+-------+          +-------+-------+
Time  |          |                          |
      |          |          First           |
      |          | -----------------------> |
      |          |     Data from A to B     |
      |          |                          |
      |          |                          |
      |          |                          |
      |          |          Second          |
      |          | <----------------------- |
      |          |     Data from B to A     |
      |          |                          |
      |          |                          |
      V
    Future
```

> <small>Designs are created using [http://asciiflow.com](http://asciiflow.com)</small> :thumbsup:


## Asyncy Gateway

When an application is deployed every story is started.
If a story has one or more `http-endpoint` it will register with the Asyncy Gateway.
This is a **serverless event http handler** which executes the proceeding code for each http client connection.

```
                                                 +----------+        +-----------+
                                                 |          |        |           |
                                                 |  Engine  |        |  Gateway  |
                                                 |          |        |           |
                                                 +----+-----+        +-----+-----+
+------------------------------------+                |                    |
|                                    |                |                    |
| http-endpoint path:'/' as req, res | -------------> | -----------------> |
|     ...                            |                |                    |
|                                    |                |                    |
| log 'something'                    | -------------> |                    |
|                                    |                |                    |
+------------------------------------+                |                    |
```

Now the Story is listening to http traffic making requests to `yourdomain.com/`.
Client makes a request which executes the block under the `http-endpoint`.

```
         +----------+     +-----------+      +----------+
         |          |     |           |      |          |
         |  Client  |     |  Gateway  |      |  Engine  |
         |          |     |           |      |          |
         +----+-----+     +-----+-----+      +----+-----+
              |                 |                 |
              |                 |                 +-------------------------------------+
        GET / | --------------> |                 |                                     |
              |                 | --------------> |  http-endpoint path:'/' as req, res |
              |                 |                 +|     ...                            |
              |                 |                 ||                                    |
              |                 | <-------------- ||     res write data:'Hello world!'  |
 Hello world! | <-------------- |                 ||                                    |
              |                 | <-------------- ||     res finish                     |
          EOF | X-------------- |                 ||                                    |
              |                 |                 ||     ...                            |
              |                 |                 ||                                    |
              |                 |                 || log 'something'                    |
              |                 |                 ||                                    |
              |                 |                 +-------------------------------------+
              |                 |                 |
              |                 |                 |
```

The proceeding lines after `res finish` occurs asynchronously from the client perspective.
The `log` line is not executed because it's not indented under the `http-endpoint` block.
