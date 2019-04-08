FROM keymetrics/pm2:latest-alpine

RUN apk update && apk add --virtual build-dependencies build-base gcc wget git python bash
RUN npm i -g pm2

WORKDIR /var/www/app
COPY ./ ./
RUN npm i keccakjs -S
RUN npm i sha3 -S
RUN npm i

ENV NODE_ENV production 
ENV PORT 3000

EXPOSE 3000

RUN npm run build
RUN apk del build-dependencies

CMD ["pm2-runtime", "index.js", "i", "2"]
