import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './Checkout';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51ODONdEwiGG5e6noaAH3VuTBJOjFwZsytkyYw1UJkyT0Mj4aa2aFeqcQrjOvyX6Ww38DGr9XKMUOuj2bO4upqEhK00AMf6aISv');

export default function Stripe({ clientSecret }) {

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#29ab87',
      colorText: '#320f4e',
    },
  };
  const options = {
    // passing the client secret obtained from the server
    clientSecret: clientSecret,
    appearance
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm  />
    </Elements>
  );
};