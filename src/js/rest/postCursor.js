import createError from './common/createError';
import errors from './resource/errorMessages.json';
import sendRequest from './common/sendRequest';

/** Function: postCursor
 *  @param {object} params
 *  @param {number} params.app
 *  @param {string} [params.query]
 *  @param {array} [params.fields]
 *  @param {number} [params.size]
 *  @param {boolean} [params.isGuest]
 *
 *  @return {object} result
 */
export default (params) => {
    if (!(params && params.app)) {
        return createError(errors.required.app);
    }

    const param = {
        app: params.app,
        id: params.id,
        query: params.query || '',
        fields: params.fields || [],
        size: params.size || 100
    };
    const isGuest = Boolean(params.isGuest);

    return sendRequest('/k/v1/records/cursor', 'POST', param, isGuest);
};
