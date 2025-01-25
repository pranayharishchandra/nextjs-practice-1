

// boilder plate code
import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import User from '@/models/User';
import connectDB from "@/config/database";

// import { useSession, signIn, signOut } from "next-auth/react";

export const authOptions = {
  providers: [
    // GoogleProvider({
    //   clientId    : process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    GitHubProvider({
      clientId    : process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Required for production
  debug: true, //* optional // Enable debug logs
  // callbacks: {
  //   // Invoked on successful signin
  //   async signIn({ profile }) {
  //     console.log("Profile from GitHub:", profile);
      
  //     // 1. Connect to database
  //     await connectDB();
      
  //     // 2. Check if user exists
  //     const userExists = await User.findOne({ email: profile.email });
  //     console.log("User exists:", userExists);
      
  //     // 3. If not, then add user to database
  //     if (!userExists) {
  //       const username = profile.name.slice(0, 20);
  //       console.log("Creating new user with email:", profile.email);
  
  //       const newUser = await User.create({
  //         email: profile.email,
  //         username,
  //         image: profile.picture,
  //       });
  //       console.log("User created:", newUser);
  //     }
      
  //     // 4. Return true to allow sign in
  //     return true;
  //   },
  //   // Modifies the session object
  //   async session({ session }) {
  //     // 1. Get user from database
  //     const user = await User.findOne({ email: session.user.email });
  //     // 2. Assign the user id to the session
  //     session.user.id = user._id.toString();
  //     // 3. return session
  //     return session;
  //   },
  // },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
