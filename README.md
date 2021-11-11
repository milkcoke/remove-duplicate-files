# Remove Duplicate Files

## Introduction
Remove duplicate files by inputting directory path

## Requirements

![node-current](https://img.shields.io/node/v/npm?label=node&logo=node.js&logoColor=%23339933&style=for-the-badge) \
![npm](https://img.shields.io/badge/-NPM?logo=npm&label=npm&style=for-the-badge&color=%23CB3837) ![yarn](https://img.shields.io/badge/-yarn?label=yarn&logo=yarn&style=for-the-badge&color=%232C8EBB) \
![Typescript](https://img.shields.io/npm/v/typescript?label=Typescript&logo=typescript&style=for-the-badge)

## Quick Start
#### (1) Transpile .ts to .js
```bash
# you can also run `yarn run build`
$ npm run build
$ cd dist
```
#### (2) Copy the path of directory where duplicate files exist
#### (3) Execute command below
```bash
$ node main.js [your-directory-path]
```

## Quick Test
```bash
$ npm run build
$ cd dist
# There exists 4 duplicates file. 
# After execution this, just one file left.
# The other ones are to be removed.
$ node main.js ./example-images
```

## Architecture
### Diagram
<img src="./images/Architecture_Diagram.png" width="auto" height="auto" alt="Architecture Diagram" />

### Service flow video
https://user-images.githubusercontent.com/48945177/140678191-97635493-7713-4c1e-b385-c7ce0f1500bb.mov
