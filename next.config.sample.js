module.exports = {
  reactStrictMode: true,
  env: {
      DB_HOST: 'localhost',
      DB_PORT: 5432, //postgres default port
      DB_USER: '', //input your username
      DB_PASSWORD: '', //input your password
      DB_NAME:'', //input your database name
      JWT_SECRET:'', //input your JWT secret, a random string
      NEXTAUTH_URL: 'http://localhost:3000/', //must be changed during deployment to your app's url
      NEXTAUTH_SECRET: '', //input your NextAuth secret, a random string

  },
}