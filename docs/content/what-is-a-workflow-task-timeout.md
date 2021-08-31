---
id: what-is-a-workflow-task-timeout
title: What is a Workflow Task Timeout?
description: A Workflow Task Timeout is the maximum amount of time that the Temporal Server will wait for a Worker to start processing a Workflow Task after the Task has been pulled from the Task Queue.
tags:
  - explanation
---

A Workflow Task Timeout is the maximum amount of time that the Temporal Server will wait for a Worker to start processing a [Workflow Task](#workflow-task) after the Task has been pulled from the Task Queue.

**The default value is 10 seconds.**
This timeout is primarily available to recognize whether a Worker has gone down so that the Workflow Execution can be recovered on a different Worker.
The main reason for increasing the default value would be to accommodate a Workflow Execution that has a very long Workflow Execution History that could take longer than 10 seconds for the Worker to load.

<!-- TODO
<RelatedReadList
readlist={[
["How to set a Workflow Task Timeout in Go", "#", "developer guide"],
]}
/> -->