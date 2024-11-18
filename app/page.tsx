"use client";
import { useState } from "react";
import VoucherForm from "@/components/voucherForm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [userName, setUserName] = useState("defaultUser");
  const [passWord, setPassWord] = useState("");

  const handleLogin = (
    username: "defaultUser",
    password: "defaultPassword"
  ) => {
    if (username === userName && password === passWord) {
      setIsAuthenticated(true);
      setShowLoginForm(false);
    } else {
      toast.error("Invalid Credentials");
    }
  };

  if (showLoginForm) {
    return (
      <div className="flex flex-col items-center justify-center gap-16 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Card>
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
    <div className="flex flex-col items-center justify-center h-[100vh] p-4 gap-16 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="w-full overflow-x-auto h-full">
        {isAuthenticated && <VoucherForm />}
      </div>
    </div>
  );
}
