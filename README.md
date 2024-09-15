<h1>  Steps to Initialize the Project</h1>

<h2>Frontend</h2> 
<h4>Run terminal commands</h4> 

```cmd
cd frontend 
npm install 
npm run dev
 ```    

<h2>Backend</h2> 

<h4>Server env</h4>
<h6>Setup Prisma db (using postgre)<h6> 
<h6>Add Google Email and App Password for Nodemailer</h6>

<h4>Run terminal commands</h4> 

```cmd
cd server 
npm install 
npx prisma migrate dev --name init
npm start
```



