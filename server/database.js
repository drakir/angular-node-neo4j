var neo4j = require('neo4j');
module.exports = new neo4j.GraphDatabase('http://localhost:7474');