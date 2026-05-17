// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb"; // your MongoClient connection
 
const authOptions = {
  providers: [
    GoogleProvider({
      clientId:
        process.env.GOOGLE_CLIENT_ID ,
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET ,
    }), 
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME); // ⚠️ replace with your DB name

        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found with this email");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return user;
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      const client = await clientPromise;
      const db = client.db(process.env.DB_NAME); // ⚠️ replace with your DB name

      const existingUser = await db
        .collection("users")
        .findOne({ email: user.email });

      if (!existingUser) {
        await db.collection("users").insertOne({
          name: user.name,
          email: user.email,
          provider: account.provider,
          image: user.image || null,
          password: null, // only set for credentials signup
          createdAt: new Date(),
        });
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user?._id) {
        token.id = user._id.toString();
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
