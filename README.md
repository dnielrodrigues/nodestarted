## Description

Authentication repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Running the database

To start the PostgreSQL database, you can use the provided Docker Compose setup:  
```bash
# Start the database in detached mode
$ docker-compose up -d
```

To stop the container:  
```bash
# Stop the database
$ docker-compose down
```

To create an initial database and seed them:  
```bash
# Create database
./database/init.sh

# seed tables
npx prisma db seed

# generate prisma ORM
npx prisma generate

# to see data
npx prisma studio
```

## About UUID

Config UUID on postgresql (already done in init.sh script):  
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

## About ORM
There is a bug on "npx prisma generate" command. To solve this change the "schema.prisma" file:
```
generator client {
  provider = "prisma-client-js"
  // output   = "../generated/prisma" // delete this line or replace for:
  output   = "../node_modules/.prisma/client"
}
```  
To set updatedat fields, insert "@updatedAt" in each field manually.  
Replace: `updatedat  DateTime  @db.Timestamp(6)`
For: `updatedat  DateTime  @updatedAt @db.Timestamp(6)`

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
