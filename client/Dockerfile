# Use an official node runtime as a parent image
FROM node:latest

WORKDIR /app

# Install dependencies
COPY package.json /app

RUN npm install

# Add rest of the client code
COPY . /app

ENV WATCHPACK_POLLING=true
ENV PORT=4000
EXPOSE 4000

CMD ["npm", "start"]
