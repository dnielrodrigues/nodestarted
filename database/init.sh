#!/bin/bash
FILE="dump.sql"

# localhost
DBHOST="0.0.0.0"
DBPORT="15432"
DBNAME="hub"
DBUSER="docker"
DBPASS="secret"

# begin ...
PGPASSWORD="$DBPASS" psql -h "$DBHOST" -p "$DBPORT" -U "$DBUSER" -d "$DBNAME" --file "$FILE"

# Lembrete:
# ---------
# pelo psql: \i # ~/home/my_project/my_file.sql
