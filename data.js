var addData=function(database,subject,user,image,callback)
{
    
    var data = new database.Drawdata({"subject":subject,"user":user,"image":image});
    data.save(function(err){
        
        if(err)
            {
                callback(err,null);
                return;
                
            }
        console.log('데이터 추가');
        callback(null,data);
    });
    
}

module.exports.addData=addData;