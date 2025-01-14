import { apiService } from "./apiService";

interface CreateOrderData {
  amount: number;
  customer_details: {
    name: string;
    email: string;
  };
}
interface CreateOrderResponse {
  amount: number;
  amount_due: number;
  amount_paid: number;
  attempts: number;
  created_at: number;
  currency: string;
  entity: string;
  id: string;
  notes: any;
  offer_id: string | null;
  orderId: string;
  receipt: string;
  status: string;
}

class PaymentService {
  static async createOrder(
    data: CreateOrderData
  ): Promise<CreateOrderResponse> {
    return apiService.post("/create-order", data);
  }
}
export default PaymentService;
