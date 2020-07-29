const util = require("util");
const Device = require("./Device");

const MiThermometerDevice = function MiThermometerDevice(options) {
    Device.call(this, options);

};

util.inherits(MiThermometerDevice, Device);

MiThermometerDevice.prototype.initialize = function(callback) {
  callback();
};

MiThermometerDevice.prototype.handleAdvertisingForDevice = function(props) {
    Device.prototype.handleAdvertisingForDevice.call(this, props);
};

module.exports = MiThermometerDevice;
