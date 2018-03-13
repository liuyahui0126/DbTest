var mysql = require('mysql');
const db = {
    host : 'localhost',
    user : 'root',
    password: '970126.',
    port: '3306',
    database: 'test'
}
let connect = mysql.createConnection(db);

//开始连接数据库
connect.connect(function(err){
    if(err){
        console.log('mysql连接失败： ${err}!');
    }else{
        console.log('mysql连接成功')
    }
});

//基本查询语句
let sqlQuery = "select * from user";
connect.query(sqlQuery,function(err,result){
    if(err){
        console.log('SQL error : ${err}');
    }else{
        console.log(result);
        closeMysql(connect);
    }
})
//查询后关闭mysql
function closeMysql(connect){
    connect.end((err) => {
        if(err){
            console.log('mysql关闭失败:${err}');
        }else{
            console.log('mysql关闭成功');
        }
    })
    //end()和destory()都可以关闭数据库
}
//数据连接失败后自动连接控制连接—次数10次  
function autoConnect(connect){  
    if(n<=10){  
        n++;  
        connect.connect(function(err){  
            if(err){  
                console.log(`mysql自动连接:${n}`);  
                setTimeout(function(){autoConnect(connect)},2000);  
            }else{  
                console.log("mysql连接成功!");  
                sqlQuery(connect);  
            }  
        });  
    }else{  
        console.log("真尽力连不上，检查其他问题吧!");  
    }  
}  