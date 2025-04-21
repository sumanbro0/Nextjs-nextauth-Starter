import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {}
      },
      authorize: async ({ email, password }) => {
        const matchEmail = email === (process.env.NEXT_PUBLIC_EMAIL as string);
        const matchPassword = password === process.env.NEXT_PUBLIC_PASSWORD;

        if (!matchEmail || !matchPassword) {
          return null;
        }

        return {
          id: '1',
          name: 'Admin',
          email: email || '',
          image: 'https://avatar.tobi.sh/jane'
        };
      }
    })
  ]
});
