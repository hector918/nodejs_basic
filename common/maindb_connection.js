const mongoose = require('mongoose');
const maindb_conn = mongoose.createConnection('mongodb://localhost/mevnStack',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    'useFindAndModify': false,
    'useCreateIndex': true,
    keepAlive: 120,
  }
)
maindb_conn.on('open', () => {
  console.log('[DB] main Mongodb is Connected. have a nice day.');
})
maindb_conn.on('err', (err) => {
	console.log('err:' + err);
})

module.exports = maindb_conn; //commonJs 语法，导出conn模块。