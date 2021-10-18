import Header from "../components/Header"
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";
import { selectTotal } from "../slices/basketSlice";

import CheckoutProductItem from "../components/CheckoutProductItem";
import Currency from 'react-currency-formatter';
import { useSession } from "next-auth/client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const stripePromise = loadStripe(process.env.stripe_public_key)


function Checkout() {
    const items = useSelector(selectItems)
    const [session] = useSession();
    const total = useSelector(selectTotal)
    const cratecheckoutsession = async () => {
        const stripe = await stripePromise;
        // call the backend to create the stipe session
        const checkoutSession = await axios.post("/api/create-checkout-session",
            {
                items,
                email: session.user.email


            }
        );
        //Redirct user to Stripe Checkout
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id,
        });

        if (result.error) {
            alert(result.error.message); // @todo : Improve that!
        }


    }
    return (
        <div className="bg-gray-100">
            <Header />
            <main className="lg:flex max-w-screen-2xl mx-auto">
                {/* left */}
                <div className="flex-grow m-5 shadow-sm">
                    <Image src='https://links.papareact.com/ikj'
                        width={1020}
                        height={200}
                        objectFit='contain' />
                    <div className="flex flex-col space-y-30 bg-white">
                        <h1 className="text-3xl border-b pb-4">{items.length === 0 ? "Your Basket is Empty" : "Shopping Basket"}</h1>
                        {items.map((item, i) => (
                            <CheckoutProductItem
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                description={item.description}
                                category={item.category}
                                image={item.image}
                                rating={item.rating}
                                hasPrice={item.hasPrice}
                            />
                        ))}
                    </div>
                </div>
                {/* Right */}
                <div className="flex flex-col bg-white p-10 shadow-md">
                    {items.length > 0 && (
                        <>
                            <h2 className='whitespace-nowrap'>Subtotal({items.length} items):
                                <span className="font-bold">
                                    <Currency
                                        quantity={total}          // Required
                                        currency="USD"            // Optional (USD by default)
                                    />

                                </span>

                            </h2>
                            <button
                                role='link'
                                onClick={cratecheckoutsession}
                                disabled={!session}
                                className={`button mt-2 ${!session && `from-gray-300 to-gray-500 border-gray-200 text-gray-300`}`}>
                                {!session ? "Sign in to Checkout" : "Proceed to checkout"}
                            </button>

                        </>
                    )}
                </div>

            </main>

        </div>
    )
}

export default Checkout
