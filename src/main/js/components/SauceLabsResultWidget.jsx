import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../actions';
import { SvgStatus } from '@jenkins-cd/design-language';

class SauceLabsResultWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.props.fetchSauceResults(this.props.run);
    }

    componentWillUnmount() {
        this.props.resetSauceDetails();
    }

    render() {
        const { sauceResults } = this.props;
        if (!sauceResults) { return null; }

        console.log('sauceResults', sauceResults);
        return (
            <div className="saucelabs-results-widget">
                <table>
                    <tr>
                        <th align="left">Job Name</th>
                        <th align="left">OS/Browser</th>
                        <th align="left">Pass/Fail</th>
                        <th align="left">Job Links</th>
                    </tr>
                    {sauceResults.map(result => {
                        return (
                            <tr>
                                <td>
                                    <a href="${from.urlName}/jobReport?jobId={result.id}">{result.name}</a>
                                </td>
                                <td>{result.os} {result.browser} {result.version}</td>
                                <td><SvgStatus result={result.status} />{result.status}</td>
                                <td>
                                    <a href="{result.videoUrl}">Video</a>
                                    -
                                    <a href="{result.logUrl}">Logs</a>
                                </td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        );
    }
}

SauceLabsResultWidget.propTypes = {
    actions: PropTypes.array,
    run: PropTypes.object,
    sauceResults: PropTypes.object,
    resetSauceDetails: PropTypes.func,
    fetchSauceResults: PropTypes.func,
};

SauceLabsResultWidget.contextTypes = {
    config: PropTypes.object.isRequired,
    store: PropTypes.object,
};
export default connect(state => state, actions)(SauceLabsResultWidget);
