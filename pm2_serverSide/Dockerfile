FROM keymetrics/pm2:latest-alpine

# Bundle APP files
COPY . /1on1-admin-api
WORKDIR /1on1-admin-api

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git
RUN apk --no-cache add --virtual builds-deps build-base python
# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install 

# Expose the listening port of your app
EXPOSE 8080

# Show current folder structure in logs
RUN ls -al -R

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]