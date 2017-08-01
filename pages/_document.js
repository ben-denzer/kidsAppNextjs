import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  render() {
    const sheet = new ServerStyleSheet();
    const main = sheet.collectStyles(<Main />);
    const styleTags = sheet.getStyleElement();

    return (
      <html>
        <Head>
          {styleTags}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300|Lato:400,700"
            rel="stylesheet"
          />
          <link
            rel="icon"
            href="/static/img/favicon.png"
            type="image/png"
            sizes="32x32"
          />
          <style>{`
            body {
              margin: 0;
              font-family: Lato, Arial, Helvetica, sans-serif;
            }
          `}</style>
        </Head>

        <body>
          <div className="root">
            {main}
          </div>
          <NextScript />
        </body>
      </html>
    );
  }
}
