const uuid = require('uuid')

module.exports = srv => {

  const { Person } = srv.entities;
  const { HealthSelfStatement } = srv.entities;

  srv.on('testService.new', async (req) => {
    const tx = cds.transaction(req);
    // Validations
    if (!req.data.p.IDENTIFIER) req.reject(400, "Identifier is mandatory")

    // Start inserting values
    let personUUID = '';
    let personAffectedRows = 0;
    const queryResult = await tx.run(SELECT.from(Person, ['IDENTIFIER']).where({ "IDENTIFIER": req.data.p.IDENTIFIER }));
    if (queryResult.length === 1) {
      personUUID = queryResult[0].IDENTIFIER;
    } else {
      personUUID = uuid();
      personAffectedRows = await tx.run(INSERT.into(Person)
        .columns('ID', 'LAST_NAME', 'IDENTIFIER', 'MOBILE_PHONE')
        .rows([personUUID, 
               req.data.p.LAST_NAME, 
               req.data.p.IDENTIFIER,
               req.data.p.MOBILE_PHONE 
               ]))
        .catch(reason => {
          req.reject(400,reason)
        });
      // console.log(personAffectedRows)
    }

    if (personAffectedRows === 1) {
      const statementUUID = uuid();
      const result = await tx.run(INSERT.into(HealthSelfStatement)
        .columns('ID', 'PERSON_ID', 'HEALTH_STATUS_CODE')
        .rows([statementUUID, personUUID, 'HOME1'])).catch(
          (reason) => {
            console.log(reason);
            req.reject(400, 'Created Statement failed');
          }
        )
        .catch(() => req.reject(400, "Create Statement Failed"));

      if (result === 1) return `Successfully created - ${statementUUID}`;
    }
  })
}