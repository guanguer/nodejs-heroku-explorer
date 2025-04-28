pipeline {
  agent any
  options {
    buildDiscarder(logRotator(numToKeepStr: '10', artifactNumToKeepStr: '5'))
  }
  tools { nodejs 'node' }
  stages {
    stage('Setup') {
      steps {
        sh 'rm -rf node_modules'
        sh 'npm install'
      }
    }
    stage('Test') {
      steps {
        script {
          try {
            sh 'npm test'
          } catch (exc) {
            currentBuild.result = 'UNSTABLE'
          }
        }
      }
    }
    stage('Developer-Approval') {
      when {
	      branch 'develop'
      }
      steps {
        timeout(time: 15, unit: "MINUTES") {
          input message: 'Do you want to approve the deployment?', ok: 'YES'
        }
      }
    }
    stage('Promote-to-QA') {
      when {
	      branch 'develop'
      }
      steps {
        sh 'heroku pipelines:promote -a nodejs-heroku-explorer-dev --to nodejs-heroku-explorer-qa'
      }
    }
  }
  post {
    always {
      cleanWs()
    }
  }
}
