/*
The django-vue connection approach of which this configuration is part of was made 
popular by Ejez and EugeneDae. You can find more information about them here:
https://github.com/django-webpack/django-webpack-loader/issues/209#issue-512863855
https://github.com/EugeneDae/django-vue-cli-webpack-demo
I however decided to simplify things a little by avoiding template inheritance 
on Django's side, as this is not needed in our scenario and, I believe, in most
such cases.
Note: please remember you will also need to properly configure your Django 
backend for this setup to work as expected both in development and production.
Settings Options:
https://cli.vuejs.org/config/
https://v4.webpack.js.org/configuration/dev-server/
*/

module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/static/dist/"
      : "http://127.0.0.1:8080",
  outputDir: "../static/dist",
  indexPath: "../../templates/index.html",
  pages: {
    index: {
      entry: "src/main.js",
      title: "QuestionTime",
    },
  },
  chainWebpack: (config) => {
    /*
        The arrow function in writeToDisk(...) tells the dev server to write
        only index.html to the disk.
        The indexPath option (see above) instructs Webpack to also rename
        index.html to base-vue.html and save it to Django templates folder.
        We don't need other assets on the disk (CSS, JS...) - the dev server
        can serve them from memory.
        See also:
        https://cli.vuejs.org/config/#indexpath
        https://webpack.js.org/configuration/dev-server/#devserverwritetodisk-
        */
    config.devServer
      .public("http://127.0.0.1:8080")
      .hotOnly(true)
      .headers({ "Access-Control-Allow-Origin": "*" })
      .writeToDisk((filePath) => filePath.endsWith("index.html"));
  },
};
