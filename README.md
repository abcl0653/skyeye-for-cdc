# SkyEye for Regional CDC

Here is the repo of SkyEye Solution for Regional CDC.

You could open the demo page [here](https://string1225.github.io/skyeye-for-cdc/app/index.html).

> using the [UI5 Tooling](https://github.com/SAP/ui5-tooling).

## Prerequisites

- The **UI5 CLI** of the [UI5 Tooling](https://github.com/SAP/ui5-tooling#installing-the-ui5-cli).
  - For installation instructions please see: [Installing the UI5 CLI](https://github.com/SAP/ui5-tooling#installing-the-ui5-cli).

## Getting started

1. Clone this repository and navigate into it

    ```sh
    git clone https://github.com/string1225/skyeye-for-cdc.git
    cd skyeye-for-cdc
    ```

1. Install all dependencies

    ```sh
    npm install
    ```

1. Start a local server and run the application (<http://localhost:8080/index.html)>

    ```sh
    npm start
    ```

    Alternatively, if you want to start a local server(<http://localhost:4004)> via cds

    ```bash
    cds deploy
    cds run
    ```

1. Build mta and deploy to SAP Cloud Platform

    ```bash
    npm run build:mta
    npm run deploy:cf # This script include mbt build and cf deploy
    ```

## Test the Services

1. Get the orgUnit tree

```url
https://i039497trial-dev-dcp-ui.cfapps.eu10.hana.ondemand.com/master/Grids(310000)?$select=ID,name&$expand=children($select=ID,name;$expand=children($select=ID,name;$expand=children($select=ID,name)))
```
