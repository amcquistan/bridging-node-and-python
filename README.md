# bridging-node-and-python

This is a toy app to demo the functionality and use case for using the PyNode Node.js library to bridge calling Python code from within Node.js code. The demo app is a Express.js Web App that uses PyNode to call Python code that uses SciKit Learn and its California Housing Dataset to make a linear regression model for predicting home prices based off the 1990 US Census data.

### Notes on Installing PyNode

As noted in the official [PyNode repo](https://github.com/fridgerator/PyNode) only > Python3.6 is supported and only on Mac and Linux.

The approach I took to installing PyNode is as follows:

1. create and activate Python 3.6 virtual environment

```
python3 -m venv venv
source venv/bin/activate
```

2. sym link python3-config to the virtual environment as "python-config"

```
ln -s /usr/local/bin/python3.6-config venv/bin/python-config
```

3. npm install PyNode (be sure to have the Python virtual environment still active), also worth noting is that I was using Node v8.10

```
(venv) npm install @fridgerator/pynode --save
> @fridgerator/pynode@0.2.7 install /Users/adammcquistan/Code/javascript/pynode/node_modules/@fridgerator/pynode
> node-gyp rebuild

  CXX(target) Release/obj.target/PyNode/src/main.o
  CXX(target) Release/obj.target/PyNode/src/helpers.o
  SOLINK_MODULE(target) Release/PyNode.node
npm WARN node2py@1.0.0 No description
npm WARN node2py@1.0.0 No repository field.

+ @fridgerator/pynode@0.2.7
updated 1 package in 4.042s
```

### Running the Demo App

1. Install PyNode as described in the above section

2. Install Python dependencies (with Python virtual environment activated)

```
(venv) pip install -r requirements.txt
```

3. Install Node.js dependencies

```
(venv) npm install 
```

4. Run Node.js / Express.js app

```
(venv) node server.js # or nodemon
```
