import { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default function Document() {
    return (
        <Html lang='en'>
            <Head>
                <title>Friendly Carrier</title>
                <meta
                    name='viewport'
                    content='initial-scale=1.0, width=device-width'
                />

                <script
                    async
                    src={`http://localhost:4173/widget.js?position=Right&type=Circle`}
                ></script>
                <script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
                ></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments)}
              gtag('js', new Date());
            
              gtag('config', 'G-GL9HJMLQWQ');`,
                    }}
                ></script>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
