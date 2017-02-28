import keymirror from 'keymirror';
import UrlConfig from '@jenkins-cd/blueocean-core-js/dist/js/urlconfig';
import { Fetch } from '@jenkins-cd/blueocean-core-js/dist/js/fetch';

export const ACTION_TYPES = keymirror({
    SET_SAUCE_RESULTS: null,
});

export const reducer = (state = {}, action) => {
    if (action.type === ACTION_TYPES.SET_SAUCE_RESULTS) {
        return Object.assign({}, state, {
            sauceResults: action.payload,
        });
    }
    return state;
};

export const actions = {
    fetchSauceResults(run) {
        return (dispatch) => {
            const baseUrl = UrlConfig.getJenkinsRootURL();
            const url = `${baseUrl}${run._links.self.href}sauce-ondemand-report/`;

            return Fetch.fetchJSON(url)
                .then(data => dispatch({
                    type: ACTION_TYPES.SET_SAUCE_RESULTS,
                    payload: data.jobs,
                }));
        };
    },
    resetSauceDetails() {
        return (dispatch) =>
            dispatch({
                type: ACTION_TYPES.SET_SAUCE_RESULTS,
                payload: null,
            });
    },
};
