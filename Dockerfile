FROM node:lts-buster-slim AS base
RUN apt-get update && apt-get install libssl-dev ca-certificates -y
WORKDIR /app

COPY package.json yarn.lock ./

FROM base as build
RUN export NODE_ENV=production
RUN yarn
RUN yarn run db:generate

COPY . .
RUN npx next telemetry disable
RUN yarn build

FROM base as prod

COPY --from=build /app/node_modules /app/node_modules
COPY --from=build  /app/.next /app/.next
COPY --from=build  /app/public /app/public
COPY --from=build  /app/prisma /app/prisma

RUN yarn run db:generate
EXPOSE 80
CMD ["yarn", "start"]
