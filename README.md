# blogo-ninja app

## **LOCAL USAGE**
1. Clone the project from 
https://github.com/marta05/blog (SSH URL: `git@github.com:marta05/blog.git`)
```
$ git clone git@github.com:marta05/blog.git
```

2. Install project's dependencies
```
$ cd blog
$ npm install
```
3. Add to your project **next.config.js** file under root directory.  
You are going to add there your environmental variables.  
The sample setup can be found under file **next.config.sample.js**
  
You can generate a random string for JWT_SECRET with openssl:
```
$ openssl rand -base64 64
```

4. Download and install [PostgreSQL](https://www.postgresql.org/download/) as it is used as the storage backend.
5. Initialise the database by running the bootstrap script `/lib/init-DB.sql`
6. To start the server, run the command:
```
$ npm run dev
```
7. Head to [http://localhost:3000](http://localhost:3000)

## **DEPLOYMENT STEPS:**

This guide is for deploying on Heroku.

1. Setup a new app with your domain name on Heroku.
2. On your local, enter the project root folder and checkout to the `main` brach
3. Run the following commands to connect your project to your heroku app  
```
$ heroku login
$ heroku git:clone -a your-app-name-on-heroku
```

4. Deploy your app:  
```
$ Git add .  
$ Git commit -am “Your message”  
$ Git push heroku main  
```

5. Add Heroku Postgres database to your project with the following command (`hobby-dev` is the free postgres version):  
```
$ heroku addons:create heroku-postgresql:hobby-dev
```

6. On Heroku, go to your app’s overview and click on installed Heroku Postgres add-on.  
On the landing page go to settings &#8594; database credentials &#8594; view credentials  
  
7. Copy the database credentials in **Config Vars** of your app. To do that go to your app's settings  (path: ‘​​https://dashboard.heroku.com/apps/YOUR-APP-NAME/settings”)  
8. Add following environment variables to heroku’s config vars:  
    - DB_HOST  
    - DB_PORT
    - DB_USER
    - DB_PASSWORD
    - DB_NAME
    - JWT_SECRET (a random string)
    - NEXTAUTH_URL  (it’s equal to deployed app's main page url)
    - NEXTAUTH_SECRET (a random string) 
9. Using provided credentials, connect to Heroku’s database and initialise the db by running this bootstrap script: `/lib/init-DB.sql` (https://github.com/marta05/blog/tree/main/lib/init-DB.sql)
11. If you're using a free version of Heroku, which does not provide SSL, make sure that you disable SSL in your db connection setup by adding the following code to (/lib/db.js)
  ```
  ssl: {
    rejectUnauthorized: false,
  },
  ```