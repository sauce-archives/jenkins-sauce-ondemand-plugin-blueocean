import React, { PropTypes, Component } from 'react';
import { StatusIndicator, Dialog } from '@jenkins-cd/design-language';
import IFrame from 'react-iframe';

export default class SauceLabsResultRow extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onClickEmbed = this.onClickEmbed.bind(this);
        this.onDimissEmbed = this.onDimissEmbed.bind(this);
        this.resultMap = {
            passed: 'success',
        };
    }

    onDimissEmbed() {
        this.setState({ embed: null });
    }

    onClickEmbed() {
        const { result } = this.props;
        this.setState({ embed: `https://saucelabs.com/job-embed/${result.jobId}?auth=${result.hmac}&height=0&width=0` });
    }

    render() {
        const { result } = this.props;
        const { embed } = this.state;
        const style = {
            height: '80vh',
            width: '80vw',
        };

        return (
            <tr>
                <td>
                    <a className="btn-link" onClick={this.onClickEmbed}>{result.name}</a>
                </td>
                <td>{result.os} {result.browser} {result.version}</td>
                <td>
                  <StatusIndicator result={this.resultMap[result.status.toLowerCase()] || result.status.toLowerCase()} />
                  &nbsp;
                  { result.status }
                </td>
                <td>
                    <a className="btn" href={decodeURIComponent(result.videoUrl)} download>Download Video</a>
                    &nbsp;
                    <a className="btn" href={decodeURIComponent(result.logUrl)} download>Download Log</a>
                </td>
                {
                  embed && (<Dialog title="Results" onDismiss={this.onDimissEmbed}>
                    <p style={style}>
                      <IFrame url={embed} position="inherit" />
                    </p>
                  </Dialog>)
                }
            </tr>
        );
    }
}

SauceLabsResultRow.propTypes = {
    result: PropTypes.object,
};
