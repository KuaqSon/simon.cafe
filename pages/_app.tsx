import 'styles/globals.scss';
import { GetServerSidePropsContext } from 'next';
import React, { useState } from 'react';
import { AppProps } from 'next/app';
import { getCookie, setCookie } from 'cookies-next';
import Head from 'next/head';
import { MantineProvider, ColorScheme, ColorSchemeProvider, MantineThemeOverride } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import AuthProvider from 'components/auth-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { customTheme } from 'src/utils/theme';

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [queryClient] = React.useState(() => new QueryClient());
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  return (
    <>
      <Head>
        <title>Simon Cafe | nqson</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <script
          async
          defer
          data-website-id="73377e06-2f4b-4d85-9477-fb4f3ac3e984"
          src="https://umami.nqson.com/umami.js"
        />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          theme={{ ...customTheme, colorScheme } as MantineThemeOverride}
          withGlobalStyles
          withNormalizeCSS
        >
          <NotificationsProvider position="top-right">
            <AuthProvider>
              <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
              </QueryClientProvider>
            </AuthProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});
