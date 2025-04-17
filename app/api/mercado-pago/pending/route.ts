import mpClient from "@/app/lib/mercado-pago";
import { Payment } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const paymentId = searchParams.get("payment_id");

    const testeId = searchParams.get("external_reference");

    if (!paymentId || !testeId) {
        return NextResponse.json({ error: "Payment ID or teste ID not found" }, { status: 400 });
    }

    const payment = new Payment(mpClient);

    const paymentData = await payment.get({
        id: paymentId
    });

    if (paymentData.status === "approved" || paymentData.date_approved !== null) {
        return NextResponse.redirect(new URL(`/success`, req.url)); //ao validar pagamento, redireciona para tela de sucesso
    }

    return NextResponse.redirect(new URL(`/`, req.url)); //se pagamento nao validado, redireciona para onde precisar
}