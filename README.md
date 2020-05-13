# Send email with Google Cloud functions

simple function to send an email from contact form via mailgun API.

## Requirements

- [https://www.mailgun.com](Mailgun) api key

## Environment variables

- **API_KEY**  - Mailgun api key
- **FROM** - email sender (ie. John DOE <john@doe.com>)
- **TO** - recipient's email
- **DOMAIN** - domain given by Mailgun (ie. mg.mydomain.com)
- **CC** - optional carbon copy recipient's email

## Call from the website

```
const axios = require('axios');
await axios.post(URL_OF_THE_FUNCTION',
{
    subject: 'Email subject',
    message: `Body of the email in html format.`
});
 ```