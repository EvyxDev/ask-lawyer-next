"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Define TypeScript interface for a plan
interface Plan {
  name: string;
  price: string;
  period: string;
  features: string[];
  recommended: boolean;
}

const plans: Plan[] = [
  {
    name: "Basic",
    price: "$9",
    period: "/month",
    features: ["Access to core features", "5 projects", "Email support"],
    recommended: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    features: [
      "All Basic features",
      "Unlimited projects",
      "Priority email support",
    ],
    recommended: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    features: ["All Pro features", "Dedicated support", "50GB storage"],
    recommended: false,
  },
];

const Page: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setOpen(true);
  };

  const handleConfirm = () => {
    console.log(`Confirmed plan: ${selectedPlan?.name}`);
    setOpen(false);
    setSelectedPlan(null);
  };

  return (
    <div className="min-h-screen  flex items-center justify-center lg:p-6 md:p-4 p-3">
      <div className=" mx-auto text-center w-full">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Choose the Perfect Plan
        </h1>
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Unlock the full potential of our platform with a plan tailored to your
          needs.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-12 2xl:gap-8 xl:gap-6 gap-4">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`col-span-4 relative bg-[#F5F5F5] flex flex-col bg-gradient-to-br  border-0 shadow-xl rounded-4xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                plan.recommended ? "ring-2 bg-secondary !text-white" : ""
              }`}
            >
              <CardHeader className=" py-4">
                <CardTitle
                  className={`text-2xl font-bold  ${
                    plan.recommended ? "text-white" : "text-gray-900"
                  }`}
                >
                  {plan.name}
                </CardTitle>
                <div className="flex items-baseline mt-3">
                  <span
                    className={`text-4xl font-extrabold text-center ${
                      plan.recommended ? "text-primary" : "text-gray-900"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-lg mx-2  ${
                      plan.recommended ? "text-primary" : "text-gray-900"
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow md:px-6 px-4 py-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-white text-base my-3"
                    >
                      <Check className="lg:h-8 lg:w-8 h-6 w-6 bg-primary p-2 rounded-full md:mx-2 mx-1 flex-shrink-0" />
                      <span className={`md:text-lg text-md md:mx-2 mx-1  ${
                      plan.recommended ? "text-white" : "text-gray-900"
                    }`}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-4 flex items-center justify-center">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger  asChild>
                    <Button
                      className={`lg:w-44 md:w-40 w-36 text-lg font-semibold md:py-7 py-6 rounded-lg transition-all duration-200 ${
                        plan.recommended
                          ? "bg-white  text-secondary"
                          : "bg-gray-800 hover:bg-gray-900 text-white"
                      }`}
                      onClick={() => handleSelectPlan(plan)}
                    >
                      Select Plan
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-lg bg-white">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">
                        Confirm Your Plan
                      </DialogTitle>
                      <DialogDescription className="text-gray-600 mt-2">
                        Are you sure you want to select the{" "}
                        <span className="font-semibold">
                          {selectedPlan?.name}
                        </span>{" "}
                        plan for{" "}
                        <span className="font-semibold">
                          {selectedPlan?.price}
                          {selectedPlan?.period}
                        </span>
                        ?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-6">
                      <Button
                        variant="outline"
                        className=" hover:bg-gray-100"
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button className=" text-white" onClick={handleConfirm}>
                        Confirm
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
