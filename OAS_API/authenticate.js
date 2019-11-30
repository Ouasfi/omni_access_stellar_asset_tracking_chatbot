/* eslint-env es6 */
/* eslint-disable */

module.exports = function (RED) {
    
    function Authenticate(options) {
        RED.nodes.createNode(this, options);
        var node = this;
        node.on('input', function (msg) {
            var request = require('request');
            
            
            if (options.email==undefined){
                console.error("Please define the email parameter in the authentification node.")}
            if (options.password==undefined){
                console.error("Please define the password parameter in the authentification node.")}
            if (options.appid==undefined){
                console.error("Please define the appid parameter in the authentification node.")}
            if (options.appsecret==undefined){
                console.error("Please define the appsecret parameter in the authentification node.")}
            
            var data={
                    "email": options.email,
                    "password": options.password,
                    "appId": options.appid,
                    "appSecret": options.appsecret
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

