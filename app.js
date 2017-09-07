var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var oauthServer = require('express-oauth-server');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Add OAuth server.
app.oauth = new oauthServer({
  model: require('./model')
});

// Post token.
app.post('/oauth/token', app.oauth.token());

// Get secret.
app.get('/secret', app.oauth.authenticate(), function (req, res) {
  // Will require a valid access_token.
  res.send('Secret area');
});

app.get('/public', function (req, res) {
  // Does not require an access_token.
  res.send('Public area');
});

app.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// Get products
app.get('/products', app.oauth.authenticate(), function (req, res) {
  let productList = [
    {
      id: 1,
      sku: 'TN SO 000015',
      description: 'Magnetic contactor - 9A (5.5 kW, 7.5 HP) control voltage 230 Vac',
      brand: 'Schneider Electric',
      listPrice: 880
    },
    {
      id: 2,
      sku: 'TN SO 000015',
      description: 'Magnetic contactor - 9A (5.5 kW, 7.5 HP) control voltage 230 Vac',
      brand: 'Schneider Electric',
      listPrice: 880
    },
    {
      id: 3,
      sku: 'TN SO 000015',
      description: 'Magnetic contactor - 9A (5.5 kW, 7.5 HP) control voltage 230 Vac',
      brand: 'Schneider Electric',
      listPrice: 880
    },
    {
      id: 4,
      sku: 'TN SO 000015',
      description: 'Magnetic contactor - 9A (5.5 kW, 7.5 HP) control voltage 230 Vac',
      brand: 'Schneider Electric',
      listPrice: 880
    },
    {
      id: 5,
      sku: 'TN SO 000015',
      description: 'Magnetic contactor - 9A (5.5 kW, 7.5 HP) control voltage 230 Vac',
      brand: 'Schneider Electric',
      listPrice: 880
    }
  ];
  return res.json(productList);
});

// Get products
app.get('/orders/1', app.oauth.authenticate(), function (req, res) {
  let order = {
    account: {
      name: 'CPF Saraburi',
      address: 'Highway 2, Kaeng Khoi Saraburi Thailand',
      phone: '+66 087 348 79 34',
      type: 'Retailers',
      ownedBy: 'Tom Hanks'
    },
    status: 'Pending',
    orderItems: [
      {
        id: 1,
        product: {
          id: 1,
          sku: 'TN SO 000015',
          description: 'Magnetic contactor - 9A (5.5 kW, 7.5 HP) control voltage 230 Vac',
          brand: 'Schneider Electric',
          listPrice: 880
        },
        discount: 0.3,
        quantity: 16
      },
      {
        id: 2,
        product: {
          id: 2,
          sku: 'TN SO 000015',
          description: 'Magnetic contactor - 9A (5.5 kW, 7.5 HP) control voltage 230 Vac',
          brand: 'Schneider Electric',
          listPrice: 880
        },
        discount: 0.3,
        quantity: 16
      },
      {
        id: 3,
        product: {
          id: 3,
          sku: 'TN SO 000015',
          description: 'Magnetic contactor - 9A (5.5 kW, 7.5 HP) control voltage 230 Vac',
          brand: 'Schneider Electric',
          listPrice: 880
        },
        discount: 0.3,
        quantity: 16
      },
      {
        id: 4,
        product: {
          id: 4,
          sku: 'TN SO 000015',
          description: 'Magnetic contactor - 9A (5.5 kW, 7.5 HP) control voltage 230 Vac',
          brand: 'Schneider Electric',
          listPrice: 880
        },
        discount: 0.3,
        quantity: 16
      },
      {
        id: 5,
        product: {
          id: 5,
          sku: 'TN SO 000015',
          description: 'Magnetic contactor - 9A (5.5 kW, 7.5 HP) control voltage 230 Vac',
          brand: 'Schneider Electric',
          listPrice: 880
        },
        discount: 0.3,
        quantity: 16
      }
    ]

  };
  return res.json(order);
});

module.exports = app;
