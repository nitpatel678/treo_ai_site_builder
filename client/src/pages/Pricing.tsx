import React from "react";
import { appPlans } from "../types/assets";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import api from "@/configs/axios";

interface Plan {
  id: string;
  name: string;
  price: string;
  credits: number;
  description: string;
  features: string[];
}

const Pricing = () => {
  const {data : session} = authClient.useSession();
  const [plans] = React.useState<Plan[]>(appPlans);
   const handlePurchase = async (planId:string) => {
        try {
          if (!session?.user) {
            return toast('Please login to purchase credits')
          }
          const {data} = await api.post('api/user/purchase-credits', {planId})
          window.location.href = data.payment_link;
        } catch (error : any) {
          toast.error(error?.response?.data?.message || error.message)
          console.log(error);
        }
    }
  return (
    <>
      <div className="w-full max-w-5xl mx-auto z-20 max-md:px-4 min-h-[80vh] mb-12">
        {/* heading */}
        <div className="text-center mt-16">
          <h2 id="heading" className="text-gray-100 text-4xl font-bold">
            Choose Your Plan
          </h2>
          <p className="text-white/60 text-sm max-w-md mx-auto mt-2">
            Start for free and scale up as you grow. Find the perfect plan for
            your project.
          </p>
        </div>

        <div className="pt-14 py-4 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className="
            p-6 rounded-xl mx-auto w-full max-w-sm text-white
            bg-white/5 backdrop-blur-sm
            border border-white/10 
            shadow-sm hover:shadow-lg
            hover:border-white/20 hover:bg-white/10
            transition-all duration-300
          "
              >
                {/* plan name */}
                <h3 className="text-xl font-semibold text-white/90">
                  {plan.name}
                </h3>

                {/* price */}
                <div className="my-3">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-white/60">
                    {" "}
                    / {plan.credits} credits
                  </span>
                </div>

                {/* description */}
                <p className="text-white/60 mb-6 text-sm">{plan.description}</p>

                {/* features */}
                <ul className="space-y-2 mb-6 text-sm">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <svg
                        className="w-4 h-4 text-green-300 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-white/70">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* button */}
                <button
                  onClick={() => handlePurchase(plan.id)}
                  className="
              w-full py-2 px-4 rounded-md text-sm font-medium
              bg-white/10 hover:bg-white/15
              border border-white/10
              text-white 
              backdrop-blur-sm
              active:scale-95 transition-all
            "
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>
        <p className="mx-auto text-center text-sm max-w-md mt-10 
        text-white/60 font-light">Project <span className="text-white">Creation/Revision </span>consumes <span className="text-shadow-white">5 credits</span>. You can purchase more credits to create more projects.</p>
      </div>
    </>
  );
};

export default Pricing;
