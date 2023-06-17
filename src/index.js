const express = require('express');
const PORT = 3000;

const expressConfigurator = require('./config/expressConfig');
const handlebarsConfigurator = require('./config/handlebarsConfig');
const mongooseConnect = require('./config/mongooseConfig');
const routes = require('./routes');
const { errorHandler } = require('./middlewares/errorHandlerMiddleware');

const app = express();

mongooseConnect()
    .then(() => console.log('DB is connected successfully!'))
    .catch(err => console.log(`DB error: ${err}`));

expressConfigurator(app);
handlebarsConfigurator(app);

app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`The server is running on port ${PORT}...`));