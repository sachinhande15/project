import Form from "@/components/Form";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
export const metadata = {
  title: "Login",
};
export default async function Login() {
  const session = await getServerSession(authOptions);
  if (session) return redirect("/dashboard");
  return (
    <div>
      <Form></Form>
    </div>
  );
}
