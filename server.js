//add modules in nodejs app
var express=require("express");
var bodyParser=require("body-parser");
var cors=require("cors");

//create app
var app=express();
app.use(bodyParser.json());
app.use(cors());

var nodeadmin=require("nodeadmin");
app.use(nodeadmin(app));

//include sequalize
var Sequelize=require("sequelize");

//sequelize connexion
var sequelize=new Sequelize('djDB','lavinia_stan','',{
    dialect:'mysql',
    host:'127.0.0.1',
    port:'3306'
});
//define News entity
var News=sequelize.define('news',{
    title:{
        type:Sequelize.STRING,
        field:'title'
    },
    date:{
        type:Sequelize.STRING,
        field:'date'
    },
    text:{
        type:Sequelize.STRING,
        field:'text'
    },
    /*,id_author:{
        type:Sequelize.INTEGER,
        field:'id_author'
    },*/
    type:{
        type:Sequelize.INTEGER,
        fiels:'id_type'
    }

},{
    timestamps: false
});

var Author=sequelize.define('authors',{
    fname:{
        type:Sequelize.STRING,
        field:'fname'
    },
    lname:{
        type:Sequelize.STRING,
        field:'lname'
    },
     email:{
        type:Sequelize.STRING,
        field:'email'
    }
},{
    timestamps: false
});


var Top=sequelize.define('tops',{
    artist:{
         type:Sequelize.STRING,
         field:'artist'
    },
    title:{
         type:Sequelize.STRING,
         field:'title'
    },
    number:{
         type:Sequelize.INTEGER,
         field:'number'
    }
},{
    timestamps: false
});

//crud operations: 

//create
app.post('/news',function(request,response){
    News.create(request.body).then(function(news){
        News.findById(news.id).then(function(news){
            response.status(201).send(news);
        });
    });
});

//read all
app.get('/news',function(request,response){
    News.findAll().then(function(news){
        response.status(200).send(news);
    });
});

//read one by id
app.get('/news/:id',function(request,response){
    News.findById(request.params.id).then(function(news){
        if(news){
            response.status(200).send(news);
        } else {
            response.status(404).send();
        }
    });
});

//update
app.put('/news/:id',function(request,response){
    News.findById(request.params.id).then(function(news){
        if(news){
            news.updateAttributes(request.body).then(function(){
                response.status(200).send('updated');
            }).catch(function(error){
                console.warn(error);
                response.status(500).send('server error');
            });
        } else {
            response.status(404).send();
        }
    });
});

//delete
app.delete('/news/:id',function(request,response){
    News.findById(request.params.id).then(function(news){
        if(news){
            news.destroy().then(function(){
                response.status(204).send();
            }).catch(function(error){
                console.warn(error);
                response.status(500).send('server error');
            });
        } else {
            response.status(404).send();
        }
    });
});

//tops

//create
app.post('/tops',function(request,response){
    News.create(request.body).then(function(tops){
        News.findById(tops.id).then(function(tops){
            response.status(201).send(tops);
        });
    });
});

//read all
app.get('/tops',function(request,response){
    News.findAll().then(function(tops){
        response.status(200).send(tops);
    });
});

//read one by id
app.get('/tops/:id',function(request,response){
    News.findById(request.params.id).then(function(tops){
        if(tops){
            response.status(200).send(tops);
        } else {
            response.status(404).send();
        }
    });
});

//update
app.put('/tops/:id',function(request,response){
    News.findById(request.params.id).then(function(tops){
        if(tops){
            tops.updateAttributes(request.body).then(function(){
                response.status(200).send('updated');
            }).catch(function(error){
                console.warn(error);
                response.status(500).send('server error');
            });
        } else {
            response.status(404).send();
        }
    });
});

//delete
app.delete('/tops/:id',function(request,response){
    News.findById(request.params.id).then(function(tops){
        if(tops){
            tops.destroy().then(function(){
                response.status(204).send();
            }).catch(function(error){
                console.warn(error);
                response.status(500).send('server error');
            });
        } else {
            response.status(404).send();
        }
    });
});


//authors:
//create
app.post('/authors',function(request,response){
    News.create(request.body).then(function(authors){
        News.findById(authors.id).then(function(authors){
            response.status(201).send(authors);
        });
    });
});

//read all
app.get('/authors',function(request,response){
    News.findAll().then(function(authors){
        response.status(200).send(authors);
    });
});

//read one by id
app.get('/authors/:id',function(request,response){
    News.findById(request.params.id).then(function(authors){
        if(authors){
            response.status(200).send(authors);
        } else {
            response.status(404).send();
        }
    });
});

//update
app.put('/authors/:id',function(request,response){
    News.findById(request.params.id).then(function(authors){
        if(authors){
            authors.updateAttributes(request.body).then(function(){
                response.status(200).send('updated');
            }).catch(function(error){
                console.warn(error);
                response.status(500).send('server error');
            });
        } else {
            response.status(404).send();
        }
    });
});

//delete
app.delete('/authors/:id',function(request,response){
    News.findById(request.params.id).then(function(authors){
        if(authors){
            authors.destroy().then(function(){
                response.status(204).send();
            }).catch(function(error){
                console.warn(error);
                response.status(500).send('server error');
            });
        } else {
            response.status(404).send();
        }
    });
});

app.use('/admin',express.static('admin'));
app.listen(process.env.PORT);

