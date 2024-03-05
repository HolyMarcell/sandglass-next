#!/bin/sh

# code goes here.
echo "\n [$(date)] Running pings: "
curl -X POST $PING_CALL_API --no-progress-meter -H "Authorization: Bearer $PING_CALL_SECRET"
