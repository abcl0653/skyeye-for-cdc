const uuid = require('uuid');

module.exports = srv => {
  const { Person } = srv.entities;
  const { HealthSelfStatement } = srv.entities;

  srv.on('dcpService.newStatementPerson', async req => {

    debugger

    const tx = cds.transaction(req);
    // Validations
    if (!req.data.p.IDENTIFIER) req.reject(400, "Identifier is mandatory")
    if (!req.data.p.BLOCK_ID) req.reject(400, "Block ID is mandatory")
    if (!req.data.p.EXTERNAL_ID) req.reject(400, "External ID is mandatory")
    // if (!req.data.p.HOME_TOWN_1) req.reject(400, "Hometown is mandatory")
    // if (!req.data.p.HOME_TOWN_2) req.reject(400, "Hometown is mandatory")
    // if (!req.data.p.HOME_TOWN_3) req.reject(400, "Hometown is mandatory")
    if (!req.data.p.ADDRESS) req.reject(400, "Address is mandatory")

    const datetime = new Date();
    const submitDate = datetime.toISOString().slice(0,10)

    const realDate = req.data.s.SUBMIT_DATE || submitDate;

    // Start inserting values
    let personUUID = '';
    let personAffectedRows = 0;
    const queryResult = await tx.run(SELECT.from(Person, ['ID','IDENTIFIER']).where({ "IDENTIFIER": req.data.p.IDENTIFIER }));
    if (queryResult.length === 1) {
      personUUID = queryResult[0].ID;
      const isSubmit = await tx.run(SELECT.from(HealthSelfStatement).where({
        "PERSON_ID":personUUID,
        "SUBMIT_DATE":realDate
      }));
      if (isSubmit.length === 1) req.reject(400, '今天已提报，请明天再提报您的信息')
      
      personAffectedRows = 1;
    } else {
      personUUID = uuid();
      personAffectedRows = await tx.run(INSERT.into(Person)
        .columns('ID', 'FIRST_NAME', 'LAST_NAME', 'TYPE_CODE', 'IDENTIFIER', 'BLOCK_ID','MOBILE_PHONE',
        'HOME_TOWN_1', 'HOME_TOWN_2', 'HOME_TOWN_3', 'EXTERNAL_ID', 'ADDRESS', 'LAT_LNG')
        .rows([personUUID,
          req.data.p.FIRST_NAME,
          req.data.p.LAST_NAME,
          'PBLC', // Hard code for Public Pe.p.n
          req.data.p.IDENTIFIER,
          req.data.p.BLOCK_ID,
          req.data.p.MOBILE_PHONE,
          req.data.p.HOME_TOWN_1,
          req.data.p.HOME_TOWN_2,
          req.data.p.HOME_TOWN_3,
          req.data.p.EXTERNAL_ID,
          req.data.p.ADDRESS,
          req.data.p.LAT_LNG,
        ]))
        .catch(reason => {
          req.reject(400, reason)
        });
      // console.log(personAffectedRows)
    }

    if (personAffectedRows === 1) {
;
      const statementUUID = uuid();
      const result = await tx.run(INSERT.into(HealthSelfStatement)
        .columns('ID', 'PERSON_ID','BLOCK_ID', 'HEALTH_STATUS_CODE', 
        'SYMPTOM_1','SYMPTOM_2', 'SYMPTOM_3', 'SYMPTOM_4','SYMPTOM_4_DESC',
        'IS_OUT', 'OUT_DESC', 'QUESTION_1', 'QUESTION_2', 'QUESTION_3', 'REMARK','SUBMIT_DATE')
        .rows([statementUUID,personUUID, 
              req.data.p.BLOCK_ID,
              req.data.s.HEALTH_STATUS_CODE,
              req.data.s.SYMPTOM_1,
              req.data.s.SYMPTOM_2,
              req.data.s.SYMPTOM_3,
              req.data.s.SYMPTOM_4,
              req.data.s.SYMPTOM_4_DESC,
              req.data.s.IS_OUT,
              req.data.s.OUT_DESC,
              req.data.s.QUESTION_1,
              req.data.s.QUESTION_2,
              req.data.s.QUESTION_3,
              req.data.s.REMARK,
              req.data.s.SUBMIT_DATE || submitDate
        ])).catch(
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