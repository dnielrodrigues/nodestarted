#!/bin/bash

PGPASSWORD="secret" psql -h 127.0.0.1 -p 54320 -U homestead
#DB = nodestarted