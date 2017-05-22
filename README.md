![open health inspection](./ohi-github.png)
==========================

# Open Health Inspection GraphQL
Documentation
----
Run the project and navigate to http://localhost:3000/graphiql. You should see everything you need on the right after clicking into `query`.

Useful commands:
----
    npm run build       - build the library files (Required for start:watch)
    npm run build:watch - build the library files in watchmode (Useful for development)
    npm start           - Start the server
    npm run start:watch - Start the server in watchmode (Useful for development)
    npm test            - run tests once
    npm run test:watch  - run tests in watchmode (Useful for development)
    npm run test:growl  - run tests in watchmode with growl notification (even more useful for development)
    npm run upver       - runs standard-version to update the server version.

How to run it:
----
```bash
npm install
npm start
```

File Overview:
----
    - src                         - Server source written in typescript  
        - main.ts                 - Main server file. (Starting Apollo server)
        - schema                  - Module used to build schema
            - index.ts            - Merged all parts into a schema using graphql-tools
            - queries             - Directory for the api's queries  
            - types               - Directory for the api's types
    - package.json                - File is used to describe the library
    - tsconfig.json               - Configuration file for the library compilation
    - webpack.config.js           - Webpack configuration file to automate build

Special thanks to [Hagai Cohen](https://github.com/DxCx) and the work he put into his project [webpack-graphql-server](https://github.com/DxCx/webpack-graphql-server). Saved me alot of time!
