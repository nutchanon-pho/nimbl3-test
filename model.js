
/**
 * Module dependencies.
 */
const pgp = require('pg-promise')();
const uuidv4 = require('uuid/v4');

// 'postgres://postgres:@localhost/postgres'
const pg = pgp(process.env.DATABASE_URL); // database instance;

/*
 * Get access token.
 */

module.exports.getAccessToken = function(bearerToken) {
  return pg.query('SELECT access_token, access_token_expires_on, client_id, refresh_token, refresh_token_expires_on, user_id FROM oauth_tokens WHERE access_token = $1', [bearerToken])
    .then(function(result) {
      if(!result || result.length == 0){
        return null;
      }
      var token = result[0];
      return {
        accessToken: token.access_token,
        client: {id: token.client_id},
        accessTokenExpiresAt: token.access_token_expires_on,
        user: {id: token.user_id}, // could be any object
      };
    });
};

/**
 * Get client.
 */

module.exports.getClient = function *(clientId, clientSecret) {
  return pg.query('SELECT client_id, client_secret, redirect_uri FROM oauth_clients WHERE client_id = $1 AND client_secret = $2', [clientId, clientSecret])
    .then(function(result) {
      if(!result || result.length == 0){
        return;
      }
      var oAuthClient = result[0];

      if (!oAuthClient) {
        return;
      }

      return {
        clientId: oAuthClient.client_id,
        clientSecret: oAuthClient.client_secret,
        grants: ['password'], // the list of OAuth2 grant types that should be allowed
      };
    });
};

/**
 * Get refresh token.
 */

module.exports.getRefreshToken = function *(bearerToken) {
  return pg.query('SELECT access_token, access_token_expires_on, client_id, refresh_token, refresh_token_expires_on, user_id FROM oauth_tokens WHERE refresh_token = $1', [bearerToken])
    .then(function(result) {
      return result.rowCount ? result.rows[0] : false;
    });
};

/*
 * Get user.
 */

module.exports.getUser = function *(username, password) {
  return pg.query('SELECT id FROM users WHERE username = $1 AND password = $2', [username, password])
    .then(function(result) {
        if(!result || result.length == 0){
          return;
        }

        return result[0];
    });
};

/**
 * Save token.
 */

module.exports.saveToken = function *(token, client, user) {
  return pg.query('INSERT INTO oauth_tokens(access_token, access_token_expires_on, client_id, refresh_token, refresh_token_expires_on, user_id, id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, access_token, client_id, access_token_expires_on, user_id', [
    token.accessToken,
    token.accessTokenExpiresAt,
    client.clientId,
    token.refreshToken,
    token.refreshTokenExpiresAt,
    user.id,
    uuidv4()
  ]).then(function(result) {
    console.log(result);
    return {
      accessToken: result[0].access_token,
      client: {id: result[0].client_id},
      accessTokenExpiresAt: result[0].access_token_expires_on,
      user: {id: result[0].user_id}, // could be any object
    };
  });
};
