/* eslint-env es6 */
/* eslint-disable */
var dialogflow = require('dialogflow');


module.exports = function (RED) {

    
    function CreateEntityType(options) {
        RED.nodes.createNode(this, options);
        var node = this;
        node.dialogflow = options.dialogflow;
        
        
        
        node.on('input', function (msg) {
            if (msg.typeName!==undefined){
                node.typeName=msg.typeName;
            }
            else{
                console.error("There is no 'msg.typeName' parameter given in the input message.")
            }
            
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
            var entityType = {

                displayName:node.typeName,
                kind:1
                
            };
            const request = {
              parent: formattedParent,
              entityType: entityType,
            };
            entityTypesClient.createEntityType(request)
              .then(responses => {
                const response = responses[0];
                // doThingsWith(response)
                console.log(`Created ${responses} entity type`);
                msg.payload=responses;
                node.send(msg);
              })
              .catch(err => {
                console.error(err);
                msg.payload=err;
                node.send(msg);
              });
            
            
        });
       
        
    }
    RED.nodes.registerType("create_entitytype",CreateEntityType);
}

