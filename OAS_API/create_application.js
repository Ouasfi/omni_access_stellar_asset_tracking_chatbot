/* eslint-env es6 */
/* eslint-disable */

module.exports = function (RED) {
    
    function CreateApplication(options) {
        RED.nodes.createNode(this, options);
        var node = this;
        node.on('input', function (msg) {
            var request = require('request');
            var data={
                    "name": options.appname,
                    "target": "Web application",
                    "description": "Default Application generated with nodered package OAS.",
                    "isInProduction":true
                };
            const option = {
                url: "https://api.networkale.com/api/v1/applications",
                
                json:true,
                method: 'POST',
                headers: {
                    Authorization: "Bearer "+node.context().global.get("OAS_access_token"),
                    'Content-Type': 'application/json'
                },
                body:data
                
            };
            request( option, function(error, response, body) {
                //console.log(body);
                //console.log(response);
                if (error!=null){console.log(error)}
                /*msg.payload = {body:body,
                               response:response,
                               error:error};*/
                //console.log(msg);
                msg.topic = "Informations about the application created."
                msg.payload = body.data;
                node.send(msg);
            })
        });
       
        
        
        
        
    }
    RED.nodes.registerType("createApplication",CreateApplication);
}

