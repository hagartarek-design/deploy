#!/usr/bin/env sh
# wait-for-it.sh - wait for a host and port to be ready

hostport=$1
shift
cmd="$@"

host=$(echo $hostport | cut -d':' -f1)
port=$(echo $hostport | cut -d':' -f2)

echo "Waiting for $host:$port..."

while ! nc -z $host $port; do
  sleep 1
done

echo "$host:$port is available, starting command..."
exec $cmd
