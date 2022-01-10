---
id: chatbot-tutorial
title: Choose Your Own Adventure Bot Tutorial
sidebar_label: Chatbot Tutorial
description: In this tutorial, we'll integrate all the knowledge gained from Core and Production APIs in an end-to-end, complete demo application.
---

## 25 minute Demo Walkthrough

import { ResponsivePlayer } from '../../src/components'

<ResponsivePlayer url='https://www.youtube.com/watch?v=hGIhc6m2keQ' />

<a href="https://youtube.com/watch?v=hGIhc6m2keQ&amp;t=0s" dir="auto">00:00</a>
<span> Project Intro and Demo</span><br />
<a href="https://youtube.com/watch?v=hGIhc6m2keQ&amp;t=210s" dir="auto">03:30</a>
<span> Temporal Worker - Activity Dependency Injection</span><br />
<a href="https://youtube.com/watch?v=hGIhc6m2keQ&amp;t=420s" dir="auto">07:00</a>
<span> Temporal Sinks for Logging</span><br />
<a href="https://youtube.com/watch?v=hGIhc6m2keQ&amp;t=480s" dir="auto">08:00</a>
<span> Temporal Client</span><br />
<a href="https://youtube.com/watch?v=hGIhc6m2keQ&amp;t=650s" dir="auto">10:50</a>
<span> RunGame Workflow and Game Logic</span><br />
<a href="https://youtube.com/watch?v=hGIhc6m2keQ&amp;t=825s" dir="auto">13:45</a>
<span> Async Race Design Pattern: Timers vs Humans</span><br />
<a href="https://youtube.com/watch?v=hGIhc6m2keQ&amp;t=900s" dir="auto">15:00</a>
<span> Design Pattern: Polling</span><br />
<a href="https://youtube.com/watch?v=hGIhc6m2keQ&amp;t=1085s" dir="auto">18:05</a>
<span> Signals</span><br />
<a href="https://youtube.com/watch?v=hGIhc6m2keQ&amp;t=1200s" dir="auto">20:00</a>
<span> HTTP Server for Signal</span><br />
<a href="https://youtube.com/watch?v=hGIhc6m2keQ&amp;t=1380s" dir="auto">23:00</a>
<span> ContinueAsNew</span><br />

## Source and Setup Instructions

View Source on GitHub: https://github.com/JoshuaKGoldberg/temporal-adventure-bot

## Architecture

This project is based off the default [Hello World project](https://docs.temporal.io/docs/typescript/hello-world/) that is scaffolded out when you run `npx @temporalio/create@latest`.

### Overview

#### Worker

The Temporal worker is set up in `src/worker.ts`.
It uses two common Temporal patterns:

- **Dependency Injection**: using the integration object created by `createIntegration` to provide APIs for the social platform being targeted (`Discord` or `Slack`) (see [Platforms](#platforms))
- **Logging Sinks**: providing a `logger.sink` method for the workflows to log out to `console.log`

#### Workflows

The client in `src/client.ts` will ask Temporal to run two different workflows:

1. **`instructions`**: Posts instructions to the social platform and pins the message
2. **`runGame`**: Continuously runs the game state until the game is finished

##### `runGame`

Each iteration of the game (so, daily), `runGame` goes through these steps:

1. If the entry has no options, the game is over
2. Post the current entry as a poll
3. Check and remind people to vote once a day until either...
   - ...a choice is made by consensus
   - ...an admin forces a choice
4. If the choice was forced by an admin, mention that
5. Continue with that chosen next step in the game

#### Platforms

The `platformFactory` function used in both workers and workflows reads from `process.env` to return the `createIntegration` and `createServer` methods for the social platform being targeted.

##### Integrations

`createIntegration`: creates the client API used to send messages to the social platform.
For example, the Slack integration uses the [Slack Bolt SDK](https://slack.dev/bolt-js).

#### Servers

`createServer` creates the (generally Express) server that runs locally and receives webhook events from the social platform.
Both the Discord and Slack servers use Ngrok to expose a local port on the public web, so that a `/force` command configured on the platform sends a message, it can signal to the workflow.