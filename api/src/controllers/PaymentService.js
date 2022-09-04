const axios = require("axios");

class PaymentService {
  async createPayment() {
    const url = "https://api.mercadopago.com/checkout/preferences";

    const body = {
      payer_email: "test_user_71847263@testuser.com",
      items: [
        {
          title: "Suscripcion",
          description: "Dummy description",
          picture_url: "http://www.myapp.com/myimage.jpg",
          category_id: "category123",
          quantity: 1,
          unit_price: 189
        }
      ],
      back_urls: {
        failure: "/failure",
        pending: "/pending",
        success: "/success"
      }
    };

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });

    return payment.data;
  }

  async createSubscription(email, plan, month) {
    const url = "https://api.mercadopago.com/preapproval";
    const body = {
      reason: "Musicfy Premium",
      auto_recurring: {
        frequency: month,
        frequency_type: "months",
        transaction_amount: plan,
        currency_id: "ARS"
      },
      notification_url: "",
      back_url: "https://app-musicfy.vercel.app/mercadopago",
      payer_email: email
    };
    const subscription = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });
    console.log(subscription.data);
    return subscription.data;
  }
}

module.exports = PaymentService;
