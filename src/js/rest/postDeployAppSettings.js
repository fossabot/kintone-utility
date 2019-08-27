import createError from './common/createError';
import errors from './resource/errorMessages.json';
import sendRequest from './common/sendRequest';

/** Function: postDeployAppSettings
 *  @param {object} params
 *  @param {object[]} params.apps
 *  @param {number} params.apps[].app
 *  @param {number} [params.apps[].revision]
 *  @param {boolean} [params.revert]
 *  @param {boolean} [params.isGuest]
 *
 *  @return {object} result
 */
export default (params) => {
    if (!(params && params.apps)) {
        return createError(errors.required.apps);
    }

    const param = {
        apps: params.apps
    };
    if (params.hasOwnProperty('revert')) {
        param.revert = Boolean(params.revert);
    }
    const isGuest = Boolean(params.isGuest);

    return sendRequest('/k/v1/preview/app/deploy', 'POST', param, isGuest);
};
