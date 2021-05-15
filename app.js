const express = require('express');
const { Client } = require('pg');
const path = require('path');

require('dotenv').config()

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'client/dist/client')));

// enable CORS without external module
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/client/index.html'));
});

app.get('/login', (req, res) => {
  console.log(req.query.username);
  if(req.query.username && req.query.password && !req.query.username.match('/[a-zA-Z]+/g')) {
    let username = req.query.username;
    let password = req.query.password;

    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });

    client.connect();
    client.query(`SELECT id, sfid, username__c, password__c, active__c FROM salesforce.contact WHERE username__c='${username}';`, (error, resultat) => {
      if (error) throw error;
      client.end();
      console.log(resultat);
      if(resultat.rowCount > 0){
        const right = resultat.rows[0].password__c === password ? resultat.rows[0].sfid : 'Unauthorized';
        console.log(right);
        res.json(right); 
      } else {
        res.json('{ "Error" : { "title": "This username does not exist."}}');
      }
    });
  } else {
    res.json('{ "Error" : { "title": "The parameters are not correct"}}');
  }
})

app.get('/contact/:id', (req, res) => {
  if(req.params.id) {
    let id = req.params.id;
    console.log(id);

    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });

    client.connect();
    console.log('Connected profile');
    client.query(`SELECT id, sfid, name, username__c, title, email, homePhone, mobilePhone FROM salesforce.contact WHERE sfid='${id}';`, (error, resultat) => {
      if (error) throw error;
      console.log(resultat);
      client.end();
      if(resultat.rowCount > 0) {
        console.log(resultat);
        let user = resultat.rows[0];
        console.log(user);
        res.json(user);
      } else {
        res.json('{ "Error" : { "title": "This username does not exist."}}');
      }
    });
  } else {
    res.json('{ "Error" : { "title": "The parameters are not correct"}}');
  }
})

app.put('/contact/:id', (req, res) => {
  if(req.params.id) {
    let id = req.params.id;
    console.log(id);

    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });

    let query = `UPDATE salesforce.contact SET name = '${req.body.name}', username__c = '${req.body.username}'`;
    if(req.body.title) {
      query += `, title = '${req.body.title}'`;
    }

    if(req.body.email) {
      query += `, email = '${req.body.email}'`;
    }

    if(req.body.phone) {
      query += `, homePhone = '${req.body.phone}'`;
    }

    if(req.body.mobile) {
      query += `, mobilePhone = '${req.body.mobile}'`;
    }

    client.connect();
    client.query(`${query} WHERE sfid='${id}';`, (error, resultat) => {
      if (error) throw error;
      client.end();
      if(resultat.rowCount > 0) {
        console.log(resultat);
        let user = resultat.rows[0];
        console.log(user);
        res.json(user);
      } else {
        res.json('{ "Error" : { "title": "This username does not exist."}}');
      }
    });
  } else {
    res.json('{ "Error" : { "title": "The parameters are not correct"}}');
  }
})

app.get('/contracts/:userId', (req, res) => {

  console.log(req.params.userId);

  if(req.params.userId) {

    let id = req.params.userId;

    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });

    client.connect();
    
    client.query(`SELECT id, sfid, status, startDate, endDate, contractNumber FROM salesforce.contract WHERE customerSignedId = '${id}';`, (err, resultat) => {
      if (err) throw err;
      client.end();

      let contracts = [];
      for (let row of resultat.rows) {
        contracts.push(row);
      }
      res.json(contracts);
    });
  } else {
    res.json('{ "Error" : { "title": "The parameters are not correct"}}');
  }
})

app.get('/products/:contractId', (req, res) => {

  console.log('PRODUCT');

  if(req.params.contractId) {
    let id = req.params.contractId;
    console.log(id);

    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });

    console.log('DB connecting');
    client.connect();
    console.log('DB connected');

    client.query(`SELECT id, sfid, quantity, totalprice, contract__c, product_name__c FROM salesforce.orderItem WHERE contract__c = '${id}'`, (err, resultat) => {
      if (err) throw err;
      client.end();

      let products = [];
      for (let row of resultat.rows) {
        console.log(JSON.stringify(row));
        products.push(row);
      }

      res.json(products);
    })
  }
})

app.listen(process.env.PORT, () => console.log('Example app is listening on port 3000.'));