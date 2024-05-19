#!/bin/bash

docker login --username=xxx --password=xxx registry.cn-chengdu.aliyuncs.com
docker stop sparkle-manage
docker rm sparkle-manage
docker rmi registry.cn-chengdu.aliyuncs.com/iridescent_sparkle/sparkle-manage:latest
docker pull registry.cn-chengdu.aliyuncs.com/iridescent_sparkle/sparkle-manage:latest
docker run -dit --name sparkle-manage  -p 8081:80 --restart=always  registry.cn-chengdu.aliyuncs.com/iridescent_sparkle/sparkle-manage:latest
echo "update success"
