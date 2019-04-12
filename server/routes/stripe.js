const express = require('express');
const router = express.Router();

// const stripe = require('stripe')(process.env.STRIPE_KEY); // Stripe Prod Key
const stripe = require('stripe')(process.env.STRIPE_TEST_KEY); // Stripe Test Key


/*~~~ Payment Processing ~~~*/
// charge
router.post('/charge', (req, res) => {
  const token = req.body.token;
  const registrant = req.body.registrant;

  stripe.charges.create({
    amount: registrant.price * 100,
    currency: 'usd',
    source: token.id,
    description: `Charge to ${registrant.first_name} ${registrant.last_name} for ${registrant.workshop}`
  }, (err, charge) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(charge);
  });
});

// refund
router.post('/refund', (req, res) => {
  stripe.refunds.create({
    charge: req.body.charge_id,
    amount: req.body.price,
    reason: req.body.reason // String value: duplicate, fraudulent, or requested_by_customer
  }, (err, refund) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(refund);
  });
});

module.exports = router;
