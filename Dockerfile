FROM node:16.17.0-bullseye-slim
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
CMD ["npm", "run", "dev"]