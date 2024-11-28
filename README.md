## Version Control Workflow
 
When starting a new sprint, start by pulling to make sure you're up to date with the most recent code pushes:

```bash
git pull
```

You'll also want to make sure you're up to date with most recent node packages in our project:

```bash
npm i
```

Next, create a branch using the naming convention:
```bash
git checkout -b "[Name1][Name2]-sprint[x]"
```

Then complete your sprint. As you work, commit often.
```bash
git add .
git commit -m "[your commit message]"
```

Once you are done with your sprint, push your code to github.
```bash
git push
```

Once you have pushed go to https://github.com/JumboCode/speakout-boston/branches -> and press the "New pull request" next to your branch. Write a message about what work you did on your sprint, what aspects are working, and what aspects are not working (if any) and press "Create pull request".

## Development

### Prerequisite

You will first need to clone this repository to your local computer. This can be done using `git clone https://github.com/maslenj/SpeakOUTDeployment.git`.

In order to run the app you will need to have node and npm installed. Instructions can be found [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). 

### Working with the database

For our database, we are using Postgres. To develop locally, you will need to have an instance of Postgres running on your system. The easiest way to do this is to go to https://www.postgresql.org/download/ and download Postgres.app.

Once you have a postgres app running, create a `.env` file and put the database url into it.
```bash
touch .env
```

Your .env should file look something like this
```bash
DATABASE_URL="postgresql://jimmymaslen@localhost:5432/jimmymaslen?schema=public"
```

For authentication purposes, you will also need to create a `.env.local` file.
```bash
touch .env.local
```

Inside of this file, you will want to add the following:
```bash
NEXTAUTH_URL=http://localhost:3000/
NEXTAUTH_SECRET=secret
RESEND_API_KEY=[api key]
```

Now you can try pushing, seeding, and viewing the database:
```bash
npx prisma db push --force-reset
npx prisma db seed
npx prisma studio
```

### Running the development server

Before running the app, install dependencies:
```bash
npm i
```

To run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

If you click on the `User` model, you should see at least two entries.
