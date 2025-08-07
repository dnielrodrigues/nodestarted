#!/bin/bash

# declare ...
FILE="dump.dump"

# localhost
DBHOST="0.0.0.0"
DBPORT="15432"
DBNAME="intranet_v3"
DBUSER="docker"
DBPASS="secret"

# begin ...
PGPASSWORD=$DBPASS pg_restore -Fc -j 8 --host "$DBHOST" --port $DBPORT --username "$DBUSER" --dbname=$DBNAME $FILE
