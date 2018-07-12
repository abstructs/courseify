### To start the application run 'rake start'

### Docker instructions:
## Run 
``` docker-compose run --rm backend bash" ```

### From the console for backend

``` gem install rails ```
``` rails new . -d postgresql ```
``` bundle install ``` 
``` rake db:create ```

## Run 

``` docker-compose run --rm --service-ports frontend bash ```

### From the console for frontend

``` npm install ```

## To start the container

``` docker-compose up ```
