/* eslint-env es6 */
/* eslint-disable */

module.exports = function (RED) {
    
    function GetSites(options) {
        RED.nodes.createNode(this, options);
        var node = this;
        
        
        node.on('input', function (msg) {
            if(node.context().global.get("OAS_access_token")==undefined){node.error("\"node.context().global.get(\"OAS_access_token\")\" is not configured. PLease use the authenticate object to get the right access_token and fill this variable.") }
            var request = require('request');
            const option = {
                url: 'https://api.networkale.com/api/v1/sites',
                
                json:true,
                method: 'GET',
                headers: {
                    Authorization: "Bearer "+node.context().global.get("OAS_access_token"),
                    'Content-Type': 'application/json'
                }
                
            };
            request( option, function(error, response, body) {
                //console.log(body);
                //console.log(response);
                if (error!=null){console.log(error)}
                /*msg.payload = {body:body,
                               response:response,
                               error:error};*/
                //console.log(msg);
                msg.topic = "Informations about the sites."
                msg.payload = body.data;
                node.send(msg);
            })
        });
       
        
        
        
        
    }
    RED.nodes.registerType("get_sites",GetSites);
}

