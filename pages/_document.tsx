import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,600&family=Roboto+Serif:opsz,wght@8..144,200;8..144,400&display=swap" rel="stylesheet" />
          {/* <link
            href='https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,600&display=swap'
            rel='stylesheet'
          />
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,600&display=swap" rel="stylesheet"></link> */}
          {/* <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,600&family=Roboto+Serif:opsz,wght@8..144,200&display=swap" rel="stylesheet"></link> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
