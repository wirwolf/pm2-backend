const caminte = require('caminte');
const Schema  = caminte.Schema;
const mongoConfig = require('../../Config/MongoDB');
var schema  = new Schema('mongodb', mongoConfig);

module.exports = schema.define('Process', {
    pid:     { type: schema.Number },
    name:    { type: schema.String },
    interpreter: { type: schema.String },
    restart_time: {type: schema.Number},
    created_at:   { type: schema.Text },
    exec_mode:   { type: schema.Text },
    pm_uptime:   { type: schema.Number },
    status:   { type: schema.String},
    pm_id: { type: schema.Number},
    cpu: { type: schema.Number},
    memory: { type: schema.Number},
    versioning: { type: schema.Text},
    axm_monitor:   { type: schema.JSON },
});