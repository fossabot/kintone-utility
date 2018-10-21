import createError from './common/createError';
import errors from './resource/errorMessages.json';
import sendRequest from './common/sendRequest';
import limit from './resource/limit.json';

/** Function: getAllRecordsByQuery
 *  @param {object} params
 *  @param {number} params.app
 *  @param {string} [params.query]
 *  @param {array} [params.fields]
 *  @param {boolean} [params.isGuest]
 *
 *  @return {object} result
 */
let getAllRecordsByQuery = (params, records, offsetNum) => {
    if (!(params && params.app)) {
        return createError(errors.required.app);
    }

    const LIMIT = limit.getRecords;
    let allRecords = records || [];
    let offset = offsetNum || 0;
    let param = {
        app: params.app,
        query: (params.query) ? `${params.query} limit ${LIMIT} offset ${offset}` : `limit ${LIMIT} offset ${offset}`,
        fields: params.fields || []
    };
    let isGuest = Boolean(params.isGuest);

    return sendRequest('/k/v1/records', 'GET', param, isGuest).then((response) => {
        allRecords = allRecords.concat(response.records);
        if (response.records.length < LIMIT) {
            return {
                records: allRecords
            };
        }
        return getAllRecordsByQuery(params, allRecords, offset + LIMIT);
    });
};

export default getAllRecordsByQuery;
