/* eslint-env es6 */
/* eslint-disable */

module.exports = function (RED) {
    
    function Authenticate(options) {
        RED.nodes.createNode(this, options);
        var node = this;
        node.on('input', function (msg) {
            var request = require('request');
            var data={
                    "email": options.email,
                    "password": options.password,
                    "appId": options.appid,
                    "appSecret": options.appsecret||"7e3075854a1f4700800d3cdfb52557fa993d545c1dbd1522247c3009a1e8e73d"
                };
            const option = {
                url: 'https://api.networkale.com/api/v1/applications/authenticate',
                json:true,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },  
                body: data
                
            };
            request( option, function(error, response, body) {
                //console.log(body);
                //console.log(response);
                if (error!=null){console.log(error)}
                msg.payload = {body:body,
                               error:error};
                //console.log(msg);
                node.send(msg);
            })
        });
       
        
        
        
        
    }
    RED.nodes.registerType("authenticate",Authenticate);
}

