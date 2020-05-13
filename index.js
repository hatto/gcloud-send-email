/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

// Mailgun authentication
const auth = {
  auth: {
    api_key: process.env.API_KEY, // Mailgun API key
    domain: process.env.DOMAIN  // Mailgun domain ie. mg.mydomain.com
  },
  host: 'api.eu.mailgun.net' // for non-eu only api.moailgun.net
}
const nodemailerMailgun = nodemailer.createTransport(mg(auth)); // mailgun instance

exports.send = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*'); // don't forget to change this to your domain !

  /**
   * if preflight request (OPTIONS), accept and return 204
   */
  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else { // else process the request
    const data = req.body; // data passed as POST
    nodemailerMailgun.sendMail({
      from: process.env.FROM,   // environment variable for sender
      to: process.env.TO,       // An array if you have multiple recipients.
      cc: process.env.CC || "", // cc or empty
      subject: data.subject,    // subject (from the post request)
      html: data.message,       // html email body (from the post request )
    }, (err, info) => {
      if (err) {
        res.status(500).send({error:err, info: info}); // send 500 if not successful
      }
      else {
        res.status(200).send(info);     // send 200 if successful
      }
    });
  }

};
