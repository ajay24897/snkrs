export const SIGN_UP = "Sign Up";
export const LOG_IN = "Log In";
export const LOG_OUT = "Log out";
export const DONT_HAVE_ACCOUNT = "Don't have an account ? ";
export const ALREADY_HAVE_ACCOUNT = "Already have an account ? ";

export const PASSWORD = "Password";
export const Email = "Email";

export const ENTER_EMAIL = "Enter email";
export const ENTER_PASSWORD = "Enter password";

export const SELECT_QUANTITY = "Select Quantity";
export const SELECT_SIZE = "Select Size";

export const UK = "UK";

export const ADD_TO_CART = "Add To Cart";
export const CHECKOUT = "Checkout";
export const TOTAL = "Total";
export const ESTIMATED_DELIVERY = "Estimated Delivery";
export const SUMMARY = "Summary";
export const QUANTITY = "Quantity";
export const SIZE = "Size";
export const DELET_CART_ITEM_MESSAGE =
  "This will remove product from the cart, Are you sure ?";
export const DELET_CART_ITEM_TITLE = "You are about to remove a product";
export const LOADING = "loading";
export const SUCCESS = "success";
export const ERROR = "error";
export const PRODUCT_REMOVED_FROM_CART =
  "Product removed from cart successfully";
export const PLEASE_SIGN_UP_OR_LOGIN = "Please Sign up or Login";
export const PLEASE_SELECT_SIZE_AND_QUANTITY =
  "Please select Size and Quantity";
export const PLEASE_SELECT_SIZE = "Please select Size";
export const PLEASE_SELECT_QUANTITY = "Please select Quantity";
export const PRODUCT_ADDED_SUCCESSFULLY = "Product added in cart successfully";
export const YOU_CART_IS_EMPTY = "Your cart is empty!";
export const LOOKS_HAVENOT_ADDED_ANYTING =
  "Looks like you haven't added anything to your cart";
export const FREE_DELIVERY_APPIES_MSG =
  "Free delivery Applies to orders of $200 or more.";

export const HOME = {
  THIS_IS_SNKRS: "This is SNKRS",
  MADE_FOR: "MADE FOR",
  EVERYTHING_YOU_ARE: "EVERYTHING YOU ARE",
  DESCRIPTION:
    "The SNKRS collection is designed and tested by top designer. Giving you the freedom to move however you want to, throughout your entire journey.",
  NEW_ARRIVAL: "New Arrival",
  NEW_NIKE_SHOE: "nike air trainer 1 chlorophyll",
  NIKE_SHO_INFO:
    "The original cross trainer from '87 now lets you cross between the city centre and the suburbs without a glitch. Designed by Tinker Hatfield, the OG 'Chlorophyll' colourway remains one of the sneaker's most famous make-ups.",
  SHOP_NOW: "Shop Now",
  "500+": "500+",
  SHOES: "Shoes",
  GENUINE_PRODUCT: "Genuine product",
  "3_Months": "3 Months",
  WARRANTY: "Warranty",
  "100%": "100%",
  TOP_BRANDS: "Top Brands",
  WHAT_WE_HAVE_FOR_YOU: "What we have for you?",
  SPORT_SHOES: "Sport shoes",
  RUNNING_SHOES: "Running Shoes",
  CASUAL_SHOES: "Casual Shoes",
  SLIP_ON_SHOES: "Slip-on Shoes",
};

export const SHOE_TYPE = {
  MEN: "Men's Shoe",
  WOMEN: "Womens's Shoe",
  UNISEX: "Unisex Shoe",
};

export const FOOTER = {
  COPY_RIGHT: "© 2022 SNKRS, All rights reserved",
};
export const BIILING_INFO = {
  validation: {
    name: "Please enter the Name",
    email: "Please enter the Email",
    vaidEmail: "Please enter the valid Email",
    mobile: "Please enter the Mobile number",
    validMobile: "Please enter valid Mobile number",
    address: "Please enter the Address",
    pincode: "Please enter the Pin code",
    validPinCode: "Please enter the valid Pin code",
    state: "Please enter the State",
    country: "Please enter the Country",
  },
  inputLabel: {
    rememberInfo: "Remember information",
    name: "Name",
    landmark: "Landmark",
    pincode: "Pin code",
    country: "Country",
    state: "State",
    address: "Address",
    mobile: "Mobile Number",
    email: "Email",
  },
  buttonText: {
    proceed: "Proceed with the payment",
  },
};

export const PAYMENT = {
  inputLabel: {
    cardHoldersName: "Card Holder's Name",
    cardNumber: "Card Number",
    expiryDate: "Expiry Date",
    cvv: "CVV",
    captcha: "Captcha",
  },

  validation: {
    cardNumber: "Please enter the Card number",
    expiryDate: "Please enter the Expiry date",
    cvv: "Please enter the CVV",
    invalidExpiryDate: "Please enter valid Expiry date",
    cardHoldersName: "Please enter the Card holder's name",
    captcha: "Please enter the Captcha",
    inccorectCaptcha: "Inccorect captcha",
  },
  toast: {
    orderPlacedSuccessfully: "Order placed Successfully, Thank you",
  },
  common: {
    placeOrder: "Place Order",
    payAmount: "Pay amount",
  },
};

export const REGEX = {
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  mobile: /^[6-9][0-9]{9}$/,
  pincode: /^[0-9]{6}$/,
  expiryDate: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
};
