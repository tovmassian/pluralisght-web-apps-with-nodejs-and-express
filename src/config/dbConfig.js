const config = {
    host: 'localhost',
    user: 'library',
    password: 'Lib#666!',
    server: 'pl-node-library.database.windows.net', // You can use 'pl-node-library.database.windows.net\\instance' to connect to named instance
    database: 'pl_node_library',

    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
};

module.exports = config;