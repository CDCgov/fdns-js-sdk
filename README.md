# FDNS JavaScript SDK
This is the repository with the JavaScript SDK for Foundation Services.

## Running locally
Please read the following instructions carefully for information on how to run and test this SDK in your local environment.

### Before you start
You will need to have the following dependencies installed before getting up and running locally:

- [FDNS Gateway Microservice](https://github.com/CDCgov/fdns-ms-gateway), which must be running using that project's `make docker-start` command
- [Node.js](https://nodejs.org/en/)
- **Windows Users**: Please use [Cygwin](http://www.cygwin.com/) for running commands in this README

## How to use
This SDK is designed to be used in React projects primarily created with [create-react-app](https://github.com/facebook/create-react-app) and [Node.js](https://nodejs.org) projects.

### React
To use this in a React project built with [create-react-app](https://github.com/facebook/create-react-app) use the following instructions:

```sh
create-react-app fdns-js-sdk-demo
cd fdns-js-sdk-demo
npm install --save CDCgov/fdns-js-sdk
$EDITOR src/App.js
```

Then in your `App.js` file include the following:

```javascript
import FDNS from 'fdns-js-sdk';

const fdns = new FDNS({
  HL7_UTILS_URL: 'http://localhost:8099/hl7',
  CDA_UTILS_URL: 'http://localhost:8099/cda',
  STORAGE_URL: 'http://localhost:8099/storage',
  OBJECT_URL: 'http://localhost:8099/object',
  INDEXING_URL: 'http://localhost:8099/indexing',
  COMBINER_URL: 'http://localhost:8099/combiner',
  RULES_URL: 'http://localhost:8099/rules',
});
```

**Note: The URLs of the endpoints here that are used are based on [FDNS Gateway Microservice](https://github.com/CDCgov/fdns-ms-gateway). These microservices will need to be running in order to point to these endpoints.**

### Node
To use this in a Node project, use the following instructions:

```
mkdir fdns-js-sdk-demo
cd fdns-js-sdk-demo
npm init
npm install --save CDCgov/fdns-js-sdk
$EDITOR src/server.js
```

Then in your `server.js` file include the following:

```javascript
const FDNS = require('fdns-js-sdk');

const fdns = new FDNS({
  HL7_UTILS_URL: 'http://localhost:8099/hl7',
  CDA_UTILS_URL: 'http://localhost:8099/cda',
  STORAGE_URL: 'http://localhost:8099/storage',
  OBJECT_URL: 'http://localhost:8099/object',
  INDEXING_URL: 'http://localhost:8099/indexing',
  COMBINER_URL: 'http://localhost:8099/combiner',
  RULES_URL: 'http://localhost:8099/rules',
});
```

**Note: The URLs of the endpoints here that are used are based on [FDNS Gateway Microservice](https://github.com/CDCgov/fdns-ms-gateway). These microservices will need to be running in order to point to these endpoints.**

## Public Domain
This repository constitutes a work of the United States Government and is not subject to domestic copyright protection under 17 USC § 105. This repository is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/). All contributions to this repository will be released under the CC0 dedication. By submitting a pull request you are agreeing to comply with this waiver of copyright interest.

## License
The repository utilizes code licensed under the terms of the Apache Software License and therefore is licensed under ASL v2 or later.

The source code in this repository is free: you can redistribute it and/or modify it under the terms of the Apache Software License version 2, or (at your option) any later version.

This source code in this repository is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the Apache Software License for more details.

You should have received a copy of the Apache Software License along with this program. If not, see http://www.apache.org/licenses/LICENSE-2.0.html.

The source code forked from other open source projects will inherit its license.

## Privacy
This repository contains only non-sensitive, publicly available data and information. All material and community participation is covered by the Surveillance Platform [Disclaimer](https://github.com/CDCgov/template/blob/master/DISCLAIMER.md) and [Code of Conduct](https://github.com/CDCgov/template/blob/master/code-of-conduct.md). For more information about CDC's privacy policy, please visit [http://www.cdc.gov/privacy.html](http://www.cdc.gov/privacy.html).

## Contributing
Anyone is encouraged to contribute to the repository by [forking](https://help.github.com/articles/fork-a-repo) and submitting a pull request. (If you are new to GitHub, you might start with a [basic tutorial](https://help.github.com/articles/set-up-git).) By contributing to this project, you grant a world-wide, royalty-free, perpetual, irrevocable, non-exclusive, transferable license to all users under the terms of the [Apache Software License v2](http://www.apache.org/licenses/LICENSE-2.0.html) or later.

All comments, messages, pull requests, and other submissions received through
CDC including this GitHub page are subject to the [Presidential Records Act](http://www.archives.gov/about/laws/presidential-records.html)
and may be archived. Learn more at [http://www.cdc.gov/other/privacy.html](http://www.cdc.gov/other/privacy.html).

## Records
This repository is not a source of government records, but is a copy to increase collaboration and collaborative potential. All government records will be published through the [CDC web site](http://www.cdc.gov).

## Notices
Please refer to [CDC's Template Repository](https://github.com/CDCgov/template)
for more information about [contributing to this repository](https://github.com/CDCgov/template/blob/master/CONTRIBUTING.md),
[public domain notices and disclaimers](https://github.com/CDCgov/template/blob/master/DISCLAIMER.md),
and [code of conduct](https://github.com/CDCgov/template/blob/master/code-of-conduct.md).