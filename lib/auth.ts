import NextAuth from "next-auth"
import Cognito from "next-auth/providers/cognito"
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Cognito],
  callbacks: {
    async jwt({ token,account }) {
      // console.log("jwt", { token, account, user, profile, session, trigger })
      if (account) {
        token.accessToken = account.access_token
        token.id_token = account.id_token
      }
      return token
    },
    async session({ session, token }) {
      // console.log("session", { session, token, user,newSession })
      session.id_token=token.id_token  as string
      return session
    },
    // async signIn({account,user,credentials,email,profile}) {
    //   console.log("signIn", { account, user, credentials, email, profile })
    //   return true
    // },
  },
  // events: {
  //   async signIn({ account, user, isNewUser }) {
  //     console.log("signIn", { account, user, isNewUser })
  //   },
  //   async signOut(token) {
  //     console.log("signOut", { token })
  //   },
  //   async createUser({ user }) {
  //     console.log("createUser", { user })
  //   },
  //   async updateUser({ user }) {
  //     console.log("updateUser", { user })
  //   },
  //   async linkAccount({ account, user }) {
  //     console.log("linkAccount", { account, user })
  //   },
  //   async session({ session, token, }) {
  //     console.log("session", { session, token })
  //   },
  // },
})