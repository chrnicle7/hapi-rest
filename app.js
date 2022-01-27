const Hapi = require("@hapi/hapi");
const db = require("./config/database/postgres");
const routes = require("./routes/index");

const server = Hapi.server({
    port: 3000, 
    host: "localhost",
});

const init = async () => {
    server.route({
        method: "GET",
        path: "/",
        handler: function (req, h) {
            return "Hello, world!";
        }
    });

    server.route(routes);

    await server.start();
    console.log(`Server running on port : ${server.info.uri}`);
}

process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
});

init();


module.exports = server;