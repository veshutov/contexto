#!/bin/bash

set -e

date=$(date '+%Y%m%d%H%M%S')

docker build --no-cache=true --platform=linux/amd64 -t cr.yandex/$1/1context:$date .
docker push "cr.yandex/$1/1context:$date"
