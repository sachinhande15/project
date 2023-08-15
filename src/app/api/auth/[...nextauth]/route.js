import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "@/model/user";
import connectDB from "@/dbconnet/connection";
import bcrypt from "bcryptjs";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        connectDB(process.env.MONGO_URI);
        const { email, password } = credentials;
        console.log(email, password);
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
          throw new Error("Invalid Email or Password");
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
          throw new Error("Invalid Email or Password");
        }
        console.log(user.email);
        return {
          email: user.email,
          id: user._id,
          name: user.name,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECERET,
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
  callbacks: {
    async jwt({ token, user, session }) {
      console.log("jwt callback", { token, user, session });
      return token;
    },
    async session({ session, token, user }) {
      console.log("session callbacks", { session, token, user });
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECERET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
