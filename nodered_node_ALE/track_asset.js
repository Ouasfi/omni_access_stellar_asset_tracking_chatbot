/* eslint-env es6 */
/* eslint-disable */

module.exports = function(RED) {
    
    function TrackAssetNode(options) {
        RED.nodes.createNode(this,options);
        var node = this;
        node.on('input', function(msg) {
            
            
            var request = require('request');
            request("https://api.networkale.com/api/v1/sites", { json: true , method: "GET" ,Authorization: "Bearer 7e3075854a1f4700800d3cdfb52557fa993d545c1dbd1522247c3009a1e8e73d"}, function(error, response, body) {
                //console.log(body);
                msg.payload = body;
                //console.log(msg);
                node.send(msg);
            });
            
        });
       
        
        
        
        
    }
    RED.nodes.registerType("track_asset",TrackAssetNode);
}

