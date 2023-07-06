import { Request, Response } from "express";

const PAYMENT_PROVIDER_KEY = "pp_kobil";

export default async (req: Request, res: Response) => {
  // const kobilService = req.scope.resolve(PAYMENT_PROVIDER_KEY);
  // const kobilService2 = req.scope.resolve("KobilPayService");
  // console.log(req.scope.registrations);

  if (req.body.status === "finished") {
    const manager = req.scope.resolve("manager");

    await manager.transaction(async (transactionManager) => {
      const orderService = req.scope.resolve("orderService");
      const paymentService = req.scope.resolve("paymentService");

      const query = `
              SELECT *
              FROM payment
                WHERE data ->> 'transactionId' = $1;
              `;
      const payment = await paymentService
        .withTransaction(transactionManager)
        .paymentRepository_.query(query, [req.body.transactionId]);
      console.log(payment);

      const orderId = payment[0].order_id;
      const cartId = payment[0].cart_id;

      const order = await orderService
        .withTransaction(transactionManager)
        .retrieveByCartId(cartId)
        .catch(() => undefined);

      if (order?.payment_status !== "captured") {
        await orderService
          .withTransaction(transactionManager)
          .capturePayment(orderId);
      }
    });

    res.status(200).send("thanks");
  }
};
