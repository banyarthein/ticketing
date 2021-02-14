# Setup nats project

Create the nats deployment on Kubernetes by creating nats-deployment.yaml file.

### Initialize the folder
```
npm init -y
```

### Run this command to install typescript and nats streaming
```
npm install node-nats-streaming ts-node-dev typescript @types/node
```

### Add this 2 scrips in package.json
    "publish": "ts-node-dev --notify false src/publisher.ts",
    "listen": "ts-node-dev --notify false src/listener.ts"

## Run this command to initialize the typescript and create tsconfig.json
