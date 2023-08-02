---
id: pricing
title: What is the pricing for Temporal Cloud?
sidebar_label: Pricing
sidebar_position: 1
description: Temporal Cloud pricing information
toc_max_heading_level: 4
keywords:
- temporal cloud
- pricing
- introduction
- term
- explanation
- storage
- support
- security
- faq
tags:
- temporal-cloud
- pricing
- introduction
- term
- explanation
- storage
- support
- security
- faq
---

<!-- THIS FILE IS GENERATED. DO NOT EDIT THIS FILE DIRECTLY -->

Temporal Cloud is a consumption-based service; you pay only for what you need when you need it. Pricing is flexible, transparent, and predictable, so you know your costs and never pay for unused capacity.

This page introduces the elements of Temporal Cloud pricing so that you can estimate costs for your implementation. To gain a reliable estimate, [contact our team](https://pages.temporal.io/contact-us).

## What is an Action? {#action}

Actions are the fundamental consumption pricing unit in Temporal Cloud.
An Action in Temporal occurs as part of an execution of your Workflow.
Each time you execute a Temporal Workflow (a Workflow Execution), the associated Actions are collected and ultimately represent the state and progress of your Temporal Application.

Actions are collected and billed monthly for each Namespace. The base rate is $25 per one million Actions, and you are billed only for the prorated amount of Actions you use. If you use fewer than one million Actions per month, your bill for Actions will be less than $25 for that month.

| **Actions per month** | **Cost per 1M (USD)** |
| --------------------- | --------------------- |
| Any number            | $25.00 (prorated)     |

Alternatively, Temporal also offers a credit system. Credits provide an additional discount schedule for both billable Actions and storage. Credits do not expire. The following table outlines cost estimates and discount bands for the credits system. Please reach out to the team if you are interested in this option.

| **Actions per month (millions)** | **Cost per 1M (USD)** | **Cost band**       | **Actions per second** |
| -------------------------------- | --------------------- | ------------------- | ---------------------- |
| 0 to 299                         | $23.25                | $0–$7,500           | ~115                   |
| 300 to 1,499                     | $18.80                | $5,640–$28,200      | ~570                   |
| 1,500 to 7,499                   | $14.10                | $21,150–$105,750    | ~2,860                 |
| 7,500 to 29,999                  | $10.50                | $78,750–$315,000    | ~11,400                |
| 30,000 to 149,999                | $7.90                 | $237,000–$1,185,000 | ~57,000                |
| 150,000 or more                  | $5.90                 | Begins at $885,000  | n/a                    |

The following operations result in Actions.

**Workflows**

- **Workflow started.**
  Occurs via client start, client Signal-With-Start, <a class="tdlp" href="/workflows#continue-as-new">Continue-As-New<span class="tdlpiw"><img src="/img/link-preview-icon.svg" alt="Link preview icon" /></span><span class="tdlpc"><span class="tdlppt">What is Continue-As-New?</span><br /><br /><span class="tdlppd">Continue-As-New is the mechanism by which all relevant state is passed to a new Workflow Execution with a fresh Event History.</span><span class="tdlplm"><br /><br /><a class="tdlplma" href="/workflows#continue-as-new">Learn more</a></span></span></a>, or <a class="tdlp" href="/workflows#child-workflow">Child Workflow<span class="tdlpiw"><img src="/img/link-preview-icon.svg" alt="Link preview icon" /></span><span class="tdlpc"><span class="tdlppt">What is a Child Workflow Execution?</span><br /><br /><span class="tdlppd">A Child Workflow Execution is a Workflow Execution that is spawned from within another Workflow.</span><span class="tdlplm"><br /><br /><a class="tdlplma" href="/workflows#child-workflow">Learn more</a></span></span></a> start.
  If a Workflow start fails, an Action is not recorded.
- **Workflow reset.**
  Occurs when a <a class="tdlp" href="/workflows#">Workflow<span class="tdlpiw"><img src="/img/link-preview-icon.svg" alt="Link preview icon" /></span><span class="tdlpc"><span class="tdlppt">What is a Workflow?</span><br /><br /><span class="tdlppd">In day-to-day conversations, the term "Workflow" frequently denotes either a Workflow Type, a Workflow Definition, or a Workflow Execution.</span><span class="tdlplm"><br /><br /><a class="tdlplma" href="/workflows#">Learn more</a></span></span></a> is reset.
  (Actions that occur before a <a class="tdlp" href="/workflows#reset">Reset<span class="tdlpiw"><img src="/img/link-preview-icon.svg" alt="Link preview icon" /></span><span class="tdlpc"><span class="tdlppt">What is a Reset?</span><br /><br /><span class="tdlppd">A Reset terminates a Workflow Execution, removes the progress in the Event History up to the reset point, and then creates a new Workflow Execution with the same Workflow Type and Id to continue.</span><span class="tdlplm"><br /><br /><a class="tdlplma" href="/workflows#reset">Learn more</a></span></span></a> are counted even if they are no longer visible in <a class="tdlp" href="/workflows#event-history">Event History<span class="tdlpiw"><img src="/img/link-preview-icon.svg" alt="Link preview icon" /></span><span class="tdlpc"><span class="tdlppt">What is an Event History?</span><br /><br /><span class="tdlppd">An append-only log of Events that represents the full state a Workflow Execution.</span><span class="tdlplm"><br /><br /><a class="tdlplma" href="/workflows#event-history">Learn more</a></span></span></a>.)
- **Timer started.**
  Includes implicit Timers that are started by a Temporal SDK when timeouts are set, such as `AwaitWithTimeout` in Go or `condition` in TypeScript.
- **Search Attribute upsert requested.**
  Occurs after a Workflow starts and invokes `UpsertSearchAttributes`.
- **Signal sent.**
  Includes sending a <a class="tdlp" href="/workflows#signal">Signal<span class="tdlpiw"><img src="/img/link-preview-icon.svg" alt="Link preview icon" /></span><span class="tdlpc"><span class="tdlppt">What is a Signal?</span><br /><br /><span class="tdlppd">A Signal is an asynchronous request to a Workflow Execution.</span><span class="tdlplm"><br /><br /><a class="tdlplma" href="/workflows#signal">Learn more</a></span></span></a> from a client or from within a Workflow to another Workflow.
- **Query received.** <a class="tdlp" href="/workflows#query">Queries<span class="tdlpiw"><img src="/img/link-preview-icon.svg" alt="Link preview icon" /></span><span class="tdlpc"><span class="tdlppt">What is a Query?</span><br /><br /><span class="tdlppd">A Query is a synchronous operation that is used to report the state of a Workflow Execution.</span><span class="tdlplm"><br /><br /><a class="tdlplma" href="/workflows#query">Learn more</a></span></span></a> aren't recorded in Event History.
  An operation such as viewing the stack trace in the Temporal Cloud UI results in a Query.
- **Version marker recorded.**
  Occurs when a Workflow calls `get-version` or `patch`.
- **Side Effect recorded.**
  For a mutable <a class="tdlp" href="/workflows#side-effect">Side Effect<span class="tdlpiw"><img src="/img/link-preview-icon.svg" alt="Link preview icon" /></span><span class="tdlpc"><span class="tdlppt">What is a Side Effect?</span><br /><br /><span class="tdlppd">A Side Effect is a way to execute a short, non-deterministic code snippet, such as generating a UUID, that executes the provided function once and records its result into the Workflow Execution Event History.</span><span class="tdlplm"><br /><br /><a class="tdlplma" href="/workflows#side-effect">Learn more</a></span></span></a>, an Action occurs only when the value changes.
  (Be aware that some SDKs don't support Side Effects.)

**Activities**

- **Activity started or retried.**
  Occurs each time an Activity is started or retried.
- **Local Activity started.**
  Occurs each time a <a class="tdlp" href="/activities#local-activity">Local Activity<span class="tdlpiw"><img src="/img/link-preview-icon.svg" alt="Link preview icon" /></span><span class="tdlpc"><span class="tdlppt">What is a Local Activity?</span><br /><br /><span class="tdlppd">A Local Activity is an Activity Execution that executes in the same process as the Workflow Execution that spawns it.</span><span class="tdlplm"><br /><br /><a class="tdlplma" href="/activities#local-activity">Learn more</a></span></span></a> is started.
- **Activity Heartbeat recorded.**
  A Heartbeat call from Activity code counts as an Action only if it reaches the <a class="tdlp" href="/clusters#temporal-server">Temporal Server<span class="tdlpiw"><img src="/img/link-preview-icon.svg" alt="Link preview icon" /></span><span class="tdlpc"><span class="tdlppt">What is the Temporal Server?</span><br /><br /><span class="tdlppd">The Temporal Server is a grouping of four horizontally scalable services.</span><span class="tdlplm"><br /><br /><a class="tdlplma" href="/clusters#temporal-server">Learn more</a></span></span></a>.
  Temporal SDKs throttle <a class="tdlp" href="/activities#activity-heartbeat">Activity Heartbeats<span class="tdlpiw"><img src="/img/link-preview-icon.svg" alt="Link preview icon" /></span><span class="tdlpc"><span class="tdlppt">What is an Activity Heartbeat?</span><br /><br /><span class="tdlppd">An Activity Heartbeat is a ping from the Worker that is executing the Activity to the Temporal Cluster. Each ping informs the Temporal Cluster that the Activity Execution is making progress and the Worker has not crashed.</span><span class="tdlplm"><br /><br /><a class="tdlplma" href="/activities#activity-heartbeat">Learn more</a></span></span></a>.
  The default throttle is 80% of the <a class="tdlp" href="/activities#heartbeat-timeout">Heartbeat Timeout<span class="tdlpiw"><img src="/img/link-preview-icon.svg" alt="Link preview icon" /></span><span class="tdlpc"><span class="tdlppt">What is a Heartbeat Timeout?</span><br /><br /><span class="tdlppd">A Heartbeat Timeout is the maximum time between Activity Heartbeats.</span><span class="tdlplm"><br /><br /><a class="tdlplma" href="/activities#heartbeat-timeout">Learn more</a></span></span></a>.
  Heartbeats don't apply to Local Activities.

[Reach out to our team](https://pages.temporal.io/contact-us) to get more information or to help size your number of Actions.

## What are the Temporal Cloud storage prices? {#storage}

An execution of a particular Workflow could exist for a few seconds, a day, month, or even forever. Temporal collects the Event History during this time and dispatches work when necessary. In this context, a Workflow Execution has only two states, open (active) or closed.

Storage costs are measured in gigabyte-hours (GBh) and include charges for active Workflows, "running" storage, and the long-term, "retained" storage of Event Histories of closed Workflows. These are measured per Namespace.

Running storage is a measure of the amount of storage used to store active Workflows. When the execution of a Workflow ends, Temporal Cloud stores Event History for a defined Retention Period, for historical use. This is retained storage. Typical uses include compliance, debugging, workload refresh, and business analytics. Both kinds of storage have fixed costs.

| **Storage** | **Cost per GBh** |
| ----------- | ---------------- |
| Retained    | $0.00042         |
| Running     | $0.042           |

If you purchase Temporal Cloud credits (as outlined earlier), running storage costs are tiered and measured in gigabyte-hours.

| **Running storage** | **Cost per GBh** |
| ------------------- | ---------------- |
| Less than 10        | $0.042           |
| 10 to 39            | $0.031           |
| 40 to 119           | $0.023           |
| 120 to 499          | $0.018           |
| 500 to 1999         | $0.013           |
| 2000 or more        | $0.010           |

## What kind of support do I get with Temporal Cloud? {#support}

With a subscription to Temporal Cloud, you also gain access to our support organization of developer success engineers and solution architects. Our experts assist with a range of work streams from Workflow design reviews to setting up observability to break/fix support with an agreed-upon set of SLAs.

The Temporal Developer Success team brings a deep knowledge of how Temporal works and how you can optimize your deployment. This team is comprised of engineers who know Temporal inside and out, and continue to contribute to its development.

They also investigate your Workflows to optimize their environments and possibly reduce costs associated with Actions and storage. They ensure your instance is performance tuned and help with other ongoing maintenance, like upgrades of the Temporal software and maintenance of the platform.

If an issue occurs, the team provides support through our <a class="tdlp" href="/cloud/introduction/support#support-ticket">support portal<span class="tdlpiw"><img src="/img/link-preview-icon.svg" alt="Link preview icon" /></span><span class="tdlpc"><span class="tdlppt">How to create a ticket for Temporal Support</span><br /><br /><span class="tdlppd">To request assistance from Temporal Support, create a ticket in Zendesk.</span><span class="tdlplm"><br /><br /><a class="tdlplma" href="/cloud/introduction/support#support-ticket">Learn more</a></span></span></a>, [community forum](https://community.temporal.io/), and (with Premium support) a dedicated Slack channel. Temporal offers two levels of support defined by their availability and SLAs.

|                     | **Basic**                                                                                   | **Premium**                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Response times      | P0: 1 business hour<br/>P1: 4 business hours<br/>P2: 1 business day<br/>P3: 2 business days | P0: 30 minutes<br/>P1: 1 business hour<br/>P2: 4 business hours<br/>P3: 1 business day |
| Pricing (per month) | Greater of $200 or 10% monthly usage                                                        | Greater of $2,000 or 10% monthly activity                                              |

Business hours for Temporal Support are 0500–1700 Monday–Friday (Pacific Time).
For P0 issues, coverage is 24×7.

## What is the price for SSO and SAML? {#sso-and-saml}

We offer single sign-on (SSO) integration using SAML at a monthly fixed fee based on the number of users registered in Temporal Cloud:

| **Users** | **Cost per month** |
| --------- | ------------------ |
| 0 to 25   | $200               |
| 26 to 50  | $300               |
| 51+       | $500               |

## How to estimate costs {#pricing-estimates}

Temporal Cloud employs a consumption-based pricing model that's based on storage and execution, factors that vary from one Workflow to the next. You can estimate the cost of a specific Workflow by running it at a low volume and then using its storage and compute measurements to project your production-scale cost. Our team is happy to [help you estimate the cost](https://pages.temporal.io/contact-us) for your specific workloads.

## Pricing FAQ {#pricing-faq}

**What’s the minimum cost to run Temporal Cloud?**

The Temporal Cloud service is consumption based. You pay only for what you need with no minimum. Basic support has a minimum monthly fee of $200 per month.

**How do I pay for Temporal Cloud?**

Temporal sends a monthly bill based on your consumption. You can pay this bill with a credit card, ACH, wire transfer, or Temporal Credits.

**Can I purchase Temporal Cloud through my Amazon, Azure, or Google Cloud Platform marketplace?**

You can purchase Temporal Cloud credits in the AWS Marketplace. Please contact our team at sales@temporal.io to learn more about our private offer on the AWS Marketplace.