FROM node:10.13-alpine
ENV NODE_ENV production

WORKDIR /app
COPY ["src/package.json", "src/package-lock.json*", "src/npm-shrinkwrap.json*", "./src/"]
RUN npm install --production --silent
COPY ./src .
EXPOSE 80
#CMD npm start
CMD [ "node", "server.js"]