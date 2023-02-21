//domain/.netlify/functions/create-payment-intent

//this is the package that helps us access env variables
require("dotenv").config();

const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);
exports.handler = async function (event, context) {

  if (event.body) {
    const { cart, shipping_fee, total_amount } = JSON.parse(event.body);
    //so here you essentially communicate to your
    //backend and pass in the ID's and you get the
    //actual value of the item
    //you would iterate over that cart grab thos ID's
    //then connect to your own api or the backend
    //you are using and then grab the actual cost

    const calculateorderamount = () => {
      return shipping_fee + total_amount;
    };

    try {
      const paymentintent = await stripe.paymentIntents.create({
        amount: calculateorderamount(),
        currency:'inr'
      });
      return{
        statusCode:200,
        body:JSON.stringify({clientSecret:paymentintent.client_secret})

      }
    } catch (error) {
        return {
            statusCode:500,
            body:JSON.stringify({msg:error.message})
        }
    }
  }

  return {
    statusCode: 200,
    body: "create payment intent",
  };
};
