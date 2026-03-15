import { NextResponse } from "next/server";
import { sendInquiryEmail, type InquiryPayload } from "@/lib/inquiry-email";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const runtime = "nodejs";

export async function POST(request: Request) {
  const payload = (await request.json()) as Partial<InquiryPayload>;

  const name = payload.name?.trim() || "";
  const company = payload.company?.trim() || "";
  const email = payload.email?.trim() || "";
  const country = payload.country?.trim() || "";
  const inquiryType = payload.inquiryType?.trim() || "";
  const phone = payload.phone?.trim() || "";
  const targetMarket = payload.targetMarket?.trim() || "";
  const productInterest = payload.productInterest?.trim() || "";
  const monthlyVolume = payload.monthlyVolume?.trim() || "";
  const message = payload.message?.trim() || "";
  const website = payload.website?.trim() || "";

  if (website) {
    return NextResponse.json({
      message: "Your inquiry brief has been received. The Prish Overseas team can now review your product, market, and packaging requirements."
    });
  }

  if (!name || !company || !email || !country || !inquiryType || !message) {
    return NextResponse.json(
      { message: "Please complete the required fields before submitting your inquiry." },
      { status: 400 }
    );
  }

  if (!emailPattern.test(email)) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  try {
    await sendInquiryEmail({
      name,
      company,
      email,
      phone,
      country,
      inquiryType,
      targetMarket,
      productInterest,
      monthlyVolume,
      message,
      website
    });
  } catch (error) {
    console.error("Failed to deliver Prish Overseas inquiry", error);

    return NextResponse.json(
      {
        message:
          "Your inquiry could not be delivered at the moment. Please try again shortly or email prishoverseas9@gmail.com directly."
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message:
      "Your inquiry brief has been delivered to Prish Overseas. The team can now review your product, market, and packaging requirements."
  });
}
