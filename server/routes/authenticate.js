module.exports = function (app,db) {

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
}
