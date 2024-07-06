#!/bin/sh
image_name=chat_bot
version=1.0.0

docker rmi -f harbor.dollarkiller.com/library/$image_name:$version
docker build -f Dockerfile -t harbor.dollarkiller.com/library/$image_name:$version  .
docker push harbor.dollarkiller.com/library/$image_name:$version
#docker save -o $image_name-$version.tar $image_name:$version