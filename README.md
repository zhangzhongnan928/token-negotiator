# token-negotiator

<!--
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Ftokenscript%2Ftoken-negotiator%2Fbadge%3Fref%3Dmain&style=flat)](https://actions-badge.atrox.dev/tokenscript/token-negotiator/goto?ref=main)
-->

The token-negotiator is an NPM package designed for use with TokenScript. 

TokenScript is a framework which improves functionality, security and usability of blockchain token. It creates a layer between a blockchain and user devices, adding information, rules and functionalites.

With a tokenScript and the Token-Negotiator, you can create and store attestations that can be utilised to create modern and custom tokenised web experiences. 

For further information about TokenScript please visit: [https://tokenscript.org/](tokenscript.org).

(for new token issuers please visit the following WIKI page: https://github.com/TokenScript/token-negotiator/wiki/Token-Issuer-Page).

### Examples

A live demonsration of the Token Negotiator and development examples can be found here.

https://github.com/TokenScript/token-negotiator-examples 

## Installation

Within your web application / dapp install the token negotiator.

```sh
  npm i @tokenscript/token-negotiator
```

This library provides two ways to load tokens into your application, active or passive. 

### Active Negotiation of tokens

This approach embededs a html element which connects users to their tokens. 

To start, first include the following html element into your page, this is where the token negotiator overlay will be embeded to connect with tokens. 

````html
    <div className="overlay-tn"></div>
````

The following Javascript configuration will connect to the Token Negotiator, embed the overlay html component and enable an end user to connect with the tokens
listed inside the issuers array.

```javascript
  
  import { Client } from '@tokenscript/token-negotiator';
  
  const filter = {};

  let tokens = [];

  // configure

  const negotiator = new Client({
    type: 'active',
    issuers: [
        'devcon-remote'
    ],
    options: {
        overlay: {
            openingHeading: "Open a new world of discounts available with your tokens.",
            IssuerHeading: "Get discount with Ticket",
            repeatAction: "try again",
            theme: "light",
            position: "bottom-right"
        },
        filters: {},
    }
  });

  // invoke

  negotiator.negotiate();

  // event hooks

  negotiator.on("tokens-selected", (tokens) => { 
    
    // use tokens

  });

  negotiator.on("token-proof", (proof) => { 
          
    // use proof

  });

```
### Passive Negotiation of tokens

This approach is designed for a fully custom ui/ux experience, where a list of all tokens are learnt by the client on negotation. 

````javascript

  import { Client } from '@tokenscript/token-negotiator';

  const negotiator = new Client({
    type: 'passive',
    issuers: ['devcon-remote'],
    options: {}
  });

  negotiator.on('tokens', (issuerTokens) => {
    
    // use tokens

  });

  negotiator.on("token-proof", (tokenProof) => {

    // use proof

  });
  
  // invoke

  negotiator.negotiate();
  
````

### Authenticate ownership of Token

Authenicating ownership of the token will provide a proof with a limited expiry.

````javascript

  /**
  * @param {String} issuer token issuer
  * @param {Object} unsignedToken token to attest
  */
  negotiator.authenticate({ 
    issuer, 
    unsignedToken 
  });

  negotiator.on('proof', () => {

    // the proof will be recieved here (valid or failed)

  });

````

Creating a UMD build, which will export the library as a single file.

````sh
  
  // install dependancies
  run `npm i` 

  // create the build
  run `npm run build-umd`

````

Locate and copy the '/dist' folder to your website generated from the UMD build.

Configure the library using the following example.

````html

  <!-- add the JS library -->
  <script type="text/javascript" src="./dist/negotiator.js"></script>

  <!-- add the HTML entry point for the Token Negotiator -->
  <div class="overlay-tn"></div>

  <!-- instantiate the library and include event hooks as required -->
  <script>

        var negotiator = new negotiator.Client({
            type: 'active',
            issuers: [
                'devcon-remote'
            ],
            options: {
                overlay: {
                    openingHeading: "Open a new world of discounts available with your tokens.",
                    IssuerHeading: "Get discount with Ticket",
                    repeatAction: "try again",
                    theme: "light",
                    position: "bottom-right"
                },
                filters: {},
            }
        });

        negotiator.on("tokens-selected", (tokens) => {
            console.log(tokens);
        });

        negotiator.on("token-proof", (proof) => {
            console.log(proof);
        });

        negotiator.negotiate();

    </script>


````

## filters

Key values applied to all tokens.

````javascript

  filter: {
    'devconId': 6,
    'ticketId': 417541561854,
    'class': 'gold'
  }

````

## Full attestations 

To attest full ownership of token attestations, another step is required which utilises another technology
from SmartTokenLabs team, attestation.id. To complete this step, save the authenticator.js file into your project. This must be installed before using the Token Negotiator authenticate function.

https://github.com/TokenScript/token-negotiator/blob/main/authenticator.js

For working examples see https://github.com/TokenScript/token-negotiator-examples 

## Connecting to issuers

Please see the token negotiator examples repository.

[Token Negotiator Examples](https://github.com/TokenScript/token-negotiator-examples/tree/main/token-outlet-website)

## New Token Issuers

Please reach out to us at <sayhi@smarttokenlabs.com>

## Tests

run `npm run test`

## Development of this library.

[Development WIKI](https://github.com/TokenScript/token-negotiator/wiki/developers)

### Help / Questions / Improvements

Please contact us or open an issue via github:
sayhi@smarttokenlabs.com

### Quick Start

To review working examples of the token negotiator please visit;

[Our Wiki](https://github.com/TokenScript/token-negotiator/wiki)

[Quick Start Guide](https://github.com/TokenScript/token-negotiator-examples/wiki/quick-start)


