const {MongoClient} = require('mongodb');
// 定义类
class mongo_encap {
    //构造函数
    constructor(dbUrl,dbName) {
        this.dbUrl = dbUrl;
        this.client = new MongoClient(dbUrl, { useUnifiedTopology: true });
        this.client.connect();
        this.dbName = dbName;
    }
    //类中函数
    async connect(){
        await this.client.connect();
    };
    async listDatabases() {
        try {
            let databasesList = await this.client.db().admin().listDatabases();
            console.log("Databases:");
            databasesList.databases.forEach(db => console.log(` - ${db.name}`));    
        } catch (error) {
            this.handleerror(error);
        }    
        
    };
    async findOne(collection,condition){
        const col = await this.client.db(this.dbName).collection(collection);
        return await col.findOne(condition);
    };
    handleerror(err)
    {
        console.log(`error - ${err}`);
        this.client.close();
        this.client.connect();
    };
    //静态函数
    async sayHello(name){
        //修改静态变量
        this.para = name;
        return 'Hello, ' + name;
    };
}


module.exports = {
    mongo_encap : mongo_encap
};