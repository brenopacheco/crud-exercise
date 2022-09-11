#!/usr/bin/env bash
# Test script to check Dockerfile

docker run \
	--env PORT=3000 \
	--env DATABASE_URL=postgres://user:password@localhost:5432/postgres \
	--network="host" \
	brightcove-crud:1.0.0
