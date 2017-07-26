# Triangle Devops meetup group lecture, 2017-07-26: Let's Learn Chatops!

# Generate a Hubot project

hubot setup guide: https://hubot.github.com/docs/

```
cd src/
npm init
npm install --save-dev yo generator-hubot
npx yo hubot
```

Hubot examples are in CoffeeScript, but we're not doing that

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

# Commands for Google Container Engine
- `gcloud config set project strong-phalanx-125218`
- `PROECT_ID=strong-phalanx-125218`
- `kubectl set image deployment/tridevops-demo tridevops-demo=gcr.io/${PROJECT_ID}/tridevops-demo:0.99.2`
- `kubectl get deployment/tridevops-demo -o=jsonpath='{$.spec.template.spec.containers[:1].image}'`
