import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import User from '@/models/User';
import connectDB from "@/config/database";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId    : process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId    : process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret   : process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await connectDB();

        let existingUser;

        if (account.provider === "github") {
            // GitHub-specific logic
          existingUser = await User.findOne({ githubId: profile.id });

          if (!existingUser) {
            console.log("Creating a new GitHub user...");
            existingUser = await User.create({
              githubId    : profile.id,
              username    : profile.login,
              name        : profile.name || "No Name",
              email       : profile.email || "No Email",
              profileImage: profile.avatar_url || "",
              bio         : profile.bio || "",
              location    : profile.location || "",
            });
          }
        } 
        else if (account.provider === "google") {
            // Google-specific logic
          existingUser = await User.findOne({ email: profile.email });

          if (!existingUser) {
            console.log("Creating a new Google user...");
            existingUser = await User.create({
              googleId    : profile.sub,                   // Use 'sub' for Google ID
              name        : profile.name || "No Name",
              email       : profile.email || "No Email",
              profileImage: profile.picture || "",
            });
          }
        }

        return true;  // Allow the user to sign in
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;  // Deny sign-in on error
      }
    },

    async session({ session, token }) {
      try {
        await connectDB();

        const dbUser = await User.findOne({ email: session.user.email });

        if (dbUser) {
          session.user.id       = dbUser._id.toString();
          session.user.role     = dbUser.role;
          session.user.bio      = dbUser.bio || "";
          session.user.location = dbUser.location || "";
        }

        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
    },

    async jwt({ token, account, profile }) {
      if (account && profile) {
        if (account.provider === "github") {
          token.githubId = profile.id;
          token.username = profile.login;
        } else if (account.provider === "google") {
          token.googleId = profile.sub;
        }
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };



  // // boilder plate code
  // import NextAuth from "next-auth";
  // import GoogleProvider from "next-auth/providers/google";
  // import GitHubProvider from "next-auth/providers/github";
  // import User from '@/models/User';
  // import connectDB from "@/config/database";

  // // import { useSession, signIn, signOut } from "next-auth/react";

  // export const authOptions = {
  //   providers: [
  //     GitHubProvider({
  //       clientId    : process.env.GITHUB_CLIENT_ID,
  //       clientSecret: process.env.GITHUB_CLIENT_SECRET,
  //     }),
  //     GoogleProvider({
  //       clientId    : process.env.GOOGLE_CLIENT_ID,
  //       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  //     }),
  //   ],
  //   secret: process.env.NEXTAUTH_SECRET,           // Required for production
  //   debug: process.env.NODE_ENV === 'development', //! Optional: Enable debug logs
  //   callbacks: {
  //     // Callback on successful sign-in
  //     async signIn({ user, account, profile }) {
  //       //! console.log("GitHub profile data:", profile); // uncomment to see what data you are recieving
  //       try {
  //         // Connect to the database
  //         await connectDB();

  //         // Check if user exists in the database
  //         let existingUser = await User.findOne({ githubId: profile.id });

  //         if (!existingUser) {
  //           console.log("Creating a new user in the database...");
  //           // Create new user in MongoDB
  //           existingUser = await User.create({
  //             githubId    : profile.id,
  //             username    : profile.login,
  //             name        : profile.name  || "No Name",  
  //             email       : profile.email || "No Email",
  //             profileImage: profile.avatar_url,
  //             bio         : profile.bio      || "",         // 
  //             location    : profile.location || "",        // 
  //           });
  //           console.log("User created: \n", existingUser);
  //         }

          
  //         return true; //* Allow the user to sign in
  //       } catch (error) {
  //         console.error("Error in signIn callback:", error);
  //         return false; //* Deny sign-in
  //       }
  //     },

  //     // Session callback
  //     async session({ session, token }) {
  //       try {
  //         // Connect to the database
  //         await connectDB();

  //         //* Find user by email - (info we had saved in DB during signIn)
  //         const dbUser = await User.findOne({ email: session.user.email });

  //         console.log("session user======================= \n", session.user)
  // /*
  // session user object - (jo pehle se milta h humko user k login krne pr)
  //  {
  //   name: 'PRANAY HARISHCHANDRA',
  //   email: 'pranayharishchandra@gmail.com',
  //   image: 'https://avatars.githubusercontent.com/u/44168141?v=4'
  // }
  // */

  //         // ab uss object me kuch aur chize bhi loggedin user k baare me add kr dete h
  //         if (dbUser) {
  //           //* Assign additional details to the session
  //           session.user.id       = dbUser._id.toString();
  //           session.user.role     = dbUser.role;
  //           session.user.bio      = dbUser.bio;
  //           session.user.location = dbUser.location;
  //         }

  //         return session; // Return the modified session
  //       } catch (error) {
  //         console.error("Error in session callback:", error);
  //         return session; // Return session even if there’s an error
  //       }
  //     },

  //     // JWT callback for managing the token
  //     async jwt({ token, account, profile }) {
  //       if (account && profile) {
  //         token.githubId = profile.id;
  //         token.username = profile.login;
  //       }
  //       console.log("token======================= \n", token)
  // /*
  // * Token object - after account an profile
  //  {
  // >  name    : 'PRANAY HARISHCHANDRA',
  // >  email   : 'pranayharishchandra@gmail.com',
  // >  picture : 'https://avatars.githubusercontent.com/u/44168141?v=4',
  //   sub     : '44168141',
  // >  githubId: 44168141,
  // >  username: 'pranayharishchandra',
  //   iat     : 1737935129,
  //   exp     : 1740527129,
  //   jti     : 'ca648888-bc4a-41ab-bd2c-09ddf636d833'
  // } */
  //       return token; // Return the updated token
  //     },

  //     // Redirect callback: Handle redirects after logout
  //     async redirect({ url, baseUrl }) {
  //       if (url === "/api/auth/signout") {
  //         return baseUrl; //* Redirect to home page after logout 
  //       }
  //       return url.startsWith(baseUrl) ? url : baseUrl; // Ensure safe redirects
  //     },
  //   },
  // };

  // const handler = NextAuth(authOptions);
  // export { handler as GET, handler as POST };

