# omni_access_stellar_asset_tracking_chatbot

## Complete installation guide

First clone this repository to your machine or download and extract it.

### Prerequisites

A Google account (to be able to use dialogflow).

An open stellar asset tracking account and application id.

A rainbow (https://www.openrainbow.com) admin account (or a developper sandbox account) with an application id and an account for the chatbot.

### Setup your dialogflow environment

More information on this configuration is available at https://github.com/guidone/node-red-contrib-chatbot/wiki/Dialogflow-node.
If you want to use our test bot, which is already configured in the node-red flow, you don't need to do this part. However this might not work on a site different from ours.

#### Create the agent

Click on the corresponding creation menu : `create new agent ` and fill all the required information.

#### Import our intent (and test entities)

Click on `Export and Import` then `IMPORT FROM ZIP`.

Then select the corresponding file.

```
[project URL]/dialogflow_intent/Chatbot-asset-tracking.zip
```

Finally type `IMPORT` in the corresponding space under the file name, and click on `Import` button.

#### Correctly define entities

To work properly, the dialogflow entities must be defined from the open stellar asset tracking data.

In the `Entity` menu in dialogflow, set the Building, Floor and asset_type entities.
You can choose any synonym you want for every item.

##### Building entity

The name of each Building must exactly correspond to the name of each building in your Open Stellar site database.

##### Floor entity

The name of each Floor must exactly correspond to the name of each floor in your Open Stellar site database.

##### asset_type entity

The name of each asset_type must exactly correspond to the name of each category in your Open Stellar site database.

### Install node-red

#### Install NodeJS (https://nodejs.org/en/download/) on your machine.

Choose the version corresponding to your OS and execute the installer.

#### Install Node-red (https://nodered.org/) on your machine.

```
sudo npm install -g --unsafe-perm node-red
```

### Install the required external packages for node-red

The Dialogflow.com node for node-red (https://flows.nodered.org/node/node-red-contrib-dialogflowv2-api).

```
npm i -g node-red-contrib-dialogflowv2-api
```

The Rainbow nodes for node-red (https://flows.nodered.org/node/node-red-contrib-ale-rainbow).

```
npm install node-red-contrib-ale-rainbow
```

The SQLite node for node-red (https://flows.nodered.org/node/node-red-node-sqlite).

```
npm i --unsafe-perm node-red-node-sqlite
```

### Install our asset tracking package for node-red

Go to the .node-red directory within a terminal

```
cd C:/User/Username/.node-red
```

Install the asset tracking package

```
npm install [project URL]/OAS_API

Ex : npm install C:/User/Username/Downloads/omni_access_stellar_asset_tracking_chatbot/OAS_API
```

#### Check if the package is well installed

In the node-red palette, you can find the list of the installed packages. The list of nodes is also available on the left of the node-red screen.

### Import the project in node-red

Launch node-red from a terminal

```
node-red
```

Open the URL of the running flow (given in the node-red launching message in the console) in your web browser.

```
Example : Server now running at http://127.0.0.1:1880/red/
```

Import the file 'asset_tracking.json' from the node-red browser page.

### Configure the node-red flow

#### Rainbow browser configuration

Edit (double click) one rainbow node (for example 'Message notification'), and edit the rainbow broker with your chatbot id and password and with your rainbow application id and password.

#### SQLite node conguration

Edit one sqlite node (for example 'list mac address') and change the URL to the one of the 'database/asset_tracking.sqlite' file in this repository.

```
Example : C:/User/Username/omni_access_stellar_asset_tracking_chatbot/database/asset_tracking.sqlite
```

#### Omnistellar asset tracking node configuration

Find the authenticate node (it should be at the beginning of the flow).

Edit this node and fill the information with your Omnistellar identifier and ID.

Edit the site selection node so that the site ID in global variable is the one you want to work with.

## Running the tests

Start node-red from a terminal if it was not already runnning.

```
node-red
```

Connect to a user account (which has the chatbot as a contact).

Write a query to the chatbot

```
I need a monitor in building A at floor A1.
```

It should give you the location of the closest item it there is one available, otherwise it warns you.

## How the node-red software works

The entire software is in one single flow.

### Begining of the flow

When a message is received by the chatbot, the software begins.

First, it resets the database with the current data it finds on Omnistellar website. By doing that, it will authenticate to this website and keep the authentifier token and the site ID for later requests.

### Conversation with dialogflow

Then, it sends the message to dialogflow, which in turn gives an answer.

If not all mandatory elements are given to dialogflow, a new question is prepared by it, and the software detects it and sends the question to the user, then it stops. Since the conversation ID in dialogflow is set to be the rainbow user ID, when the user sends his/her answer to the chatbot the software restarts but the dialogflow conversation is considered to be the same and dialogflow keeps in memory all the previously given data.

When all mandatory elements are given to dialogflow, the software finds within the dialogflow response the exact name of the asset category requested, and the building and floor where the user asks.

### Finding the corresponding assets

By searching through the database, the software finds all assets whose category corresponds to the requested one. If not a single one asset of this category is available, the chabot answers this, and the software stops.

It then asks to Omnistellar the position of all those assets and creates a database with all the information we can get : the last known latitude, longitude and the ID of the floor where the asset is. Since the positionning information is not always available, if among all the corresponding assets none of them can be positioned, the chatbot answers that no position is available, and the software stops.

### Sorting the assets and answering

Then, the software retrieves the corresponding building and names and matches them with the dialogflow request. If an asset is at the same floor as the user, it's chosen in priority, otherwise the software chooses an asset in the same building if possible, and if not it just picks the first one in the database.

At then end, the chatbot answer in rainbow will contain the name of the chosen asset, the building and floor name where it was located, the level of the floor, and the exact last known latitude and longitude. After that the software stops.
