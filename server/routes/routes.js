var db = require('../database');
var uuid = require('node-uuid');

console.log(uuid.v1());

module.exports = function (app,io) {

    io.on('connection', function(socket) {
        console.log("A web client connected, id: " + socket.id);
    });


    app.get('/parents', function (req, res) {
        var cypherQuery = "match (p:Parent) return p.id as id, p.name as name, p.email as email";
        db.query(cypherQuery, {}, function (error, results) {
            if (error) {
                res.send(error);
            } else {
                res.json(results);
            }
        });
    });

    app.get('/parents/:id', function (req, res) {
        var cypherQuery = "match (p:Parent {id:{id}}) return p.id as id, p.name as name, p.email as email";
        db.query(cypherQuery, {id: req.params.id}, function (error, results) {
            if (error) {
                res.send(error);
            } else {
                res.json(results);
            }
        });
    });

    app.post('/parents', function (req, res) {
        var newParent = {
            id: uuid.v1(),
            name: req.body.name,
            email: req.body.email
        }

        var cypherQuery = "create (p:Parent {id:{id}, name:{name}, email:{email}}) return p.id as id, p.name as name, p.email as email";
        db.query(cypherQuery, newParent, function (error, results) {
            if (error) {
                res.send(error);
            } else {
                res.json(results[0]);
            }
        });
    });

    app.delete('/parents/:id', function (req, res) {
        var cypherQuery = "match (p:Parent {id:{id}}) delete p";
        db.query(cypherQuery, {id: req.params.id}, function (error) {
            if (error) {
                res.send(error);
            } else {
                res.json({id: req.params.id, deleted: true});
            }
        });
    });

    app.put('/parents/:id', function (req, res) {
        var cypherQuery = "match (p:Parent {id:{id}}) set p.name={name}, p.email={email} return p.id as id, p.name as name, p.email as email";
        var params = {
            id: req.params.id,
            name: req.body.name,
            email: req.body.email
        };
        db.query(cypherQuery, params, function (error, results) {
            if (error) {
                res.send(error);
            } else {
                res.json(results[0]);
            }
        });
    });

    app.post('/teachers/:teacherId/schemas', function (req, res) {
        var newSchema = {
            id: uuid.v1(),
            name: req.body.name,
            teacherId: req.params.teacherId
        };

        var cypherQuery = "match (t:Teacher {id:{teacherId}}) create (s:Schema {id:{id}, name:{name}})<-[:responsible]-(t) return s.id as id, s.name as name";
        db.query(cypherQuery, newSchema, function (error, results) {
            if (error) {
                res.send(error);
            } else {
                res.json(results[0]);
            }
        });
    });

    app.get('/schemas/:id', function (req, res) {
        var cypherQuery = "match (s:Schema {id:{id}}) return s.id as id, s.name as name";
        db.query(cypherQuery, {id: req.params.id}, function (error, results) {
            if (error) {
                res.send(error);
            } else {
                res.json(results[0]);
            }
        });
    });

    app.get('/schemas', function (req, res) {
        var cypherQuery = "match (s:Schema) return s.id as id, s.name as name";
        db.query(cypherQuery, {}, function (error, results) {
            if (error) {
                res.send(error);
            } else {
                res.json(results);
            }
        });
    });

    app.get('/teachers/:teacherId/schemas', function (req, res) {
        var cypherQuery = "match (s:Schema)<-[:responsible]-(t:Teacher {id:{teacherId}}) return s.id as id, s.name as name";
        db.query(cypherQuery, {teacherId: req.params.teacherId}, function (error, results) {
            if (error) {
                res.send(error);
            } else {
                res.json(results);
            }
        });
    });

    app.get('/teachers/', function (req, res) {
        var cypherQuery = "match (t:Teacher)-[:worksAt]->(s:School) return t.id as id, t.name as name, s.name as worksAt";
        db.query(cypherQuery, {}, function (error, results) {
            if (error) {
                res.send(error);
            } else {
                res.json(results);
            }
        });
    });

    app.delete('/teachers/:teacherId/schemas/:schemaId', function (req, res) {
        var cypherQuery = "match (t:Teacher {id:{teacherId}})-[r:responsible]->(s:Schema {id:{schemaId}}) optional match (s)-[h:has]->(sl:Slot) optional match (sl)<-[c]-(st:Student) optional match (sl)-[l:location]->(sc:School) delete l,c,h,sl,r,s";
        var params = {
            schemaId: req.params.schemaId,
            teacherId: req.params.teacherId
        };
        db.query(cypherQuery, params, function (error, results) {
            if (error) {
                res.send(error);
            } else {
                res.json({id: req.params.schemaId, deleted: true});
            }
        });
    });

    app.put('/teachers/:teacherId/schemas/:schemaId', function (req, res) {
        var cypherQuery = "match (t:Teacher {id:{teacherId}})-[r:responsible]->(s:Schema {id:{schemaId}}) set s.name = {name} return s.id as id, s.name as name";
        var params = {
            schemaId: req.params.schemaId,
            teacherId: req.params.teacherId,
            name: req.body.name
        };
        db.query(cypherQuery, params, function (error, results) {
            if (error) {
                res.send(error);
            } else {
                res.json(results[0]);
            }
        });
    });

    app.get('/schemas/:id/slots', function (req, res) {
        var cypherQuery = "match (s:Schema {id:{id}})-[:has]->(sl:Slot) optional match (sl)<-[:claim]-(st:Student) return sl.id as id, sl.title as title, sl.from as from, sl.to as to, st.id as studentId, st.name as studentName order by from";
        db.query(cypherQuery, {id: req.params.id}, function (error, results) {
            if (error) {
                res.send(error);
            } else {
                res.json(results);
            }
        });
    });

    app.post('/schemas/:id/slots', function (req, res) {
        var params = {
            id: req.params.id,
            slotId: uuid.v1(),
            title: req.body.title,
            from: req.body.from,
            to: req.body.to
        };

        var cypherQuery = "match (s:Schema {id:{id}}) create (sl:Slot {id:{slotId}, title:{title}, from:{from}, to:{to}})<-[:has]-(s) return sl.id as id, sl.title as title, sl.from as from, sl.to as to";
        db.query(cypherQuery, params, function (error, results) {
            if (error) {
                res.send(error);
            } else {
                io.emit('newSlot', results[0]);
                res.json(results[0]);
            }
        });
    });

    app.post('/teachers/:teacherId/schemas/:schemaId/sendToParents', function (req, res) {
        console.log("sendToParents invoked");
        var params = {
            schemaId: req.params.schemaId,
            teacherId: req.params.teacherId,
            class: req.body.className
        };
        var cypherQuery = "match (s:Schema {id:{schemaId}})<-[:responsible]-(t:Teacher {id:{teacherId}})-[:teacherOf]->(c:Class {name:{class}})-[:hasStudent]-(st:Student)-[:childOf]->(p:Parent) return p.email as parentEmail, st.id as studentId, s.id as schemaId";
        db.query(cypherQuery, params, function (error, response) {
            if (error) {
                res.send(error);
            } else {
                //TODO send email with a constructed link to these parents
                res.json(response);
            }
        });
    });

    app.get('/teachers/:teacherId/classes', function (req, res) {
        var cypherQuery = "match (t:Teacher {id:{teacherId}})-[:teacherOf]->(c:Class) return c.name as name";
        db.query(cypherQuery, {teacherId: req.params.teacherId}, function (error, response) {
            if (error) {
                res.send(error);
            } else {
                res.json(response);
            }
        });
    });

    app.put('/students/:studentId/schemas/:schemaId/slots/:slotId', function (req, res) {
        var cypherQuery = "match (s:Schema {id:{schemaId}}), (st:Student {id:{studentId}}), (sl:Slot {id:{slotId}}) create (st)-[:claim]->(sl) return sl.id as id, sl.from as from, sl.to as to, st.id as studentId, st.name as studentName";
        var params = {
            studentId: req.params.studentId,
            schemaId: req.params.schemaId,
            slotId: req.params.slotId
        };
        db.query(cypherQuery, params, function (error, response) {
            if (error) {
                res.send(error);
            } else {
                io.emit('slotUpdated');
                res.json(response[0]);
            }
        });
    });

    app.post('/authenticate', function (req, res) {

        function authenticationFailed() {
            res.statusCode = 401;
            res.json({email: params.email, response: "Authentication failed!"});
        };

        var params = {
            email: req.body.username,
            password: req.body.password
        };

        var cypherQuery = "match (t:Teacher {email: {email}, password: {password}}) return t.id as id, t.name as name, t.email as email";

        db.query(cypherQuery, params, function (error, response) {
            if (error) {
                authenticationFailed();
            } else {
                if (response.length == 0) {
                    authenticationFailed();
                } else {
                    response[0].role = 'ROLE_TEACHER';
                    res.json(response[0]);
                }
            }
        });
    })

    app.get('*', function (req, res) {
        res.sendFile('index.html', {root: "./public/"});
    });
}
