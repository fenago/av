import themes from "daisyui/src/theming/themes";
import { ConfigProps } from "./types/config";

const config = {
  // REQUIRED
  appName: "LearningScience.ai",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription:
    "Give professors their time back with a 24/7 AI teaching assistant powered by learning science principles. Save 15+ hours per week on routine teaching tasks.",
  // REQUIRED (no https://, not trailing slash at the end, just the naked domain)
  domainName: "learningscience.ai",
  crisp: {
    // Crisp website ID. IF YOU DON'T USE CRISP: just remove this => Then add a support email in this config file (resend.supportEmail) otherwise customer support won't work.
    id: "",
    // Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on every routes, just remove this below
    onlyShowOnRoutes: ["/"],
  },
  stripe: {
    // Create multiple plans in your Stripe dashboard, then add them here. You can add as many plans as you want, just make sure to add the priceId
    plans: [
      {
        // REQUIRED — we use this to find the plan in the webhook (for instance if you want to update the user's credits based on the plan)
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1Niyy5AxyNprDp7iZIqEyD2h"
            : "price_456",
        //  REQUIRED - Name of the plan, displayed on the pricing page
        name: "Basic",
        // A friendly description of the plan, displayed on the pricing page. Tip: explain why this plan and not others
        description: "Perfect for individual professors getting started with AI teaching assistance",
        // The price you want to display, the one user will be charged on Stripe.
        price: 49,
        // If you have an anchor price (i.e. $29) that you want to display crossed out, put it here. Otherwise, leave it empty
        priceAnchor: 79,
        features: [
          {
            name: "Up to 2 courses",
          },
          { name: "Basic AI teaching assistant" },
          { name: "Student chat support" },
          { name: "Email support" },
          { name: "Basic analytics" },
        ],
      },
      {
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1O5KtcAxyNprDp7iftKnrrpw"
            : "price_456",
        // This plan will look different on the pricing page, it will be highlighted. You can only have one plan with isFeatured: true
        isFeatured: true,
        name: "Professional",
        description: "Most popular - for active professors managing multiple courses",
        price: 99,
        priceAnchor: 149,
        features: [
          {
            name: "Up to 10 courses",
          },
          { name: "Advanced AI teaching assistant" },
          { name: "Voice chat capabilities" },
          { name: "Custom AI personality" },
          { name: "Advanced analytics" },
          { name: "Priority support" },
        ],
      },
      {
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1O5KtcAxyNprDp7iKKKKKKKK"
            : "price_789",
        name: "Enterprise",
        description: "For departments and institutions",
        price: 299,
        priceAnchor: 499,
        features: [
          {
            name: "Unlimited courses",
          },
          { name: "Department-wide deployment" },
          { name: "Custom integrations" },
          { name: "White-label options" },
          { name: "Dedicated support" },
          { name: "Training & onboarding" },
        ],
      },
    ],
  },
  aws: {
    // If you use AWS S3/Cloudfront, put values in here
    bucket: "bucket-name",
    bucketUrl: `https://bucket-name.s3.amazonaws.com/`,
    cdn: "https://cdn-id.cloudfront.net/",
  },
  resend: {
    // REQUIRED — Email 'From' field to be used when sending magic login links
    fromNoReply: `LearningScience.ai <noreply@resend.learningscience.ai>`,
    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
    fromAdmin: `Dr Lee at LearningScience.ai <drlee@resend.learningscience.ai>`,
    // Email shown to customer if they need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
    supportEmail: "socrates.73@gmail.com",
  },
  colors: {
    // REQUIRED — The DaisyUI theme to use (added to the main layout.js). Leave blank for default (light & dark mode). If you use any theme other than light/dark, you need to add it in config.tailwind.js in daisyui.themes.
    theme: "light",
    // REQUIRED — This color will be reflected on the whole app outside of the document (loading bar, Chrome tabs, etc..). By default it takes the primary color from your DaisyUI theme (make sure to update your the theme name after "data-theme=")
    // OR you can just do this to use a custom color: main: "#f37055". HEX only.
    main: themes["light"]["primary"],
  },
  auth: {
    // REQUIRED — the URL of your website (without the trailing slash)
    loginUrl: "/signin",
    callbackUrl: "/dashboard",
  },
} as ConfigProps;

export default config;
