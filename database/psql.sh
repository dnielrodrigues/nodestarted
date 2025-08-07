#!/bin/bash

# localhost
DBHOST="0.0.0.0"
DBPORT="15432"
DBUSER="docker"
DBPASS="secret"
DBNAME="hub"

PGPASSWORD=$DBPASS psql -h $DBHOST -p "$DBPORT" -U $DBUSER -d $DBNAME

# SSL
# ---
# PGPASSWORD="infoweb-awsrds119"
# psql
# 	-h info-rds.c4puo0evomwf.us-east-1.rds.amazonaws.com
# 	-p 5432
# 	\ "dbname=diarioficial user=infords_postgres sslrootcert=rds-combined-ca-bundle.pem sslmode=verify-full"


