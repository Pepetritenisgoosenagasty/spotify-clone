import NextAuth from "next-auth"
import SportifyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from "../../../lib/sportify"

 async function refreshAccessToken(token) {
  try {
    spotifyApi.setAccessToken(token.accessToken)
    spotifyApi.setRefreshToken(token.refreshToken)

    const {body: refreshedToken } = await spotifyApi.refreshAccessToken();
    console.log('Refreshed Token is' + refreshedToken)

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, // = 1 hour as 3600 returns from spotifyAPi,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken
    }

  } catch (error) {
    console.log(error)
   
    return {
      ...token,
      error: 'RefreshAccessTokenError'
    }

  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SportifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login'
  },

  callbacks: {
    async jwt({ token, account, user}) {

      // initial signIn
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
        }
      }

      // Return token if not expired
      if (Date.now() < token.accessTokenExpires) {
        console.log('Existing access token is valid')
        return token;
      }

      // Access token expired, we need to refresh
      console.log('Token has expired, refreshing...')
      return await refreshAccessToken(token)
    },

    async session({ session, token}) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    }
  }
})