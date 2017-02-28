import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../actions';
import SauceLabsResultRow from './SauceLabsResultRow';
import { Table } from '@jenkins-cd/design-language';

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

        return (
            <div className="saucelabs-results-widget">
                <Table>
                    <tr>
                        <th align="left">Job Name</th>
                        <th align="left">OS/Browser</th>
                        <th align="left">Pass/Fail</th>
                        <th align="left">Job Links</th>
                    </tr>
                    {sauceResults.map(result => <SauceLabsResultRow result={result} />)}
                </Table>
            </div>
        );
    }
}

SauceLabsResultWidget.propTypes = {
    actions: PropTypes.array,
    run: PropTypes.object,
    sauceResults: PropTypes.object,
    params: PropTypes.object,
    resetSauceDetails: PropTypes.func,
    fetchSauceResults: PropTypes.func,
};

SauceLabsResultWidget.contextTypes = {
    config: PropTypes.object.isRequired,
    store: PropTypes.object,
};
export default connect(state => state, actions)(SauceLabsResultWidget);
