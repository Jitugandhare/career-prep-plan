import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Navbar } from "@/components/ui/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Package, Truck, Home, ShoppingBag } from "lucide-react";
import { paymentsAPI } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const orderId = searchParams.get('order_id');
  const paymentId = searchParams.get('payment_id');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) return;

      try {
        const response = await paymentsAPI.getOrder(orderId);
        setOrderDetails(response.data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch order details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-12">
          <div className="text-muted-foreground">Loading order details...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="px-4 py-6 max-w-2xl mx-auto">
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-800">
              Payment Successful!
            </CardTitle>
            <p className="text-green-600 mt-2">
              Your order has been placed successfully
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Order Details */}
            <div className="bg-white rounded-lg p-4 border">
              <h3 className="font-semibold mb-3 flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Order Details
              </h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order ID:</span>
                  <span className="font-mono">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment ID:</span>
                  <span className="font-mono">{paymentId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-semibold">₹{(orderDetails?.amount || 0) / 100}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant="default" className="bg-green-600">
                    Paid
                  </Badge>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white rounded-lg p-4 border">
              <h3 className="font-semibold mb-3 flex items-center">
                <Truck className="w-5 h-5 mr-2" />
                Shipping Information
              </h3>
              
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">
                  Your order will be shipped within 2-3 business days.
                </p>
                <p className="text-muted-foreground">
                  You will receive tracking information via email once your order ships.
                </p>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="font-semibold mb-3 text-blue-800">What's Next?</h3>
              <div className="space-y-2 text-sm text-blue-700">
                <p>• You'll receive an order confirmation email shortly</p>
                <p>• Our team will process your order within 24 hours</p>
                <p>• Shipping updates will be sent to your email</p>
                <p>• Expected delivery: 5-7 business days</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/" className="flex-1">
                <Button className="w-full" variant="outline">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Link to="/mall" className="flex-1">
                <Button className="w-full">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>

            {/* Support Information */}
            <div className="text-center text-sm text-muted-foreground">
              <p>Need help? Contact our support team at</p>
              <p className="font-semibold">support@astroapp.com</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccess;
