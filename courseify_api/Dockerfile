FROM ruby:2.4.1
RUN apt-get update
RUN apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /backend
WORKDIR /backend
COPY Gemfile /backend/Gemfile
COPY Gemfile.lock /backend/Gemfile.lock
RUN bundle install
COPY . /backend
RUN rake db:migrate
# ENV RAILS_ENV production
# RUN EDITOR="nano --wait" rails credentials:edit
EXPOSE 3000