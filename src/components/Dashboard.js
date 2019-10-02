/*
  Copyright 2019 Globo.com authors. All rights reserved.
Use of this source code is governed by a BSD-style
license that can be found in the LICENSE file.
*/

import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import _ from 'lodash';
import PropTypes from 'prop-types';
import SnackComponent from './SnackComponent';

const styles = {
  root: {
    width: 100,
    height: 100,
  },
};
const snackDurationInMS = 5000
const chartOptions = {
  legend: {
    display: false
  },
  scales: {
    yAxes: [{
      ticks: {
        min: 0
      }
    }]
  }
}

const huskyCIAPIAddress = process.env.REACT_APP_HUSKYCI_FE_API_ADDRESS;
const huskyCIAuthorRoute = `${huskyCIAPIAddress}/stats/author`;
const huskyCIAnalysisRoute = `${huskyCIAPIAddress}/stats/analysis`;
const huskyCILanguageRoute = `${huskyCIAPIAddress}/stats/language`;
const huskyCIContainerRoute = `${huskyCIAPIAddress}/stats/container`;
const huskyCIRepositoryRoute = `${huskyCIAPIAddress}/stats/repository`;

const boxMargin = 8;
const boxSizeWidth = 400;
const boxSizeHeight = 300;

const colorPurple = '#ab92ea';
const colorPurpleHover = '#967bdc';
const colorBlue = '#4fc0e8';
const colorBlueHover = '#3baeda';
const colorRed = '#ed5564';
const colorRedHover = '#db4453';
const colorGreen = '#a0d468';
const colorGreenHover = '#8cc051';
const colorYellow = '#ffce55';
const colorYellowHover = '#f4bb43';
const colorGray = '#ccd0d9';
const colorGrayHover = '#aab2bd';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numAuthors: 0,
      numAnalysis: 0,
      resultsAnalysis: {
        failed: 0, warning: 0, passed: 0, error: 0,
      },
      languages: {
        go: 0, python: 0, ruby: 0, javascript: 0,
      },
      containers: {
        gosec: 0, npmAudit: 0, yarnAudit: 0, brakeman: 0, safety: 0, bandit: 0,
      },
      repositories: 0,
      snackOpen: false,
      variantValue: '',
      snackMessage: '',
      filters: {
        languages: [],
        analysis: [],
        containers: [],
      },
    };
    this.timeoutID = 0;
    this.refreshCharts();
  }

  componentDidMount() {
    this.timeoutID = setInterval(this.refreshCharts.bind(this), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.timeoutID);
  }

  callHuskyAPI = (huskyRoute) => fetch(huskyRoute).then((response) => {
    if (!response.ok) {
      this.openSnack('error', 'Service is unavailable');
      return response.status;
    }
    if (huskyRoute === huskyCIAuthorRoute) {
      response.json().then((authorResultJSON) => {
        if (Array.isArray(authorResultJSON) && authorResultJSON.length) {
          const newNumAuthorsResult = authorResultJSON[0].totalAuthors;
          const { numAuthors } = this.state;
          if (!_.isEqual(numAuthors, newNumAuthorsResult)) {
            this.setState({ numAuthors: newNumAuthorsResult });
          }
        }
      });
    }
    if (huskyRoute === huskyCIAnalysisRoute) {
      response.json().then((analysisResultJSON) => {
        let [numFailedResult, numWarningResult, numPassedResult, numErrorResult] = [0, 0, 0, 0];
        Object.keys(analysisResultJSON).forEach((key) => {
          if (_.isEqual(analysisResultJSON[key].result, 'failed')) {
            numFailedResult = analysisResultJSON[key].count;
          }
          if (_.isEqual(analysisResultJSON[key].result, 'warning')) {
            numWarningResult = analysisResultJSON[key].count;
          }
          if (_.isEqual(analysisResultJSON[key].result, 'passed')) {
            numPassedResult = analysisResultJSON[key].count;
          }
          if (_.isEqual(analysisResultJSON[key].result, 'error')) {
            numErrorResult = analysisResultJSON[key].count;
          }
        });
        const totalAnalyses = numFailedResult
            + numWarningResult + numPassedResult + numErrorResult;
        const { numAnalysis } = this.state;
        if (!_.isEqual(numAnalysis, totalAnalyses)) {
          this.setState({
            numAnalysis: totalAnalyses,
            resultsAnalysis: {
              failed: numFailedResult,
              warning: numWarningResult,
              passed: numPassedResult,
              error: numErrorResult,
            },
          });
        }
      });
    }
    if (huskyRoute === huskyCILanguageRoute) {
      let [numGolangResult, numPythonResult, numRubyResult, numJavaScriptResult] = [0, 0, 0, 0];
      response.json().then((languageResultJSON) => {
        Object.keys(languageResultJSON).forEach((key) => {
          if (_.isEqual(languageResultJSON[key].language, 'Go')) {
            numGolangResult = languageResultJSON[key].count;
          }
          if (_.isEqual(languageResultJSON[key].language, 'Python')) {
            numPythonResult = languageResultJSON[key].count;
          }
          if (_.isEqual(languageResultJSON[key].language, 'Ruby')) {
            numRubyResult = languageResultJSON[key].count;
          }
          if (_.isEqual(languageResultJSON[key].language, 'JavaScript')) {
            numJavaScriptResult = languageResultJSON[key].count;
          }
        });
        const totalLanguages = {
          go: numGolangResult,
          python: numPythonResult,
          ruby: numRubyResult,
          javascript: numJavaScriptResult,
        };
        const { languages } = this.state;
        if (!_.isEqual(languages, totalLanguages)) {
          this.setState({ languages: totalLanguages });
        }
      });
    }
    if (huskyRoute === huskyCIContainerRoute) {
      let [numGosecResult, numNpmauditResult, numYarnauditResult, numBrakemanResult,
        numSafetyResult, numBanditResult] = [0, 0, 0, 0, 0, 0];
      response.json().then((containerResultJSON) => {
        Object.keys(containerResultJSON).forEach((key) => {
          if (_.isEqual(containerResultJSON[key].container, 'gosec')) {
            numGosecResult = containerResultJSON[key].count;
          }
          if (_.isEqual(containerResultJSON[key].container, 'npmaudit')) {
            numNpmauditResult = containerResultJSON[key].count;
          }
          if (_.isEqual(containerResultJSON[key].container, 'yarnaudit')) {
            numYarnauditResult = containerResultJSON[key].count;
          }
          if (_.isEqual(containerResultJSON[key].container, 'brakeman')) {
            numBrakemanResult = containerResultJSON[key].count;
          }
          if (_.isEqual(containerResultJSON[key].container, 'safety')) {
            numSafetyResult = containerResultJSON[key].count;
          }
          if (_.isEqual(containerResultJSON[key].container, 'bandit')) {
            numBanditResult = containerResultJSON[key].count;
          }
        });
        const totalContainers = {
          gosec: numGosecResult,
          npmAudit: numNpmauditResult,
          yarnAudit: numYarnauditResult,
          brakeman: numBrakemanResult,
          safety: numSafetyResult,
          bandit: numBanditResult,
        };
        const { containers } = this.state;
        if (!_.isEqual(containers, totalContainers)) {
          this.setState({ containers: totalContainers });
        }
      });
    }
    if (huskyRoute === huskyCIRepositoryRoute) {
      let newRepositoryResult = 0;
      response.json().then((repositoryResultJSON) => {
        newRepositoryResult = repositoryResultJSON[0].totalRepositories;
        const { repositories } = this.state;
        if (!_.isEqual(repositories, newRepositoryResult)) {
          this.setState({ repositories: newRepositoryResult });
        }
      });
    }
    return response.status;
  }).catch(() => {
    this.openSnack('error', 'Service is unavailable');
    return 500;
  })

  openSnack = (variant, message) => {
    this.setState({
      snackOpen: true,
      variantValue: variant,
      snackMessage: message,
    });
  }

  closeSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({
      snackOpen: false,
    });
  }

  refreshCharts = () => {
    const huskyCIRoutes = [
      huskyCIAuthorRoute,
      huskyCIAnalysisRoute,
      huskyCILanguageRoute,
      huskyCIContainerRoute,
      huskyCIRepositoryRoute,
    ];
    huskyCIRoutes.map(async (huskyRoute) => {
      const status = await this.callHuskyAPI(huskyRoute);
      if (status !== 200) {
        clearInterval(this.timeoutID);
      }
    });
  }

  render() {
    const { filters } = this.state;

    const { languages } = this.state;
    const languagesFilter = filters.languages;
    const resultsLanguagesData = {
      Golang: {
        data: languages.go,
        bgColor: colorBlue,
        hoverBgColor: colorBlueHover,
      },
      Python: {
        data: languages.python,
        bgColor: colorGreen,
        hoverBgColor: colorGreenHover,
      },
      Ruby: {
        data: languages.ruby,
        bgColor: colorRed,
        hoverBgColor: colorRedHover,
      },
      JavaScript: {
        data: languages.javascript,
        bgColor: colorYellow,
        hoverBgColor: colorYellowHover,
      },
    };
    let filteredLanguagesData = resultsLanguagesData;
    if (filters.languages.length) {
      const languagesKeys = Object.keys(resultsLanguagesData);
      filteredLanguagesData = languagesKeys
        .filter((key) => languagesFilter.includes(key))
        .reduce((obj, key) => Object.assign(obj, { [key]: resultsLanguagesData[key] }), {});
    }
    const infoLanguages = {
      labels: Object.keys(filteredLanguagesData),
      datasets: [
        {
          data: Object.values(filteredLanguagesData).map((e) => e.data),
          backgroundColor: Object.values(filteredLanguagesData).map((e) => e.bgColor),
          hoverBackgroundColor: Object.values(filteredLanguagesData).map((e) => e.hoverBgColor),
        },
      ],
    };
    const { resultsAnalysis } = this.state;
    const analysisFilter = filters.analysis;
    const resultsAnalysisData = {
      Failed: {
        data: [resultsAnalysis.failed],
        bgColor: colorRed,
        hoverBgColor: colorRedHover,
      },
      Warning: {
        data: [resultsAnalysis.warning],
        bgColor: colorYellow,
        hoverBgColor: colorYellowHover,
      },
      Passed: {
        data: [resultsAnalysis.passed],
        bgColor: colorGreen,
        hoverBgColor: colorGreenHover,
      },
      Error: {
        data: [resultsAnalysis.error],
        bgColor: colorGray,
        hoverBgColor: colorGrayHover,
      },
    };
    let filteredAnalysisData = resultsAnalysisData;
    if (filters.analysis.length) {
      const analysisKeys = Object.keys(resultsAnalysisData);
      filteredAnalysisData = analysisKeys
        .filter((key) => analysisFilter.includes(key))
        .reduce((obj, key) => Object.assign(obj, { [key]: resultsAnalysisData[key] }), {});
    }
    const infoAnalysis = {
      labels: Object.keys(filteredAnalysisData),
      datasets: [
        {
          data: Object.values(filteredAnalysisData).map((e) => e.data),
          backgroundColor: Object.values(filteredAnalysisData).map((e) => e.bgColor),
          hoverBackgroundColor: Object.values(filteredAnalysisData).map((e) => e.hoverBgColor),
        },
      ],
    };

    const { containers } = this.state;
    const containersFilter = filters.containers;
    const resultsContainersData = {
      Gosec: {
        data: containers.gosec,
        bgColor: colorBlue,
        hoverBgColor: colorBlueHover,
      },
      'Npm Audit': {
        data: containers.npmAudit,
        bgColor: colorPurple,
        hoverBgColor: colorPurpleHover,
      },
      'Yarn Audit': {
        data: containers.yarnAudit,
        bgColor: colorGray,
        hoverBgColor: colorGrayHover,
      },
      Brakeman: {
        data: containers.brakeman,
        bgColor: colorRed,
        hoverBgColor: colorRedHover,
      },
      Safety: {
        data: containers.safety,
        bgColor: colorGreen,
        hoverBgColor: colorGreenHover,
      },
      Bandit: {
        data: containers.bandit,
        bgColor: colorYellow,
        hoverBgColor: colorYellowHover,
      },
    };
    let filteredContainersData = resultsContainersData;
    if (filters.containers.length) {
      const containersKeys = Object.keys(resultsContainersData);
      filteredContainersData = containersKeys
        .filter((key) => containersFilter.includes(key))
        .reduce((obj, key) => Object.assign(obj, { [key]: resultsContainersData[key] }), {});
    }
    const infoContainers = {
      labels: Object.keys(filteredContainersData),
      datasets: [
        {
          data: Object.values(filteredContainersData).map((e) => e.data),
          backgroundColor: Object.values(filteredContainersData).map((e) => e.bgColor),
          hoverBackgroundColor: Object.values(filteredContainersData).map((e) => e.hoverBgColor),
        },
      ],
    };


    const { numAuthors } = this.state;

    const { numAnalysis } = this.state;

    const { repositories } = this.state;

    const { snackOpen } = this.state;
    const { variantValue } = this.state;
    const { snackMessage } = this.state;

    return (
      <div>
        <Row>
          <div style={{ margin: boxMargin, width: boxSizeWidth, height: boxSizeHeight - 150 }}>
            <Paper>
              <div className="metric-container">
                <span className="title-box">Developers</span>
                <span className="metric-value">{numAuthors}</span>
              </div>
            </Paper>
          </div>
          <div style={{ margin: boxMargin, width: boxSizeWidth, height: boxSizeHeight - 150 }}>
            <Paper>
              <div className="metric-container">
                <span className="title-box">Analyses</span>
                <span className="metric-value">{numAnalysis}</span>
              </div>
            </Paper>
          </div>
          <div style={{ margin: boxMargin, width: boxSizeWidth, height: boxSizeHeight - 150 }}>
            <Paper>
              <div className="metric-container">
                <span className="title-box">Repositories</span>
                <br />
                <span className="metric-value">{repositories}</span>
              </div>
            </Paper>
          </div>
        </Row>
        <Row>
          <div style={{ margin: boxMargin, width: boxSizeWidth, height: boxSizeHeight }}>
            <Paper>
              <Bar
                width={boxSizeWidth}
                height={boxSizeHeight}
                data={infoAnalysis}
                options={chartOptions}
              />
            </Paper>
          </div>
          <div style={{ margin: boxMargin, width: boxSizeWidth, height: boxSizeHeight }}>
            <Paper>
              <Bar
                width={boxSizeWidth}
                height={boxSizeHeight}
                data={infoLanguages}
                options={chartOptions}
              />
            </Paper>
          </div>
          <div style={{ margin: boxMargin, width: boxSizeWidth, height: boxSizeHeight }}>
            <Paper>
              <Bar
                width={boxSizeWidth}
                height={boxSizeHeight}
                data={infoContainers}
                options={chartOptions}
              />
            </Paper>
          </div>
        </Row>
        <SnackComponent
          open={snackOpen}
          duration={snackDurationInMS}
          onClose={this.closeSnack}
          variant={variantValue}
          message={snackMessage}
        />
      </div>
    );
  }
}

const Row = ({ children }) => (
  <div
    style={{
      margin: 16,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {children}
  </div>
);

Row.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(Dashboard);
