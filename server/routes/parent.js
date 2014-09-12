module.exports = function (app, db) {
    /**
     * Find all parents
     */
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

    /**
     * Get a specific parent
     */
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

    /**
     * Add a new parent
     */
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

    /**
     * Delete an existing parent
     */
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

    /**
     * Update a parent
     */
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
}