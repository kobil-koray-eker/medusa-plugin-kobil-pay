import {
  AbstractPaymentProcessor,
  PaymentProcessorContext,
  PaymentProcessorError,
  PaymentProcessorSessionResponse,
  PaymentSessionStatus,
} from "@medusajs/medusa";
import { CheckoutData, Options } from "../types";
import axios, { AxiosInstance } from "axios";

class KobilPayService extends AbstractPaymentProcessor {
  static identifier = "kobil";
  public access_token: string;
  public options_: Options;

  constructor(_, options) {
    super(_, options);

    this.options_ = options;
  }

  async getPaymentStatus(
    paymentSessionData: Record<string, unknown>
  ): Promise<PaymentSessionStatus> {
    console.log("----------- GET PAYMENT STATUS -----------");

    const { checkoutStatus } = paymentSessionData;

    if (checkoutStatus === "new") {
      return PaymentSessionStatus.AUTHORIZED;
    } else {
      return PaymentSessionStatus.ERROR;
    }
  }

  async initiatePayment(
    context: PaymentProcessorContext
  ): Promise<PaymentProcessorError | PaymentProcessorSessionResponse> {
    console.log("----------- INITIATE PAYMENT -----------");

    console.log({ context });

    return {
      update_requests: {
        customer_metadata: {},
      },
      session_data: {
        ...context,
        display_id: context.resource_id,
      },
    };
  }

  async authorizePayment(
    paymentSessionData: Record<string, {email, id, idempotency_key}>,
    context: Record<string, { idempotency_key: string }>
  ): Promise<
    | PaymentProcessorError
    | {
        status: PaymentSessionStatus;
        data: Record<string, unknown>;
      }
  > {
    console.log("--------- AUTHORIZE PAYMENT ---------");

    console.log({ context });

    await this.getToken(paymentSessionData.customer.email);
    const checkout = await this.checkOut({
      idempotency_key: context.idempotency_key.idempotency_key,
      amount: paymentSessionData.amount,
      userId: paymentSessionData.customer.id,
    });

    console.log({ checkout });
    paymentSessionData.transactionId = checkout.transactionId;
    paymentSessionData.checkoutStatus = checkout.status;

    console.log({ paymentSessionData });
    const status = await this.getPaymentStatus(paymentSessionData);

    return {
      status,
      data: paymentSessionData,
    };
  }

  async capturePayment(
    paymentSessionData: Record<string, unknown>
  ): Promise<Record<string, unknown> | PaymentProcessorError> {
    console.log("-------- CAPTURE PAYMENT ------");
    console.log({ paymentSessionData });

    return { status: "captured" };
    throw new Error("Method not implemented.");
  }

  // async capturePayment(payment: Payment): Promise<Data> {
  //   return {
  //     status: "captured",
  //   }
  // }

  async cancelPayment(
    paymentSessionData: Record<string, unknown>
  ): Promise<Record<string, unknown> | PaymentProcessorError> {
    console.log("----------- CANCEL PAYMENT -----------");
    throw new Error("Method not implemented.");
  }

  async deletePayment(
    paymentSessionData: Record<string, unknown>
  ): Promise<Record<string, unknown> | PaymentProcessorError> {
    console.log("----------- DELETE PAYMENT -----------");

    throw new Error("Method not implemented.");
  }

  async refundPayment(
    paymentSessionData: Record<string, unknown>,
    refundAmount: number
  ): Promise<Record<string, unknown> | PaymentProcessorError> {
    console.log("----------- REFUND PAYMENT -----------");

    throw new Error("Method not implemented.");
  }

  async retrievePayment(
    paymentSessionData: Record<string, unknown>
  ): Promise<Record<string, unknown> | PaymentProcessorError> {
    console.log("----------- RETRIEVE PAYMENT -----------");

    console.log({ paymentSessionData });
    return { ...paymentSessionData };

    throw new Error("Method not implemented.");
  }

  async updatePayment(
    context: PaymentProcessorContext
  ): Promise<void | PaymentProcessorError | PaymentProcessorSessionResponse> {
    console.log("----------- UPDATE PAYMENT -----------");

    console.log({context})

    return {
      update_requests: {
        customer_metadata: {},
      },
      session_data: {
        ...context,
      },
    };
  }

  kobilAxios() {
    const axios_: AxiosInstance = axios.create({
      baseURL: this.options_.initiate_url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.access_token}`,
      },
    });
    return axios_;
  }

  async getToken(email: string) {
    const tokenBody = new URLSearchParams();

    tokenBody.append("username", email);
    tokenBody.append("password", "1234Qwer");
    tokenBody.append("grant_type", "password");
    tokenBody.append("client_id", this.options_.client_id);
    tokenBody.append("client_secret", this.options_.client_secret);

    try {
      const response = await axios.post(
        this.options_.token_url as string,
        tokenBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      this.access_token = response.data.access_token;
      return;
    } catch (error) {
      console.log("getToken-error", error);
    }
  }

  async checkOut({ idempotency_key, amount, userId }) {
    const checkoutData: CheckoutData = {
      version: 1,
      idempotencyId: idempotency_key,
      userId,
      merchantId: this.options_.client_id,
      merchantServiceUUID: this.options_.client_id,
      merchantName: "ALDI",
      merchantCallback: this.options_.callback_url,
      transactionTimeout: this.options_.transaction_timeout,
      amount,
      tenantId: "do51",
      // currency: this.cart.region.currency_code,
      currency: "USD",
      paymentContent: [
        [
          {
            key: "1 nights, Superior King Room, Deluxe King Room",
            value: "$2,966.98",
          },
        ],
      ],
    };

    const kobil = this.kobilAxios();
    try {
      const response = await kobil.post("/", checkoutData);
      return response.data;
    } catch (error) {
      console.log("checkOut-error", error);
    }
  }
}

export default KobilPayService;
