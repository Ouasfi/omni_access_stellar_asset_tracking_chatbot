/* eslint-env es6 */
/* eslint-disable */
var dialogflow = require('dialogflow');


module.exports = function (RED) {

    
    function CreateEntity(options) {
        RED.nodes.createNode(this, options);
        var node = this;
        node.dialogflow = options.dialogflow;
        
        
        
        node.on('input', function (msg) {
            if (msg.entityValue!==undefined){
                node.entityValue=msg.entityValue;
            }
            else{
                console.error("There is no 'msg.entityValue' parameter given in the input message.")
            }
            if (msg.entitySynonyms!==undefined){
                node.entitySynonyms=msg.entitySynonyms;
            }
            else{
                console.error("There is no 'msg.entitySynonyms' parameter given in the input message.")
            }
            if (msg.entityTypeId!==undefined){
                node.entityTypeId=msg.entityTypeId;
            }
            else{
                console.error("There is no 'msg.entityTypeId' parameter given in the input message.")
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
            
            const formattedParent = entityTypesClient.entityTypePath(projectId, node.entityTypeId);
            
            var entity = {

                value:node.entityValue,
                synonyms:node.entitySynonyms
                
            };
            var entities=[entity];
            
            const request = {
              parent: formattedParent,
              entities: entities,
            };
            entityTypesClient.batchCreateEntities(request)
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
    RED.nodes.registerType("create_entity",CreateEntity);
}

