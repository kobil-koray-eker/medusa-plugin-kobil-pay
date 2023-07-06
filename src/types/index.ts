export type Options = {
  api_key: string;
  client_id: string;
  client_secret: string;
  authorization_url: string;
  token_url: string;
  initiate_url: string;
  callback_url: string;
  tenant_id: string;
  merchant_name: string;
  transaction_timeout: number;
  email: string
};

export type CheckoutData = {
  version: number;
  idempotencyId: string;
  userId: string;
  merchantId: string;
  merchantServiceUUID: string;
  merchantName: string;
  merchantCallback: string;
  transactionTimeout: number;
  amount: number;
  tenantId: string;
  currency: string;
  paymentContent: { key: string; value: string }[][];
};

export type PaymentStatus = {
  mercantId: string;
  merchantCallback: string;
  transactionId: string;
};