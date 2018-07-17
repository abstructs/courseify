### To start the application run 'rake start'

### Docker instructions:
## Setup Backend Container
``` docker-compose run --rm backend bash" ```

### From the console for backend

*Install Rails in container*
``` gem install rails ```
*Add a postgresql database*
``` rails new . -d postgresql ```
*Install dependencies*
``` bundle install ``` 
*Create new database*
``` rake db:create ```

## Setup Frontend Container 

``` docker-compose run --rm --service-ports frontend bash ```

### From the console for frontend

*Install dependencies*
``` npm install ```

## To start the container

``` docker-compose up ```


### Amazon EC2 instructions

## SSH into the EC2 terminal

*It's required to have the ssh key pairs for this to work*
```ssh -i courseify-key-pair.pem ec2-user@(SERVER-IP-ADDRESS)```

