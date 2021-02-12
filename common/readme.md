# Package Name

changed the name to @vmticketing/common

# init git

- add gitignor file

```
git init
git add .
git commit -m "initial commit"
```

## Login nmp first

```
npm login
```

## Publish to npm as public

```
npm publish --access public
```

# Convert Typescript to Javascript

- First install typeScript

```
tsc --init
npm install typescript del-cli --save-dev
```

## Enable typescript config

- go to tsconfig.json
- uncomment

```
"declaration": true
```

- out directory path under build

```
"outDir": "./build"
```

- after that build the project

```
npm run build
```

## Change to script to build and clean

- go to package.json

```
  "scripts": {
    "clean": "del-cli ./build/*",
    "build": "npm run clean && tsc"
  },
```

## Change following setting in package.json

```
  "main": "./build/index.js",
  "types": "./build/index.d.ts",
  "files": [
    "./build/**/*"
  ],
```

# Bump Version

```
npm version patch
```

# Short Command to bump and publish

- go to package.json script section

```
"pub": "git add . && git commit -m \"Bump Version\" && npm version patch && npm run build && npm publish"
```
