
# Truffle Unofficial Backup Environments

In a truffle upgradable project the core files required to make the contract upgradable are build and .openzeppelin folder. Currently the issue with this is we will not be able to deploy a new copy on the same network eg test net without either upgrading the contract or removing old deployment. but results in the contract outputs not being maintained. also truffle does not have the concept of multiple environment for same network. 

The approach implemented is that a custom script in truffle-config and a support to pass options to the truffle migrate through environment variables or arguments. 

### Install

  

```

$ npm install -g truffle-backup

```

### Quick Usage

  

For a default set of contracts and tests, run the following within an empty project directory:
  

```js
const { contracts_build_directory } = require('truffle-backup')(__dirname) // pass the base directory of project;

module.exports = {
	contracts_build_directory, // Output directory of compiled artifacts and outputs 
	compilers: {
		solc: {
			version:  "0.8.4",
		},
	},
	networks: {
		development: {
			host:  "127.0.0.1", // Localhost (default: none)
			port:  8545, // Standard Ethereum port (default: none)
			network_id:  "*", // Any network (default: none)
		},
	},
}
```

From here to run the migrations with truffle-backup
`truffle migrate --env development`
Once the migrations are run the output will be created under `build/development` directory.
now let's create backup of the .openzeppelin folder as well. 
`truffle migrate --env development --backup`
This will copy the .openzeppelin folder to the `build/development` directory.
Now if you run truffle migrate for another environment your changes are still safe under this directory. 
To restore the stored backup 
`truffle migrate --env development --restore`
this will copy the `.openzeppelin` folder back to the root giving us the ability to interact with our code or perform contract upgrades. 