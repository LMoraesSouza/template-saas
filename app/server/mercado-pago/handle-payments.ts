import resend from "@/app/lib/resend";
import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";

export async function handleMercadoPagoPayment(paymentData: PaymentResponse) {
    const metadata = paymentData.metadata;
    const userEmail = metadata.user_email;
    const testeId = metadata.teste_id;
    
    console.log("PAGAMENTO COM SUCESSO", {userEmail, testeId, paymentData});

    const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [userEmail],
        subject: 'Hello world',
        text: "Pagamento Realizado com sucesso!"
      });
    
    if (error) {
        console.error(error);
    }

    console.log(data)
}