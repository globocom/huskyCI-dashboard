/*
  Copyright 2019 Globo.com authors. All rights reserved.
Use of this source code is governed by a BSD-style
license that can be found in the LICENSE file.
*/

import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import _ from 'lodash';
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
    const { languages } = this.state;
    const numGoFound = languages.go;
    const numPythonFound = languages.python;
    const numRubyFound = languages.ruby;
    const numJavaScriptFound = languages.javascript;
    const infoLanguages = {
      labels: ['Golang', 'Python', 'Ruby', 'JavaScript'],
      datasets: [
        {
          data: [numGoFound, numPythonFound, numRubyFound, numJavaScriptFound],
          backgroundColor: [colorBlue, colorGreen, colorRed, colorYellow],
          hoverBackgroundColor: [colorBlueHover, colorGreenHover, colorRedHover, colorYellowHover],
        },
      ],
    };
    const { resultsAnalysis } = this.state;
    const numFailedFound = [resultsAnalysis.failed];
    const numWarningFound = [resultsAnalysis.warning];
    const numPassedFound = [resultsAnalysis.passed];
    const numErrorFound = [resultsAnalysis.error];
    const infoAnalysis = {
      labels: ['Failed', 'Warning', 'Passed', 'Error'],
      datasets: [
        {
          data: [numFailedFound, numWarningFound, numPassedFound, numErrorFound],
          backgroundColor: [colorRed, colorYellow, colorGreen, colorGray],
          hoverBackgroundColor: [colorRedHover, colorYellowHover, colorGreenHover, colorGrayHover],
        },
      ],
    };
    const { containers } = this.state;
    const numGosecFound = containers.gosec;
    const numNpmauditFound = containers.npmAudit;
    const numYarnauditFound = containers.yarnAudit;
    const numBrakemanFound = containers.brakeman;
    const numSafetyFound = containers.safety;
    const numBanditFound = containers.bandit;
    const infoContainers = {
      labels: ['Gosec', 'Npm Audit', 'Yarn Audit', 'Brakeman', 'Safety', 'Bandit'],
      datasets: [
        {
          data: [
            numGosecFound,
            numNpmauditFound,
            numYarnauditFound,
            numBrakemanFound,
            numSafetyFound,
            numBanditFound,
          ],
          backgroundColor: [
            colorBlue,
            colorPurple,
            colorGray,
            colorRed,
            colorGreen,
            colorYellow,
          ],
          hoverBackgroundColor: [
            colorBlueHover,
            colorPurpleHover,
            colorGrayHover,
            colorRedHover,
            colorGreenHover,
            colorYellowHover,
          ],
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
        <Grid container spacing={3} style={{padding: '1rem'}}>
          <Grid item xs={12} sm={4}>
            <Paper>
              <div className="metric-container">
                <span className="title-box">Developers</span>
                <span className="metric-value">{numAuthors}</span>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper>
              <div className="metric-container">
                <span className="title-box">Analyses</span>
                <span className="metric-value">{numAnalysis}</span>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper>
              <div className="metric-container">
                <span className="title-box">Repositories</span>
                <br />
                <span className="metric-value">{repositories}</span>
              </div>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={3} style={{padding: '1rem'}}>
          <Grid item xs={12} md={4}>
            <Paper>
              <Bar
                width={boxSizeWidth}
                height={boxSizeHeight}
                data={infoAnalysis}
                options={chartOptions}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper>
              <Bar
                width={boxSizeWidth}
                height={boxSizeHeight}
                data={infoLanguages}
                options={chartOptions}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper>
              <Bar
                width={boxSizeWidth}
                height={boxSizeHeight}
                data={infoContainers}
                options={chartOptions}
              />
            </Paper>
          </Grid>
        </Grid>
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

export default withStyles(styles)(Dashboard);
