/* eslint-env es6 */
/* eslint-disable */
var dialogflow = require('dialogflow');


module.exports = function (RED) {

    
    function ListEntityTypes(options) {
        RED.nodes.createNode(this, options);
        var node = this;
        node.dialogflow = options.dialogflow;
        
        
        
        node.on('input', function (msg) {
          var dialogFlowNode = RED.nodes.getNode(node.dialogflow);
            
          var variable = node.variable;

          var email = dialogFlowNode.credentials.email;
          var privateKey = dialogFlowNode.credentials.privateKey;
          var projectId = dialogFlowNode.credentials.projectId;

          var entityTypesClient = new dialogflow.EntityTypesClient({
                credentials: {
                    private_key: privateKey,
                    client_email: email
                }
            });
    
            const formattedParent = entityTypesClient.projectAgentPath(projectId);
            const request = {
              parent: formattedParent
            };
            
            entityTypesClient.listEntityTypes(request)
              .then(responses => {
                const response = responses[0];
                // doThingsWith(response)
                console.log(`Listed ${responses} entity types.`);
                msg.payload=response;
                node.send(msg);
              })
              .catch(err => {
                console.error(err);
                msg.payload=err;
                node.send(msg);
              });
            
            
        });
       
        
    }
    RED.nodes.registerType("list_entitytypes",ListEntityTypes);
}

