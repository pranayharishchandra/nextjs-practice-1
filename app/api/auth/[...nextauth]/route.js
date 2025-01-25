

// boilder plate code
import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import User from '@/models/User';
import connectDB from "@/config/database";

// import { useSession, signIn, signOut } from "next-auth/react";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId    : process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Required for production
  debug: process.env.NODE_ENV === 'development', // Optional: Enable debug logs
  callbacks: {
    // Callback on successful sign-in
    async signIn({ user, account, profile }) {
      console.log("GitHub profile data:", profile);
      try {
        // Connect to the database
        await connectDB();

        // Check if user exists in the database
        let existingUser = await User.findOne({ githubId: profile.id });
        if (!existingUser) {
          console.log("Creating a new user in the database...");

          // Create new user in MongoDB
          existingUser = await User.create({
            githubId    : profile.id,
            username    : profile.login,
            name        : profile.name || "No Name",
            email       : profile.email || "No Email",
            profileImage: profile.avatar_url,
            bio         : profile.bio || "",
            location    : profile.location || "",
          });

          console.log("User created:", existingUser);
        }

        return true; // Allow the user to sign in
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false; // Deny sign-in
      }
    },

    // Session callback
    async session({ session, token }) {
      try {
        // Connect to the database
        await connectDB();

        // Find user by email
        const dbUser = await User.findOne({ email: session.user.email });

        if (dbUser) {
            // Assign additional details to the session
          session.user.id       = dbUser._id.toString();
          session.user.role     = dbUser.role;
          session.user.bio      = dbUser.bio;
          session.user.location = dbUser.location;
        }

        return session; // Return the modified session
      } catch (error) {
        console.error("Error in session callback:", error);
        return session; // Return session even if there’s an error
      }
    },

    // JWT callback for managing the token
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.githubId = profile.id;
        token.username = profile.login;
      }
      return token; // Return the updated token
    },

    // Redirect callback: Handle redirects after logout
    async redirect({ url, baseUrl }) {
      if (url === "/api/auth/signout") {
        return baseUrl; // Redirect to home page after logout
      }
      return url.startsWith(baseUrl) ? url : baseUrl; // Ensure safe redirects
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
