#ElasticVoyeur
A simple web frontend for ElasticSearch that will transform the JSON results into tabular format to enable CSV output. 

##Setup:

Get a local copy of the elastic-voyeur repo (fork/clone, clone or just download).

From the root project directory, run:
```
npm install
```
then
```
node server.js
```

##Currently supported Modes:
**No Server** - If you are running a localhost or jsonp enabled ES server, you should be able to just load /public/index.html into a browser, change the "ElasticSearch Instance" url to your server (e.g. 'http://localhost:9200/_search') and voila.

**Node server with dummy data** - There is a /dummydata route in the server.js file (e.g. 'http://localhost:3000/dummydata') and you can set the "ElasticSearch Instance" url  to it and quickly test out the UI.

**Node server as proxy to ElasticSearch server instance** - If your ES instance doesn't have jsonp enabled or requires some sort of auth, you can use the Node.js /proxy route as a starting point.


##Extra Credit:
If you want to quickly spin up an instance of ElasticSearch to test the Voyeur client, you can use the instructions here: https://github.com/aglover/coffer

On my Mac, I got the error 
```
No base MAC address was specified. This is required for the NAT networking
to work properly (and hence port forwarding, SSH, etc.). Specifying this
MAC address is typically up to the box and box maintiner. Please contact
the relevant person to solve this issue.
```
So had to follow the instructions here: http://stackoverflow.com/questions/12538162/setting-a-vms-mac-address-in-vagrant and add:
```
config.vm.network "public_network", :bridge => 'enp4s0', :mac => "5CA1AB1E0001"
```

This was also a useful resource: http://joelabrahamsson.com/elasticsearch-101/
