import nextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: "abcdefgh123",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        id: {},
        email: {},
        name: {},
        token: {},
        role: {},
      },
      async authorize(credentials) {
        // Return null if user data could not be retrieved
        if (!credentials) {
          return null;
        }

        const { id, email, name, token, role } = credentials;

        return { id, email, name, token, role };
      },
    }),
  ],
  callbacks: {
    async signIn() {
      return true;
    },
    async jwt({ token, user }: any) {
      // Persist the OAuth access_token to the token right after signin
      if (user) {
        token.accessToken = user.token;
        token.name = user.name;
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session && token) {
        session.accessToken = token.accessToken;
        session.name = token.name;
        session.role = token.role;
        session.id = token.id as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl)
        ? Promise.resolve(url)
        : Promise.resolve(baseUrl);
    },
  },
};

const handler = nextAuth(authOptions);
export { handler as GET, handler as POST };
