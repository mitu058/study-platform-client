
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import Form from './Form';
import { useParams } from 'react-router-dom';
const stripePromiss = loadStripe('pk_test_51Qio2NCHEHHW15GJ4imKwqPGTjKtxao0y8aYVLzMcGl7Z23fONPFHyKN6q6jwqJESjdN9ky042dWS0vyt2ApGVI200B8P2B7FM')
const Payment = () => {
    const {id }= useParams()
    return (
        <div className='min-h-screen'>
paymentttttt{id}
           <Elements stripe={stripePromiss}>
                   <Form id={id}></Form>
                </Elements>
        </div>
    );
};

export default Payment;
