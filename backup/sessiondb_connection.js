
const mongoose = require('mongoose');
const sessiondb_conn = mongoose.createConnection(
  'mongodb://localhost/mevnStack',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    'useFindAndModify': false,
    'useCreateIndex': true,
    keepAlive: 120,
   }
)
sessiondb_conn.on('open', () => {
	console.log('[DB] log Mongodb is Connected. have a nice day.');
})
sessiondb_conn.on('err', (err) => {
	console.log('err:' + err);
})

module.exports = sessiondb_conn; //commonJs 语法，导出conn模块。