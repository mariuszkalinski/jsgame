const context = require.context('./app', true, /\.spec\.js/);

require.context('./app', true, /\.spec\.js/).keys().forEach(context);
