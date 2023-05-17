# FROM node:latest AS build
# WORKDIR /build

# COPY client/package.json package.json
# COPY client/package-lock.json package-lock.json
# RUN npm i

# COPY client/public/ public
# COPY client/src/ src
# RUN npm run build

FROM ruby:2.7.4

# Register Yarn package source.
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

# Install additional packages.
RUN apt update -qq
RUN apt install -y postgresql-client nodejs yarn

# Prepare working directory.
WORKDIR /app
COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock

RUN gem install bundler
RUN bundle install

COPY . /app/

# Copy built client.
# COPY --from=build /build/build/ /app/public/

# Configure endpoint.
COPY ./.docker/entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Start app server.
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
