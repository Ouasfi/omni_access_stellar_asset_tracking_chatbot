/* eslint-env es6 */
/* eslint-disable */

module.exports = function (RED) {
    
    function GetUser(options) {
        RED.nodes.createNode(this, options);
        var node = this;
        node.on('input', function (msg) {
            var request = require('request');
            const option = {
                url: 'https://api.networkale.com/api/v1/user/profile',
                
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
                msg.topic = "Profile of the user."
                msg.payload = body.data;
                node.send(msg);
            })
        });
       
        
        
        
        
    }
    RED.nodes.registerType("get_user",GetUser);
}

