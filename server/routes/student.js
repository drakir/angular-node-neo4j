module.exports = function (app, db) {

    /**
     * Find all students
     */
    app.get('/api/students', function (req, res) {
        var cypherQuery = "match (s:Student) return s.id as id, s.name as name";
        db.query(cypherQuery, {}, function (error, results) {
            if (error) {
                res.send(error);
            } else {
                res.json(results);
            }
        });
    });

    /**
     * Get a specific student
     */
    app.get('/api/students/:id', function (req, res) {
        var cypherQuery = "match (s:Student {id:{id}}) return s.id as id, s.name as name";
        db.query(cypherQuery, {id: req.params.id}, function (error, results) {
            if (error) {
                res.send(error);
            } else {
                res.json(results[0]);
            }
        });
    });

    /**
     * Add a new student
     */
    app.post('/api/students', function (req, res) {
        var student = {
            id: uuid.v1(),
            name: req.body.name,
            className: req.body.className
        }

        var cypherQuery = "match (c:Class {name:{className}}) create (s:Student {id:{id}, name:{name}})<-[:hasStudent]-(s) return s.id as id, s.name as name";
        db.query(cypherQuery, student, function (error, results) {
            if (error) {
                res.send(error);
            } else {
                res.json(results[0]);
            }
        });
    });

    /**
     * Delete an existing student
     */
    app.delete('/api/students/:id', function (req, res) {
        var cypherQuery = "match (s:Student {id:{id}}) optional match (s)-[r]-() delete s, r";
        db.query(cypherQuery, {id: req.params.id}, function (error) {
            if (error) {
                res.send(error);
            } else {
                res.json({id: req.params.id, deleted: true});
            }
        });
    });

    /**
     * Update a student
     */
    app.put('/api/students/:id', function (req, res) {
        var cypherQuery = "match (s:Student {id:{id}}) set s.name={name} return s.id as id, s.name as name";
        var params = {
            id: req.params.id,
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

}