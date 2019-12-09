/* eslint-env es6 */
/* eslint-disable */

module.exports = function (RED) {
    
    function GetTag(options) {
        RED.nodes.createNode(this, options);
        
        var node = this;
        
        
        
        node.on('input', function (msg) {
            if(node.context().global.get("OAS_access_token")==undefined){node.error("\"node.context().global.get(\"OAS_access_token\")\" is not configured. PLease use the authenticate object to get the right access_token and fill this variable.") }
            if(node.context().flow.get("OAS_siteID")==undefined){node.error("node.context().flow.get(\"OAS_siteID\") is not configured. PLease use the getSites object to extract the siteID and fill this variable.") }
            var request = require('request');
            const option = {
                url: 'https://api.networkale.com/api/v1/sites/'+this.context().flow.get("OAS_siteID")+"/tags/"+msg.tagID,
                
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
                msg.topic = "Caracteristics of a tag."
                msg.payload = body.data;
                node.send(msg);
            })
        });
       
        
        
        
        
    }
    RED.nodes.registerType("get_tag",GetTag);
}

