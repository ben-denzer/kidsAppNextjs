import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {

  getStatCounterCode() {
    if (process.env.NODE_ENV === 'development') {
      return { __html: '' };
    }
    return {
      __html: `
        <!-- Start of StatCounter Code for Default Guide -->
        <script type="text/javascript">
          var sc_project=11554301; 
          var sc_invisible=1; 
          var sc_security="cbe58c9c"; 
          var scJsHost = (("https:" == document.location.protocol) ?
          "https://secure." : "http://www.");
          document.write("<sc"+"ript type='text/javascript' src='" +
          scJsHost+
          "statcounter.com/counter/counter.js'></"+"script>");
        </script>
        <noscript>
          <div class="statcounter">
            <a title="Web Analytics Made Easy - StatCounter" href="http://statcounter.com/" target="_blank">
              <img class="statcounter" src="//c.statcounter.com/11554301/0/cbe58c9c/1/" alt="Web Analytics Made Easy - StatCounter">
            </a>
          </div>
        </noscript>
        <!-- End of StatCounter Code for Default Guide -->
      `
    }
  }

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
          <div dangerouslySetInnerHTML={this.getStatCounterCode()} />
        </body>
      </html>
    );
  }
}
