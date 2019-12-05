# omni_access_stellar_asset_tracking_chatbot

## Prerequisites

A dialogflow V2 Active Service and the corresponding ID and token (more info on this configuration available at https://github.com/guidone/node-red-contrib-chatbot/wiki/Dialogflow-node). (Except if you want to use our test bot, which is already configured in the node-red flow).

An asset tracking account and application id. (One is already set up if you don't have one).

NodeJS (https://nodejs.org/en/download/) installed on your machine.

Node-red (https://nodered.org/) installed on your machine.

A rainbow (https://www.openrainbow.com/fr-fr) user account for chatbot (and eventually another user account for testing), a rainbow application id.

The Dialogflow.com node for node-red (https://flows.nodered.org/node/node-red-contrib-dialogflowv2-api).

The Rainbow nodes for node-red (https://flows.nodered.org/node/node-red-contrib-ale-rainbow).

## Installing

First clone this repository to your machine or download and extract it.

Launch node-red from a terminal

```
node-red
```

Open the URL of the running flow (given in the node-red launching message in the console) in your web browser.

```
Example : Server now running at http://127.0.0.1:1880/red/
```

Import the file 'asset_tracking.json' from the node-red browser page.

### Node configuration :

Edit (double click) one rainbow node (for example 'Message notification'), and edit the rainbow broker with your chatbot id and password and with your rainbow application id and password.

Edit one sqlite node (for example 'list mac address') and change the URL to the one of the 'database/asset_tracking.sqlite' file in this repository.

```
Example : C:/Document/omni_access_stellar_asset_tracking_chatbot/database/asset_tracking.sqlite
```

You can also configurate the dialogflow and asset tracking nodes but it has been already configured with valid data. To do that see the extended configuration section.

### Rainbow configuration

Connect to your chatbot rainbow account and add to your contacts all the user accounts.

## Getting started

Start node-red from a terminal if it was not already runnning.

```
node-red
```

Connect to a user account (which has the chatbot as a contact).

Writes a query to the chatbot

```
I need a xray in building A at first floor.
```

It should give you the location of the closest item it there is one available, otherwise it warns you.
!!! Currently it only gives the name of the first item in the database, this feature is coming soon.!!!

## Extended personalization

Coming soon.
