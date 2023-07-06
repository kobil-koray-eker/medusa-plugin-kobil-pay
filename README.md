# Configuration

In order to be able to use the **kobil-pay** as a payment provider, you have to add the configuration to your newly added plugins in **Medusajs**. To do so here are the steps

<br/>

**1.** Configure your developer console
<br/>
**2.** Go to your `medusa-config.js`
<br/>
**3.** Check that the variables are set with the appropriate values

<br/>

```js
const KOBIL_CLIENT_ID = process.env.CLIENT_ID;
const KOBIL_CLIENT_SECRET = process.env.CLIENT_SECRET;
const KOBIL_AUTH_URL = process.env.KOBIL_AUTH_URL;
const KOBIL_TOKEN_URL = process.env.KOBIL_TOKEN_URL;
const KOBIL_PAY_INITIATE_URL = process.env.KOBIL_PAY_INITIATE_URL;
const BASE_URL = process.env.BASE_URL;
```

<br/>

Then in your plugins collections, if you did not already inserted the `plugin`, add the following

<br/>

```js
  {
    resolve: "medusa-plugin-kobil-pay",
    options: {
      client_id: KOBIL_CLIENT_ID,
      client_secret: KOBIL_CLIENT_SECRET,
      authorization_url: KOBIL_AUTH_URL,
      token_url: KOBIL_TOKEN_URL,
      initiate_url: KOBIL_PAY_INITIATE_URL,
      callback_url: `${BASE_URL}/kobil/payment/callback`,
      transaction_timeout: 10,
    },
  },
```

<br/>
