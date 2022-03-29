const { contracts_build_directory } = require('./index');

module.exports = {
  contracts_build_directory,
  compilers: {
    solc: {
      version: "0.8.4",
    },
  },
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
  },
}
