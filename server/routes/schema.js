module.exports = function (app, db, io) {
    var uuid = require('node-uuid');
    /**
     * Find all schemas
     */
    app.get('/api/schemas', function (req, res) {
        var cypherQuery = "match (s:Schema) return s.id as id, s.name as name";
        db.query(cypherQuery, {}, function (error, results) {
            if (error) {
                res.send(error);
            } else {
                res.json(results);
            }
        });
    });

    /**
     * Find a specific schema
     */
    app.get('/api/schemas/:id', function (req, res) {
        var cypherQuery = "match (s:Schema {id:{id}}) return s.id as id, s.name as name";
        db.query(cypherQuery, {id: req.params.id}, function (error, results) {
            if (error) {
                res.send(error);
            } else {
                res.json(results[0]);
            }
        });
    });

    /**
     * Find all schema slots for a specific schema
     */
    app.get('/api/schemas/:id/slots', function (req, res) {
        var cypherQuery = "match (s:Schema {id:{id}})-[:has]->(sl:Slot) optional match (sl)<-[:claim]-(st:Student) return sl.id as id, sl.title as title, sl.from as from, sl.to as to, st.id as studentId, st.name as studentName order by from";
        db.query(cypherQuery, {id: req.params.id}, function (error, results) {
            if (error) {
                res.send(error);
            } else {
                res.json(results);
            }
        });
    });

    /**
     * Add a new slot for a specific schema
     */
    app.post('/api/schemas/:id/slots', function (req, res) {
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

    /**
     * Claim a slot as a student
     */
    app.put('/api/schemas/:id/slots/:slotId', function (req, res) {
        var cypherQuery = "match (s:Schema {id:{schemaId}}), (st:Student {id:{studentId}}), (sl:Slot {id:{slotId}}) create (st)-[:claim]->(sl) return sl.id as id, sl.from as from, sl.to as to, st.id as studentId, st.name as studentName";
        var params = {
            studentId: req.body.studentId,
            schemaId: req.params.id,
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

}