var Schema = {};

Schema.createSchema = function(mongoose)
{
  var PostSchema = mongoose.Schema({
        subject : {type : String},
        image : {type : String},
        user : {type : String},
        created_at: {type: Date, index: {unique: false}, 'default': new Date().getTime() + 1000 * 60 * 60 * 9},
	    looks: [{name:{type:String}}],
        star : {type : Number, 'default':0},
 });
  
    return PostSchema;
};

module.exports = Schema;