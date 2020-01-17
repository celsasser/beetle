# Beetle

## Overview
### What is Beetle?

* It is a configurable proxy server.
* It is a configurable stub server.
* It is a plain old configurable server.
* It is written in typescript.
* Lastly, it's not what your mother said last night.

### What do you mean by configurable?

One is able to describe an API in JSON. See our [sample stub](res/configurations/setup-test-mock.json) and our paired [sample responder](res/configurations/setup-test-responder.json) configurations that we use as a quick start example below.  The key points to take note of are:

1. The server itself is described. It's essentials are the `protocol` and `port`.
2. `stubs` are defined. Fundamentally these are just routes. They are described as paths with associated actions. The `path` may be described with the same rules as routes in [express](https://expressjs.com/en/guide/routing.html) are described. An action may be `log`, `respond` and `forward`. One or more action may exist. The rules for which action acts as the responder is determined by precendent [rules](https://github.com/celsasser/beetle/blob/master/src/controller/action.ts#L85).

### Why Beetle

This was made with a particular problem in mind and that is gaining control over an integration point where you either don't have control or you don't have the integration point.  Our goal is to:

* be able to test expectations
* be able to respond with HTTP response codes and test our response handling logic.

Or, you may be Trinity and are planning on hacking into the IRS database. You want to be able to debug and test against a non-IRS API so that you don't land in jail before you launch your attack. So stub it. Otherwise you will never be able to wear latex and look cool in a bar and meet the One.

## Quick Start

I think it's going to be best illustrated by an example.  So let's jump in. We have built an example into repo.  We have created an imaginary stub for a very minimal pet inventory system.  Because _Beetle_ is a server and because it is able to be configured to respond we are able to describe both the _mock server_ and the _forward/responder server_ using _Beetle_.  So put your pants on and in a terminal:

```
cd <target-parent-directory>
git clone https://github.com/celsasser/beetle
cd beetle
```

We are using NodeJS [10.16.3](https://github.com/celsasser/beetle/blob/master/.nvmrc).  If you are using `nvm` the great and you know what to do.  If not then make sure you have NodeJS `10.16.3` or greater installed.

```
npm install
npm run build
```

If all went well then you are ready to startup the _mock server_ and the _forward/responder server_.  We have setup convenience scripts in package.json:

You have the choice of running the following in the foreground in which case you will want to use separate terminal shells or in the backround by appending `&` to each command.

```
npm run sample:mock:start
npm run sample:responder:start
```

You now have a _mock server_ running on port `8000`.
And you have a _responder server_ running on port `9000`.

### What now?

I have setup a few http requests for testing via [Postman](https://www.getpostman.com/). If you don't it installed then pull it down and install it. Now we want to import the following API: [res/configurations/postman_collection.json](res/configurations/postman_collection.json).

You are all set. Start issuing requests against your _mock server_.  We have configured logging into the responder so that you may see the flow of the request and response.  All but one of the routes are configured to return success status codes. `shelter delete` is configured to respond with a failure status.

## What next

I need to do a more thorough job of describing and documenting _Beetle_. But hopefully for now this is enough to get you started and give you a good idea for what _Beetle_ is capable of and how it may be used.
