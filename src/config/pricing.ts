export const enableUserBalanceChecking =
  process.env.NEXT_PUBLIC_ENABLE_USER_BALANCE_CHECKING;

export const paddleProductId = parseInt(
  process.env.NEXT_PUBLIC_PADDLE_PRODUCT_ID || '0'
);

export const paddleVendorId = parseInt(
  process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID || '0'
);

export const paddleSandbox = process.env.NEXT_PUBLIC_PADDLE_SANDBOX;
