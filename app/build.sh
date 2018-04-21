#!/bin/bash

echo "-------------------------------------------------"
echo "How to call: ./build.sh PORT [install]"
echo "-------------------------------------------------"
cd /home/demo_contract/app
if [ "$2" = "install" ]
then
  npm i
fi

npm run build
pm2 delete act
PORT=$1 pm2 start ./index.js --name "act"
