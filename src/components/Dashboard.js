/*
  Copyright 2019 Globo.com authors. All rights reserved.
Use of this source code is governed by a BSD-style
license that can be found in the LICENSE file.
*/

import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import _ from "lodash";
import SnackComponent from "./SnackComponent";
import Metric from "./Metric";
import { Graph, GraphType } from "./Graph";

const styles = {
  root: {
    width: 100,
    height: 100,
  },
};
const snackDurationInMS = 5000;

const huskyCIAPIAddress = process.env.REACT_APP_HUSKYCI_FE_API_ADDRESS;
const huskyCIAuthorRoute = `${huskyCIAPIAddress}/stats/author`;
const huskyCIAnalysisRoute = `${huskyCIAPIAddress}/stats/analysis`;
const huskyCILanguageRoute = `${huskyCIAPIAddress}/stats/language`;
const huskyCIContainerRoute = `${huskyCIAPIAddress}/stats/container`;
const huskyCIRepositoryRoute = `${huskyCIAPIAddress}/stats/repository`;
const huskyCIHistoryAnalysisRoute = `${huskyCIAPIAddress}/stats/historyanalysis?time_range=today`;
const huskyCISeverityRoute = `${huskyCIAPIAddress}/stats/severity`;

const colorBlue = "#4fc0e8";
const colorBlueHover = "#3baeda";
const colorRed = "#ed5564";
const colorRedHover = "#db4453";
const colorGreen = "#a0d468";
const colorGreenHover = "#8cc051";
const colorYellow = "#ffce55";
const colorYellowHover = "#f4bb43";
const colorGray = "#ccd0d9";
const colorGrayHover = "#aab2bd";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numAuthors: 0,
      numAnalysis: 0,
      resultsAnalysis: {
        failed: 0,
        warning: 0,
        passed: 0,
        error: 0,
      },
      languages: {
        go: 0,
        python: 0,
        ruby: 0,
        javascript: 0,
      },
      containers: {
        gosec: 0,
        npmAudit: 0,
        yarnAudit: 0,
        brakeman: 0,
        safety: 0,
        bandit: 0,
      },
      severities: {
        nosec: 0,
        low: 0,
        medium: 0,
        high: 0,
      },
      repositories: 0,
      snackOpen: false,
      variantValue: "",
      snackMessage: "",
      passingList: [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],
      failingList: [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ],
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

  callHuskyAPI = huskyRoute =>
    fetch(huskyRoute)
      .then(response => {
        if (!response.ok) {
          this.openSnack("error", "Service is unavailable");
          return response.status;
        }

        // get authors metrics
        if (huskyRoute === huskyCIAuthorRoute) {
          response.json().then(authorResultJSON => {
            if (Array.isArray(authorResultJSON) && authorResultJSON.length) {
              const newNumAuthorsResult = authorResultJSON[0].totalAuthors;
              const { numAuthors } = this.state;
              if (!_.isEqual(numAuthors, newNumAuthorsResult)) {
                this.setState({ numAuthors: newNumAuthorsResult });
              }
            }
          });
        }

        // get Analysis metrics + Results graph
        if (huskyRoute === huskyCIAnalysisRoute) {
          response.json().then(analysisResultJSON => {
            let [
              numFailedResult,
              numWarningResult,
              numPassedResult,
              numErrorResult,
            ] = [0, 0, 0, 0];
            Object.keys(analysisResultJSON).forEach(key => {
              if (_.isEqual(analysisResultJSON[key].result, "failed")) {
                numFailedResult = analysisResultJSON[key].count;
              }
              if (_.isEqual(analysisResultJSON[key].result, "warning")) {
                numWarningResult = analysisResultJSON[key].count;
              }
              if (_.isEqual(analysisResultJSON[key].result, "passed")) {
                numPassedResult = analysisResultJSON[key].count;
              }
              if (_.isEqual(analysisResultJSON[key].result, "error")) {
                numErrorResult = analysisResultJSON[key].count;
              }
            });
            const totalAnalyses =
              numFailedResult +
              numWarningResult +
              numPassedResult +
              numErrorResult;
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

        // get History graph
        if (huskyRoute === huskyCIHistoryAnalysisRoute) {
          response.json().then(historyResultJSON => {
            const [newPassingList, newFailingList] = [
              [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
              ],
              [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
              ],
            ];

            Object.keys(historyResultJSON).forEach(key => {
              const rawDateJSON = Date.parse(historyResultJSON[key].date);
              const hour = new Date(rawDateJSON).getHours();

              historyResultJSON[key].results.forEach(currentResult => {
                if (currentResult.result === "passed") {
                  newPassingList[hour] = currentResult.count;
                }

                if (currentResult.result === "failed") {
                  newFailingList[hour] = currentResult.count;
                }
              });
            });

            const { passingList } = this.state;
            const { failingList } = this.state;

            if (!_.isEqual(passingList, newPassingList)) {
              this.setState({
                passingList: newPassingList,
              });
            }

            if (!_.isEqual(failingList, newFailingList)) {
              this.setState({
                failingList: newFailingList,
              });
            }
          });
        }

        // get languages graph
        if (huskyRoute === huskyCILanguageRoute) {
          let [
            numGolangResult,
            numPythonResult,
            numRubyResult,
            numJavaScriptResult,
          ] = [0, 0, 0, 0];
          response.json().then(languageResultJSON => {
            Object.keys(languageResultJSON).forEach(key => {
              if (_.isEqual(languageResultJSON[key].language, "Go")) {
                numGolangResult = languageResultJSON[key].count;
              }
              if (_.isEqual(languageResultJSON[key].language, "Python")) {
                numPythonResult = languageResultJSON[key].count;
              }
              if (_.isEqual(languageResultJSON[key].language, "Ruby")) {
                numRubyResult = languageResultJSON[key].count;
              }
              if (_.isEqual(languageResultJSON[key].language, "JavaScript")) {
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
        
        // get severity graph
        if (huskyRoute === huskyCISeverityRoute) {
          let [numNosec, numLow, numMedium, numHigh] = [0, 0, 0, 0];
          response.json().then(severityResultJSON => {
            Object.keys(severityResultJSON).forEach(key => {
              if (_.isEqual(severityResultJSON[key].severity, "nosecvulns")) {
                numNosec = severityResultJSON[key].count;
              }
              if (_.isEqual(severityResultJSON[key].severity, "lowvulns")) {
                numLow = severityResultJSON[key].count;
              }
              if (_.isEqual(severityResultJSON[key].severity, "mediumvulns")) {
                numMedium = severityResultJSON[key].count;
              }
              if (_.isEqual(severityResultJSON[key].severity, "highvulns")) {
                numHigh = severityResultJSON[key].count;
              }
            });
            const totalSeverities = {
              nosec: numNosec,
              low: numLow,
              medium: numMedium,
              high: numHigh,
            };
            const { severities } = this.state;
            if (!_.isEqual(severities, totalSeverities)) {
              this.setState({ severities: totalSeverities });
            }
          });
        }

        // get container graph
        if (huskyRoute === huskyCIContainerRoute) {
          let [
            numGosecResult,
            numNpmauditResult,
            numYarnauditResult,
            numBrakemanResult,
            numSafetyResult,
            numBanditResult,
          ] = [0, 0, 0, 0, 0, 0];
          response.json().then(containerResultJSON => {
            Object.keys(containerResultJSON).forEach(key => {
              if (_.isEqual(containerResultJSON[key].container, "gosec")) {
                numGosecResult = containerResultJSON[key].count;
              }
              if (_.isEqual(containerResultJSON[key].container, "npmaudit")) {
                numNpmauditResult = containerResultJSON[key].count;
              }
              if (_.isEqual(containerResultJSON[key].container, "yarnaudit")) {
                numYarnauditResult = containerResultJSON[key].count;
              }
              if (_.isEqual(containerResultJSON[key].container, "brakeman")) {
                numBrakemanResult = containerResultJSON[key].count;
              }
              if (_.isEqual(containerResultJSON[key].container, "safety")) {
                numSafetyResult = containerResultJSON[key].count;
              }
              if (_.isEqual(containerResultJSON[key].container, "bandit")) {
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

        // get repositories metrics
        if (huskyRoute === huskyCIRepositoryRoute) {
          let newRepositoryResult = 0;
          response.json().then(repositoryResultJSON => {
            newRepositoryResult = repositoryResultJSON[0].totalRepositories;
            const { repositories } = this.state;
            if (!_.isEqual(repositories, newRepositoryResult)) {
              this.setState({ repositories: newRepositoryResult });
            }
          });
        }

        return response.status;
      })

      .catch(() => {
        this.openSnack("error", "Service is unavailable");
        return 500;
      });

  openSnack = (variant, message) => {
    this.setState({
      snackOpen: true,
      variantValue: variant,
      snackMessage: message,
    });
  };

  closeSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      snackOpen: false,
    });
  };

  refreshCharts = () => {
    const huskyCIRoutes = [
      huskyCIAuthorRoute,
      huskyCIAnalysisRoute,
      huskyCILanguageRoute,
      huskyCISeverityRoute,
      huskyCIRepositoryRoute,
      huskyCIHistoryAnalysisRoute,
    ];
    huskyCIRoutes.map(async huskyRoute => {
      const status = await this.callHuskyAPI(huskyRoute);
      if (status !== 200) {
        clearInterval(this.timeoutID);
      }
    });
  };

  render() {
    // Languages
    const { languages } = this.state;
    const numGoFound = languages.go;
    const numPythonFound = languages.python;
    const numRubyFound = languages.ruby;
    const numJavaScriptFound = languages.javascript;
    const infoLanguages = {
      labels: ["Golang", "Python", "Ruby", "JavaScript"],
      datasets: [
        {
          data: [numGoFound, numPythonFound, numRubyFound, numJavaScriptFound],
          backgroundColor: [colorBlue, colorGreen, colorRed, colorYellow],
          hoverBackgroundColor: [
            colorBlueHover,
            colorGreenHover,
            colorRedHover,
            colorYellowHover,
          ],
        },
      ],
    };
    // Analyses
    const { resultsAnalysis } = this.state;
    const numFailedFound = [resultsAnalysis.failed];
    const numWarningFound = [resultsAnalysis.warning];
    const numPassedFound = [resultsAnalysis.passed];
    const numErrorFound = [resultsAnalysis.error];
    const infoStatus = {
      labels: ["Failed", "Warning", "Passed", "Error"],
      datasets: [
        {
          data: [
            numFailedFound,
            numWarningFound,
            numPassedFound,
            numErrorFound,
          ],
          backgroundColor: [colorRed, colorYellow, colorGreen, colorGray],
          hoverBackgroundColor: [
            colorRedHover,
            colorYellowHover,
            colorGreenHover,
            colorGrayHover,
          ],
        },
      ],
    };
    // Severities
    const { severities } = this.state;
    const numNoSec = severities.nosec;
    const numLow = severities.low;
    const numMedium = severities.medium;
    const numHigh = severities.high;
    const infoSeverities = {
      labels: ["High", "Medium", "Low", "Nosec"],
      datasets: [
        {
          data: [numHigh, numMedium, numLow, numNoSec],
          backgroundColor: [colorRed, colorYellow, colorBlue, colorGray],
          hoverBackgroundColor: [
            colorRedHover,
            colorYellowHover,
            colorBlueHover,
            colorGrayHover,
          ],
        },
      ],
    };

    const { numAuthors } = this.state;
    const { numAnalysis } = this.state;
    const { repositories } = this.state;
    const { variantValue } = this.state;
    const { snackOpen } = this.state;
    const { snackMessage } = this.state;
    const { failingList } = this.state;
    const { passingList } = this.state;

    const infoHistoryAnalysis = {
      labels: [
        "00:00h",
        "01:00h",
        "02:00h",
        "03:00h",
        "04:00h",
        "05:00h",
        "06:00h",
        "07:00h",
        "08:00h",
        "09:00h",
        "10:00h",
        "11:00h",
        "12:00h",
        "13:00h",
        "14:00h",
        "15:00h",
        "16:00h",
        "17:00h",
        "18:00h",
        "19:00h",
        "20:00h",
        "21:00h",
        "22:00h",
        "23:00h",
      ],
      datasets: [
        {
          label: "Passing Analyses",
          fill: false,
          lineTension: 0.1,
          borderWidth: 5,
          backgroundColor: colorGreen,
          borderColor: colorGreenHover,
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: colorGreenHover,
          pointBackgroundColor: "#fff",
          pointBorderWidth: 4,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: colorGreen,
          pointHoverBorderColor: colorGreenHover,
          pointHoverBorderWidth: 4,
          pointRadius: 3,
          pointHitRadius: 10,
          data: passingList,
        },
        {
          label: "Failing Analyses",
          fill: false,
          lineTension: 0.1,
          borderWidth: 5,
          backgroundColor: colorRed,
          borderColor: colorRedHover,
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: colorRedHover,
          pointBackgroundColor: "#fff",
          pointBorderWidth: 4,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: colorRed,
          pointHoverBorderColor: colorRedHover,
          pointHoverBorderWidth: 4,
          pointRadius: 3,
          pointHitRadius: 10,
          data: failingList,
        },
      ],
    };

    return (
      <div>
        <Grid container spacing={3} style={{ padding: "1rem" }}>
          <Grid item xs={12} sm={4}>
            <Metric title="Developers" value={numAuthors} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Metric title="Analyses" value={numAnalysis} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Metric title="Repositories" value={repositories} />
          </Grid>
        </Grid>

        <Grid container spacing={3} style={{ padding: "0rem 1rem 0rem 1rem" }}>
          <Grid item xs={12} sm={12}>
            <Graph data={infoHistoryAnalysis} type={GraphType.Line} />
          </Grid>
        </Grid>

        <Grid container spacing={3} style={{ padding: "1rem" }}>
          <Grid item xs={12} md={4}>
            <Graph data={infoStatus} type={GraphType.Pie} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Graph data={infoLanguages} type={GraphType.Bar} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Graph data={infoSeverities} type={GraphType.Bar} />
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
