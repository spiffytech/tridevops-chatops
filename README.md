# Triangle Devops meetup group lecture, 2017-07-26: Let's Learn Chatops!

# Requirements

Node.js version 8 with npm v5.2+.

Assumes an existing Google Container Engine application, and that the gcloud/kubectl command line tools are installed and authenticated.

# Generate a Hubot project

hubot setup guide: https://hubot.github.com/docs/

```
mkdir src && cd src/
npm init
npm install --save-dev yo generator-hubot
npx yo hubot
npm install --save child-process-promise
rm hubot-scripts.json
bin/hubot --alias '!'
```

Hubot examples are in CoffeeScript, but we're not doing that

# Hello, world!

https://github.com/hubotio/hubot/blob/master/docs/scripting.md

Create an echo command for Rick & Morty

# Commands for Google Container Engine
`kubectl` cheatsheet: https://kubernetes.io/docs/user-guide/kubectl-cheatsheet/

- `kubectl run tridevops-apps --image gcr.io/${PROJECT_ID}/tridevops-demo2:0.99.2 --port 8000`
- `kubectl expose deployment tridevops-apps --type=LoadBalancer --port 8000`
- `gcloud auth login`
- `gcloud config set compute/zone us-central1-a`
- `gcloud config set project strong-phalanx-125218`
- `PROECT_ID=strong-phalanx-125218`
- `kubectl set image deployment/tridevops-demo tridevops-demo=gcr.io/strong-phalanx-125218/tridevops-demo:0.99.2`
- `kubectl get deployment/tridevops-demo -o=jsonpath='{$.spec.template.spec.containers[:1].image}'`
- `kubectl get deployment tridevops-demo`

## Steps

- Install child-process-promise
- Create lib/k8s.js module
- Create `listServices` function, which returns objects for each service
    - Remove the header line from the CLI stdout
    - Break apart each line using `string.split()` with a regex
    - Filter out the Kubernetes service
- Test it using `if (require.main === module)` detection
- Create `getScale` function
    - Create function for splitting stdout lines
    - Create function for splitting row parts
    - Add error handling for unknown services
- Show `kubectl` option for fetching the image
    - `npm install --save node-fetch`
- Instead, show how to fetch the version via HTTP
- Show upgrading an app
    - Show doing it with hubot-conversation
        - Install hubot-conversation
        - https://www.npmjs.com/package/hubot-conversation
    - Gather: serviceName, container, image
- Show off webhook
    https://github.com/hubotio/hubot/blob/master/docs/scripting.md#http-listener
- Show non-triggered, hubot-initiated messages via `setInterval`

# Configuring your Slack bot

- Tap your name in Slack
- Tap "Apps & Integrations"
- Tap "Manage" in the top-right
- "Custom Integrations"
- "Bots"
- "Add Configuration"
- Fill in the fields
- Copy your bot token. This will identify your bot to Slack.

hubot-slack documentation: https://slackapi.github.io/hubot-slack/

# Persisting data with Redis Brain
