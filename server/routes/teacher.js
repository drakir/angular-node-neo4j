module.exports = function (app, db) {

    /**
     * Find all teachers
     */
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

    /**
     * Find all teacher's classes
     */
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

    /**
     * Find all teacher schemas
     */
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

    /**
     * Create a new teacher schema
     */
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

    /**
     * Delete an existing teacher's schema
     */
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

    /**
     * Update an existing teacher's schema
     */
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

    /**
     * TODO: Send an email to all parents of the children in the teacher's class with a constructed url to the schema booking page
     */
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

}