const util = require("util");
const async = require("async");
const Device = require("./Device");

const MiThermometerDevice = function MiThermometerDevice(options) {
    Device.call(this, options);
};

util.inherits(MiThermometerDevice, Device);

MiThermometerDevice.prototype.initialize = function(callback) {
    async.each([
        {
            topic: "homeassistant/sensor/mithermometer_" + this.id + "/" + this.id + "_battery/config",
            payload: {
                "state_topic": "cybele/mithermometer/" + this.id + "/state",
                "name": this.friendlyName + " Battery",
                "unique_id": "cybele_thermometer_battery_" + this.id,
                "device_class": "battery",
                "unit_of_measurement": "%",
                "value_template": "{{ value_json.battery }}"
            }
        },
        {
            topic: "homeassistant/sensor/mithermometer_" + this.id + "/" + this.id + "_temperature/config",
            payload: {
                "state_topic": "cybele/mithermometer/" + this.id + "/state",
                "name": this.friendlyName + " Temperature",
                "unique_id": "cybele_mithermometer_temperature_" + this.id,
                "device_class": "temperature",
                "unit_of_measurement": "°C",
                "value_template": "{{ value_json.temperature }}"
            }
        },
        {
            topic: "homeassistant/sensor/mithermometer_" + this.id + "/" + this.id + "_humidity/config",
            payload: {
                "state_topic": "cybele/mithermometer/" + this.id + "/state",
                "name": this.friendlyName + " Humidity",
                "unique_id": "cybele_mithermometer_humidity_" + this.id,
                "device_class": "humidity",
                "unit_of_measurement": "%",
                "value_template": "{{ value_json.humidity }}"
            }
        }
    ], (autoconfigEntry, done) => {
        this.mqttClient.publish(
            autoconfigEntry.topic,
            JSON.stringify(autoconfigEntry.payload),
            {retain: true},
            err => {
                done(err);
        });
    }, err => {
        callback(err);
    });
};

MiThermometerDevice.prototype.handleAdvertisingForDevice = function(props) {
    Device.prototype.handleAdvertisingForDevice.call(this, props);
};

module.exports = MiThermometerDevice;
