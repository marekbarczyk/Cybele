const util = require("util");
const async = require("async");
const Device = require("./Device");

const MiHygrothermographDevice = function MiHygrothermographDevice(options) {
    Device.call(this, options);
    
    this.temp;
    this.humi;
    this.batt;

    this.publishInterval = options.publishInterval !== undefined ? options.publishInterval : 60000;

    this.lastPublish = new Date(0);
};

util.inherits(MiHygrothermographDevice, Device);

MiHygrothermographDevice.prototype.initialize = function(callback) {
    async.each([
        {
            topic: "homeassistant/sensor/mihygrothermograph_" + this.id + "/" + this.id + "_battery/config",
            payload: {
                "state_topic": "cybele/mihygrothermograph/" + this.id + "/state",
                "name": this.friendlyName + " Battery",
                "unique_id": "cybele_thermometer_battery_" + this.id,
                "device_class": "battery",
                "unit_of_measurement": "%",
                "value_template": "{{ value_json.battery }}"
            }
        },
        {
            topic: "homeassistant/sensor/mihygrothermograph_" + this.id + "/" + this.id + "_temperature/config",
            payload: {
                "state_topic": "cybele/mihygrothermograph/" + this.id + "/state",
                "name": this.friendlyName + " Temperature",
                "unique_id": "cybele_mithermometer_temperature_" + this.id,
                "device_class": "temperature",
                "unit_of_measurement": "°C",
                "value_template": "{{ value_json.temperature }}"
            }
        },
        {
            topic: "homeassistant/sensor/mihygrothermograph_" + this.id + "/" + this.id + "_humidity/config",
            payload: {
                "state_topic": "cybele/mihygrothermograph/" + this.id + "/state",
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

MiHygrothermographDevice.prototype.handleAdvertisingForDevice = function(props) {
    Device.prototype.handleAdvertisingForDevice.call(this, props);
    
    if(props.ServiceData && props.ServiceData.UUID === "0000fe95-0000-1000-8000-00805f9b34fb" && Buffer.isBuffer(props.ServiceData.data) ) {
        let buf = props.ServiceData.data;
        if(buf && buf.length == 18){
            this.temp = buf.readInt16LE(14) / 10;
            this.humi = buf.readUInt16LE(16) / 10;
        }
        if(buf && buf.length == 15){
            this.batt = buf.readUInt8(14);
        }
        const now = new Date();
        if(now.getTime() - this.publishInterval > this.lastPublish.getTime()) {
            this.lastPublish = now;

            this.mqttClient.publish("cybele/mihygrothermograph/" + this.id + '/state', JSON.stringify({
                temperature: this.temp,
                humidity: this.humi,
                battery: this.batt
            }), {retain: true}, err => {
            if(err) {
                console.error(err);
            }
            })
        }
    }
};

module.exports = MiHygrothermographDevice;
// ???