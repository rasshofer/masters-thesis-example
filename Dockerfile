# docker build -t rasshofer/masters-thesis-example .

FROM evarga/jenkins-slave
MAINTAINER Thomas Rasshofer <hello@thomasrasshofer.com>

RUN DEBIAN_FRONTEND=noninteractive

# Update repositories

RUN apt-get -qq update

# Upgrade system

RUN apt-get -yqq upgrade

# Install base packages

RUN apt-get install -yqq --force-yes --no-install-recommends build-essential ca-certificates coreutils curl git-core libfreetype6 libfontconfig1

# Install NodeJS and a more recent version of npm

RUN curl -sL https://deb.nodesource.com/setup | bash - && apt-get install -yqq nodejs

RUN npm install -g npm

# Verify NodeJS and npm

RUN node -v
RUN npm -v

# Install Ruby and Bundler

RUN apt-get install -yqq --force-yes --no-install-recommends ruby ruby-dev ruby-bundler

# Verify Ruby and Bundler

RUN ruby -v
RUN bundle -v

# Clean up

RUN apt-get autoremove -yqq
RUN apt-get clean
RUN rm -rf /var/cache/apt/archives/* /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install Grunt CLI

RUN npm install -g grunt-cli

# Verify Grunt CLI

RUN grunt --version

# Inject project

COPY . /app

RUN ls -ahl /app

# Install dependencies

RUN cd /app && npm install && bundle install

# Build project

RUN cd /app && npm test

# Ports

EXPOSE 8888

# Server

CMD cd /app && npm server
