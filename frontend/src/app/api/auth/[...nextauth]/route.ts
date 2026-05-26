import NextAuth, { Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { SupabaseAdapter } from "@auth/supabase-adapter";


const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder",
  }),
  callbacks: {
    async session({ session, user }: { session: Session; user: User }) {
      if (session?.user) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - appending to session object
        session.user.id = user.id;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - custom appended role
        session.user.role = (user as User & { role?: string }).role; // Assuming role is in profiles table
      }
      return session;
    },
  },

};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
