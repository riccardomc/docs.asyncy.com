# FAQ

[[toc]]

## General

### What are microservices?

Microservices are service-oriented self-contained applications that are highly specialized and reusable services.
These services can be algorithms, APIs or specialized functions. In Asyncy world, it's anything you can wrap in a Docker container. Services are independently deployable, scalable and manage their own metrics, logs and other operations.

> <small>Next: [Microservice.guide](http://microservice.guide/) &mdash; the open standard for designing microservices.</small>

### Who maintains the microservices?

The project contributors maintain the service. This may be open-source projects, vendor built projects, or private projects.

For example, a Twitter library written in Python can be built in a Docker container and deployed on Asyncy in minutes. The Twitter library is already maintained by the contributors, there is very little extra work to make the service compatible in Asyncy.

### How difficult is it to build my own microservices?

Use any programming language necessary to build your service just like you would a library, package, or application. Learn more about [Building Services](/services/#containers-via-docker).

## Storyscript

### Why use a DSL (domain-specific language)?

The top reasons are identity, knowledge, control, and data flow design.
For a full description, continue to our blog post below.

> <small>Next: [Meet Storyscript &rarr;](https://medium.com/asyncy)</small>

### What is Storyscript used for?

Storyscript has many use cases. Below are a couple high-level topics.

1. Application Backend (not frontend i.e, replacing HTML, CSS and JavaScript)
1. BPM (Business Process Management)
1. Workflows
1. Automation (event reactions, monitoring, alerting, etc.)

### How are Storyscripts started?

Storyscripts can start in many ways, here are just a couple examples:

1. HTTP request
1. Cron
1. Frontend user click button
1. API request
1. Webhook
1. IOT devices
1. Stream (event from logs, metrics)
1. Pub/sub
1. Smart Button or Alexa command
1. Text message or phone call
1. Another 3rd party application


### How are short container names (aka aliases) handled?

Services must be registered with the Asyncy Hub to operate on Asyncy. A service may specify aliases which are short title of the service (`twitter/asyncy-twitter-service` can choose `twitter` as an alias). Aliases are **not unique** to a service.

During the service discovery phase developers will select certain services which end up getting tracked in the `asyncy.yml` file.

```yaml{3,4}
# asyncy.yml
services:
  twitter:
    image: twitter/asyncy-twitter-service:v1.123
```

### Can Storyscript run asynchronously?

**Yes**. For example, during an HTTP request once the response if finished the remaining script is inherently asynchronous. When a Storyscript runs it is asynchronous from another Storyscript execution. Specific line(s) in the Storyscript may be executed asynchronously.

### What happens with a Storyscript crashes?

Things don't always go according to plan. When a Storyscript exits because of an error it's captured, detailed and recorded in the [Asyncy App](https://app.asyncy.com). The Storyscript data can be altered and the Storyscript restarted from any line the user desires to complete the process.

### Are Storyscripts stateless or stateful?

Storyscripts are stateless. An application may use stateful services but the Storyscript itself, by design, is stateless.

### Is Storyscript compiled or interpreted?

Storyscript is compiled to an logic-tree which is stored in the deployment slug and help in memory in the Asyncy Engine unique to the applications deployment.

This is the current strategy through Beta and may change.

## Asyncy

Questions pertaining to the Asyncy Platform.

### Is Asyncy a serverless environment?

**Yes**, Asyncy is a serverless execution environment. The Asyncy Platform provides an HTTP gateway which executes Storyscript in a serverless fashion. Storyscripts register with the gateway, therefore do not have an active http server.

### Is Asyncy a Paas, Baas, or Faas?

Asyncy is a **Platform as a Service** (aka PaaS) which has some functionality of Backend as a Service (BaaS) and Functions as a Service (Faas). Asyncy's Engine is our BaaS and custom code can as in a FaaS.

### Does Asyncy use Kubernetes under-the-hood?

**Yes**, Kubernetes is used to orchestrate containers. See the full [Asyncy Stack](https://asyncy.com/platform#stack).

### How much Kubernetes or devops experience is required?

Little to none. Asyncy interacts with Kubernetes so you don't need to. It manages scaling, security, routing, networks and much more.

### Where are Storyscript's and other code stored?

Deployments to Asyncy **must** be git-backed. When deploying source code to Asyncy it will clone the repository and generate a release slug which is used in the platform for deployments.

### How are services managed?

When the Application is deployed all containers are pulled, started and scaled intelligently. Asyncy monitors service metrics, scales dynamically and load-balances between nodes automatically.

### Is Asyncy used for prototypes only?

**No**, the Asyncy Platform is a dynamically-scalable, robust, production-grade platform. It can also be used for on-premise deployments.


### Does Asyncy provide file storage?

**Yes**. Applications have a temporary volume that contains the applications repository source code and can be a temporary file storage. Applications may optionally have persistent storage which is flexible based on the application or service needs.

### Does the Asyncy Platform come with a persistent database?

**No**, databases are unfortunately not on-size-fits-all. Yet, it's quite simple to create persistent database or user a database backed by the cloud provider.


### Can I bring my own database?

**Yes***. We recommend using the cloud providers database, such as Google Cloud SQL or AWS RDS. But you can run and managing your own database on the Asyncy Platform.

### Can I run Asyncy on my own cloud?

**Yes**. Details coming soon.

### Is Asyncy open source?

*Every bit and byte*. The entire Asyncy Platform is open source on [GitHub](https://github.com/asyncy).

### Is there a managed Asyncy?

**Yes**, we call this the **Asyncy Cloud**. Sign-up at [https://app.asyncy.com](https://app.asyncy.com)

### What is the pricing for Asyncy Cloud?

We plan to offer **highly transparent** pricing for our Asyncy Cloud offering. Details coming soon.

### Does Asyncy offer training?

**Yes**. Details coming soon.

### Does Asyncy offer support?

> During Beta we offer [support](/support/) for **free**. :heart:

Asyncy offers a variety of support options ranging from community support to premium support. More details will arrive after Beta.

### Does Asyncy have a Service Level Agreement (SLA)?

We offer SLA contracts with our premium support license. More details will arrive after Beta.
