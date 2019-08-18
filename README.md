# bridging-node-and-python

This is a toy app to demo the functionality and use case for using the PyNode Node.js library to bridge calling Python code from within Node.js code.

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
