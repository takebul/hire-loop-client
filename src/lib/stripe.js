import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const PLAN_PRICE_ID = {
  seeker_pro: "price_1Tl8X22MBOuP2kLrwv91jxlg",
  seeker_premium: "price_1TlAuv2MBOuP2kLrfhoQI54m",
  recruiter_growth: "price_1TlAxJ2MBOuP2kLrd3aVBlQI",
  recruiter_enterprise: "price_1TlAzO2MBOuP2kLr6OvPVybX",
};
