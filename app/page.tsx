"use client";
import { useState } from "react";
import VoucherForm from "@/components/voucherForm";
import ApiResponseAlert from "@/components/apiResponseAlert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";

export default function Home() {
  const [apiResponse, setApiResponse] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [userName, setUserName] = useState("defaultUser");
  const [passWord, setPassWord] = useState("");

  const handleLogin = (username:"defaultUser", password:"defaultPassword") => {
    if (username === userName && password === passWord) {
      setIsAuthenticated(true);
      setShowLoginForm(false);
    } else {
      toast.error("Invalid Credentials");
    }
  };

  if (showLoginForm) {
     return (
       <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
         <Card className="w-96">
           <CardHeader>
             <CardTitle className="text-center">Login</CardTitle>
           </CardHeader>
           <CardContent>
             <form className="flex flex-col gap-8">
               <Input
                 type="text"
                 placeholder="Username"
                 onChange={(e) => setUserName(e.target.value)}
                 className="h-12 border-none bg-transparent"
               />
               <Input
                 type="password"
                 placeholder="Password"
                 onChange={(e) => setPassWord(e.target.value)}
                 className="h-12 border-none"
               />
               <Button
                 type="submit"
                 variant={"outline"}
                 onClick={() => handleLogin("defaultUser", "defaultPassword")}
               >
                 Login
               </Button>
             </form>
           </CardContent>
         </Card>
       </div>
     );
  }

  return (
    <div className="flex flex-col items-center justify-center h-[89vh] p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <VoucherForm />
      {apiResponse && <ApiResponseAlert response={apiResponse} title={"Response from the cloud"} variant={"default"} />}
    </div>
  );
}
