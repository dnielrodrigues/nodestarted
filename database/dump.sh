#!/bin/bash

# declare ...
FILE="dump.dump"
SCHEMA="public"

# localhost
DBHOST="0.0.0.0"
DBPORT="15432"
DBNAME="intranet_v3"
DBUSER="docker"
DBPASS="secret"

# begin ...
PGPASSWORD=$DBPASS pg_dump -Fc -Z 9 --host "$DBHOST" --port $DBPORT --no-owner --username "$DBUSER" --file=$FILE $DBNAME
