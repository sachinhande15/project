import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { findUser } from "@/Services/UserServices";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;
        const userExist = await findUser({ email });
        if (!userExist) {
          throw new Error("Incorrect Email or Password");
        }
        const isPasswordMatched = await bcrypt.compare(
          password,
          userExist.password
        );
        if (!isPasswordMatched) {
          throw new Error("Incorrect Password");
        }
        console.log(userExist.email);
        return {
          email: userExist.email,
          id: userExist._id,
          name: userExist.name,
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
    async jwt({ token, user }) {
      //console.log("jwt callback", { token });
      let email = token.email;
      user = await findUser({ email });
      token = { ...token, name: user.name };
      return token;
    },
    async session({ session, token, user }) {
      //console.log("session callbacks", { session, token });
      session = { ...session, id: token.id };
      console.log(session);
      return session;
    },
    // async signIn({ profile }) {
    //   try {
    //     const userExist = await findUserByEmail(profile?.email);
    //     if (!userExist) {
    //       const newUser = new User({
    //         name: profile.name,
    //         email,
    //       });
    //       await User.create(newUser);
    //       return true;
    //     }
    //   } catch (error) {
    //     console.log(error);
    //     return false;
    //   }
    // },
  },
  secret: process.env.NEXTAUTH_SECERET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
