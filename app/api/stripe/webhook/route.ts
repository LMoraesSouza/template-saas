import stripe from "@/app/lib/stripe";
import { handleStripeCancelSubscription } from "@/app/server/stripe/handle-cancel";
import { handleStripePayment } from "@/app/server/stripe/handle-payment";
import { handleStripeSubscription } from "@/app/server/stripe/handle-subscription";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server"; 

const secret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST (req: NextRequest) {
    try {

        const body = await req.text();
        const headersList = await headers();
        const signature = headersList.get("stripe-signature");
    
        if (!signature || !secret){
            return NextResponse.json({ error: "No signature or secret" }, { status: 400 });
        }
    
        const event = stripe.webhooks.constructEvent(body, signature, secret); 
    
        switch(event.type) {
            case "checkout.session.completed": 
                const metadata = event.data.object.metadata;
    
                if (metadata?.price === process.env.STRIPE_PRODUCT_PRICE_ID) {
                    await handleStripePayment(event);
                }
                if (metadata?.price === process.env.STRIPE_SUBSCRIBE_PRICE_ID) {
                    await handleStripeSubscription(event);
                }
    
                break;
            case "checkout.session.expired": 
                console.log('Enviar um email avisando que expirou');
                break;
            case "checkout.session.async_payment_succeeded": 
                console.log('Enviar um email avisando que foi pago');
                break;
            case "checkout.session.async_payment_failed": 
                console.log('Enviar um email avisando que falhou');
                break;
            case "customer.subscription.created": 
                console.log('Enviar um email avisando que assinou');
                break;
            case "customer.subscription.updated": 
                console.log('Alguma coisa mudou na assinatura');
                break;
            case "customer.subscription.deleted": 
                await handleStripeCancelSubscription(event);
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        return NextResponse.json({ message: "Webhook received" }, { status: 200 });
    } catch (error) {
        console.log(error)
    }


}