const MyToken = artifacts.require("MyToken");
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

module.exports = async function (deployer) {
    const instance = await deployProxy(MyToken, [], { deployer });
    console.log('Deployed', instance.address);
};