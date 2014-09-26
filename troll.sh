#!/bin/bash

# daemonize
trap "" 1

while true; do
  if [ $RANDOM -gt 31000 ]; then
    curl -s http://horseebooksipsum.com/api/v1/ | say
  fi
  sleep 30
done;
