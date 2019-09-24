/* 
  Copyright 2019 Globo.com authors. All rights reserved.
Use of this source code is governed by a BSD-style
license that can be found in the LICENSE file.
*/

import React from "react";
import { Bar } from "react-chartjs-2";
import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import _ from "lodash";
import PropTypes from "prop-types";

const styles = {
  root: {
    width: 100,
    height: 100
  }
};

const huskyCIAPIAddress = process.env.REACT_APP_HUSKYCI_FE_API_ADDRESS
const huskyCIAuthorRoute = huskyCIAPIAddress + "/stats/author"
const huskyCIAnalysisRoute = huskyCIAPIAddress + "/stats/analysis"
const huskyCILanguageRoute = huskyCIAPIAddress + "/stats/language"
const huskyCIContainerRoute = huskyCIAPIAddress + "/stats/container"
const huskyCIRepositoryRoute = huskyCIAPIAddress + "/stats/repository"

const boxMargin = 8
const boxSizeWidth = 400
const boxSizeHeight = 300

const colorPurple = "#ab92ea"
const colorPurpleHover = "#967bdc"
const colorBlue = "#4fc0e8"
const colorBlueHover = "#3baeda"
const colorRed = "#ed5564"
const colorRedHover = "#db4453"
const colorGreen = "#a0d468"
const colorGreenHover = "#8cc051"
const colorYellow = "#ffce55"
const colorYellowHover = "#f4bb43" 
const colorGray = "#ccd0d9"
const colorGrayHover = "#aab2bd"

class Dashboard extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      numAuthors: 0,
      numAnalysis: 0,
      resultsAnalysis: { failed: 0, warning: 0, passed: 0, error: 0 },
      languages: { go: 0, python: 0, ruby: 0, javascript: 0 },
      containers: { gosec: 0, npmAudit: 0, yarnAudit: 0, brakeman: 0, safety: 0, bandit: 0 },
      repositories: 0
    };
    this.timeoutID = 0;
    this.refreshCharts = this.refreshCharts.bind(this)
    this.refreshCharts()
  }

  componentDidMount() {
    this.timeoutID = setInterval(this.refreshCharts.bind(this), 10000);
  }

  refreshCharts() {
    let [ numGosecResult, numNpmauditResult, numYarnauditResult, numBrakemanResult, numSafetyResult, numBanditResult ] = [ 0, 0, 0, 0, 0, 0 ];
    let [ numGolangResult, numPythonResult, numRubyResult, numJavaScriptResult ] = [ 0, 0, 0, 0 ];
    let [ numFailedResult, numWarningResult, numPassedResult, numErrorResult ] = [ 0, 0, 0, 0 ];
    let newNumAuthorsResult = 0;
    let newRepositoryResult = 0;
  
    fetch(huskyCIAuthorRoute).then(resp => {
      resp.json().then(authorResultJSON => {
        newNumAuthorsResult = authorResultJSON[0]["totalAuthors"]
        if(!_.isEqual(this.state.numAuthors, newNumAuthorsResult)){
          this.setState({numAuthors: newNumAuthorsResult})
        }
      });
    });

    fetch(huskyCIAnalysisRoute).then(resp => {
      resp.json().then(analysisResultJSON => {
        Object.keys(analysisResultJSON).forEach(function(key) {  
          if (_.isEqual(analysisResultJSON[key]["result"], "failed")) {
            numFailedResult = analysisResultJSON[key]["count"]
          }
          if (_.isEqual(analysisResultJSON[key]["result"], "warning")) {
            numWarningResult = analysisResultJSON[key]["count"]
          }
          if (_.isEqual(analysisResultJSON[key]["result"], "passed")) {
            numPassedResult = analysisResultJSON[key]["count"]
          }
          if (_.isEqual(analysisResultJSON[key]["result"], "error")) {
            numErrorResult = analysisResultJSON[key]["count"]
          }
        });
        let totalAnalyses = numFailedResult + numWarningResult + numPassedResult + numErrorResult
        if(!_.isEqual(this.state.numAnalysis, totalAnalyses)){
          this.setState({numAnalysis: totalAnalyses,
            resultsAnalysis: { failed: numFailedResult, warning: numWarningResult, passed: numPassedResult, error: numErrorResult }
          });
        }
      });
    });

    fetch(huskyCILanguageRoute).then(resp => {
      resp.json().then(languageResultJSON => {
        Object.keys(languageResultJSON).forEach(function(key) {  
          if (_.isEqual(languageResultJSON[key]["language"], "Go")) {
            numGolangResult = languageResultJSON[key]["count"]
          }
          if (_.isEqual(languageResultJSON[key]["language"], "Python")) {
            numPythonResult = languageResultJSON[key]["count"]
          }
          if (_.isEqual(languageResultJSON[key]["language"], "Ruby")) {
            numRubyResult = languageResultJSON[key]["count"]
          }
          if (_.isEqual(languageResultJSON[key]["language"], "JavaScript")) {
            numJavaScriptResult = languageResultJSON[key]["count"]
          }
        });
        let totalLanguages = {go: numGolangResult, python: numPythonResult, ruby: numRubyResult, javascript: numJavaScriptResult}
        if(!_.isEqual(this.state.languages, totalLanguages)){
          this.setState({languages: totalLanguages});
        }
      });
    });

    fetch(huskyCIContainerRoute).then(resp => {
      resp.json().then(containerResultJSON => {
        Object.keys(containerResultJSON).forEach(function(key) {  
          if (_.isEqual(containerResultJSON[key]["container"], "gosec")) {
            numGosecResult = containerResultJSON[key]["count"]
          }
          if (_.isEqual(containerResultJSON[key]["container"], "npmaudit")) {
            numNpmauditResult = containerResultJSON[key]["count"]
          }
          if (_.isEqual(containerResultJSON[key]["container"], "yarnaudit")) {
            numYarnauditResult = containerResultJSON[key]["count"]
          }
          if (_.isEqual(containerResultJSON[key]["container"], "brakeman")) {
            numBrakemanResult = containerResultJSON[key]["count"]
          }
          if (_.isEqual(containerResultJSON[key]["container"], "safety")) {
            numSafetyResult = containerResultJSON[key]["count"]
          }
          if (_.isEqual(containerResultJSON[key]["container"], "bandit")) {
            numBanditResult = containerResultJSON[key]["count"]
          }
        });
        let totalContainers = {gosec: numGosecResult, npmAudit: numNpmauditResult, yarnAudit: numYarnauditResult, brakeman: numBrakemanResult, safety: numSafetyResult, bandit: numBanditResult}
        if(!_.isEqual(this.state.containers, totalContainers)){
          this.setState({containers: totalContainers});
        }
      });
    });

    fetch(huskyCIRepositoryRoute).then(resp => {
      resp.json().then(repositoryResultJSON => {
        newRepositoryResult = repositoryResultJSON[0]["totalRepositories"]
        if(!_.isEqual(this.state.repositories, newRepositoryResult)){
          this.setState({repositories: newRepositoryResult});
        }
      });
    });
  }

  componentWillUnmount() {
    clearInterval(this.timeoutID);
  }

  render() {
    const infoAuthors = [this.state.numAuthors]
    
    const infoNumAnalysis = [this.state.numAnalysis] 
    
    const numGoFound = [this.state.languages.go]
    const numPythonFound = [this.state.languages.python]
    const numRubyFound = [this.state.languages.ruby]
    const numJavaScriptFound = [this.state.languages.javascript]
    const infoLanguages = {
      labels: ["Golang", "Python", "Ruby", "JavaScript"],
      datasets: [
        {
          data: [numGoFound, numPythonFound, numRubyFound, numJavaScriptFound],
          backgroundColor: [colorBlue, colorGreen, colorRed, colorYellow],
          hoverBackgroundColor: [colorBlueHover, colorGreenHover, colorRedHover, colorYellowHover]
        }
      ]
    };

    const numFailedFound = [this.state.resultsAnalysis.failed]
    const numWarningFound = [this.state.resultsAnalysis.warning]
    const numPassedFound = [this.state.resultsAnalysis.passed]
    const numErrorFound = [this.state.resultsAnalysis.error]
    const infoAnalysis = {
      labels: ["Failed", "Warning", "Passed", "Error"],
      datasets: [
        {
          data: [numFailedFound, numWarningFound, numPassedFound, numErrorFound],
          backgroundColor: [colorRed, colorYellow, colorGreen, colorGray],
          hoverBackgroundColor: [colorRedHover, colorYellowHover, colorGreenHover, colorGrayHover]
        }
      ]
    };

    const numGosecFound = [this.state.containers.gosec]
    const numNpmauditFound = [this.state.containers.npmAudit]
    const numYarnauditFound = [this.state.containers.yarnAudit]
    const numBrakemanFound = [this.state.containers.brakeman]
    const numSafetyFound = [this.state.containers.safety]
    const numBanditFound = [this.state.containers.bandit]
    const infoContainers = {
      labels: ["Gosec", "Npm Audit", "Yarn Audit", "Brakeman", "Safety", "Bandit"],
      datasets: [
        {
          data: [numGosecFound, numNpmauditFound, numYarnauditFound, numBrakemanFound, numSafetyFound, numBanditFound],
          backgroundColor: [colorBlue, colorPurple, colorGray, colorRed, colorGreen, colorYellow],
          hoverBackgroundColor: [colorBlueHover, colorPurpleHover, colorGrayHover, colorRedHover, colorGreenHover, colorYellowHover]
        }
      ]
    };

    const infoRepositories = [this.state.repositories]   

    return (
      <React.Fragment>
        <div>
          <Row>
            <div style={{ margin: boxMargin, width: boxSizeWidth, height: boxSizeHeight-150 }}>
              <Paper>
                <div className="metric-container">
                  <span className="title-box">Developers</span>
                  <span className="metric-value">{infoAuthors}</span>
                </div>
              </Paper>
            </div>
            <div style={{ margin: boxMargin, width: boxSizeWidth, height: boxSizeHeight-150 }}>
              <Paper>
                <div className="metric-container">
                    <span className="title-box">Analyses</span>
                    <span className="metric-value">{infoNumAnalysis}</span>
                </div>
              </Paper>
            </div>
            <div style={{ margin: boxMargin, width: boxSizeWidth, height: boxSizeHeight-150 }}>
              <Paper>
                <div className="metric-container">
                   <span className="title-box">Repositories</span>
                   <br/>
                   <span className="metric-value">{infoRepositories}</span>
                </div>
              </Paper>
            </div>
          </Row>
          <Row>
            <div style={{ margin: boxMargin, width: boxSizeWidth, height: boxSizeHeight }}>
              <Paper>
                <Bar width={boxSizeWidth} height={boxSizeHeight} data={infoAnalysis} legend={{display: false}}/>
              </Paper>
            </div>
            <div style={{ margin: boxMargin, width: boxSizeWidth, height: boxSizeHeight }}>
              <Paper>
                <Bar width={boxSizeWidth} height={boxSizeHeight} data={infoLanguages} legend={{display: false}}/>
              </Paper>
            </div>
            <div style={{ margin: boxMargin, width: boxSizeWidth, height: boxSizeHeight }}>
              <Paper>
                <Bar width={boxSizeWidth} height={boxSizeHeight} data={infoContainers} legend={{display: false}}/>
              </Paper>
            </div>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

const Row = ({ children }) => (
  <div
    style={{
      margin: 16,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    {children}
  </div>
)

Row.propTypes = {
  children: PropTypes.node,
}

export default withStyles(styles)(Dashboard);
