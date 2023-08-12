FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /backend
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 8081
RUN chown -R node /backend
USER node
CMD ["node", "server.js"]

