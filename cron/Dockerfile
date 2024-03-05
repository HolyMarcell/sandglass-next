FROM alpine:3.19.1

RUN apk add curl

WORKDIR /app
ADD call_api_cron.sh call_api_cron.sh
ADD crontab.txt crontab.txt

RUN /usr/bin/crontab crontab.txt

# -f :: "Foreground,
CMD /usr/sbin/crond -f && tail -f /var/log/cron.log
