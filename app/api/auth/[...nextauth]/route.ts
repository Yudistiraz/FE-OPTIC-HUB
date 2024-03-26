import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        id: {},
        shortId: {},
        name: {},
        email: {},
        role: {},
        token: {},
      },
      async authorize(credentials) {
        // Return null if user data could not be retrieved
        if (!credentials) {
          return null;
        }

        const { id, shortId, name, email, role, token } = credentials;

        return { id, shortId, name, email, role, token };
      },
    }),
  ],
  callbacks: {
    async signIn() {
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      // Persist the OAuth access_token to the token right after signin
      if (trigger === "update") {
        return { ...token, ...session.user };
      }

      if (user) {
        token.accessToken = user.token;
        token.id = user.id;
        token.shortId = user.shortId;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session && token) {
        session.accessToken = token.accessToken;
        session.user.id = token.id;
        session.user.shortId = token.shortId;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl)
        ? Promise.resolve(url)
        : Promise.resolve(baseUrl);
    },
  },
});

export { handler as GET, handler as POST };
