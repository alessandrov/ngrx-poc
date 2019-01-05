## A basic dashboard application, a POC leveraging [ngrx](https://github.com/ngrx/platform), based on Angular 4, Bootstrap 4, with Oauth 2 authentication.

The user can login and perform crud operations over a list of paths and goals belonging to each path.

Data are retrieved from a RESTful [backend](https://github.com/alessandrov/ngrx-poc-nodejs-backend) and presented to the user.                  

![Demo](https://user-images.githubusercontent.com/10244603/50723249-5adfa800-10db-11e9-8c0d-f575e1e50d0f.gif)


### Auth module

Responsible for authenticating the user, refreshing the access token behind the lines, clearing the Store.

### Path and Goal modules

Each path is made of goals. User can navigate and perform CRUD operations over both.

### Core module

Just two components here, not-found and navigation bar.
	

### Prerequisites
Make sure you have Node.js installed (at least 6.10.0) and that the [backend](https://github.com/alessandrov/node-express-rest-service) 
is up and running.


### Install the dependencies

Navigate to the project folder and run:
```
npm i
```

## Run the application

### Development mode

Navigate to the project folder and run:
```
ng serve
```

the application is available at [localhost:4200](http://localhost:4200).
Being the live-reload option true by default the page is reloaded if the application files change.
 
### Production mode

Navigate to the project folder and run:
```
npm start
```

a dist folder is built with AOT compilation and the application is available at [localhost:8180](http://localhost:8180) 


### Login 

You'll be able to login with one of the following two sets of credentials:

```
username: user_admin_1
password: password1

username: user_admin_2
password: password2
```

Postman collection included.

### Author

[alessandrov](https://github.com/alessandrov)


### License

[GPL-3.0](https://github.com/alessandrov/ngrx-poc/master/LICENSE)
