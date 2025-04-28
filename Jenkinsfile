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
      steps {
        timeout(time: 15, unit: "MINUTES") {
          input message: 'Do you want to approve the promotion to QA?', ok: 'YES'
        }
      }
    }
    stage('Promote-to-QA') {
      steps {
        sh '/usr/local/bin/heroku pipelines:promote -a nodejs-heroku-explorer-dev --to nodejs-heroku-explorer-qa'
      }
    }
    stage('Quality-Approval') {
      steps {
        timeout(time: 15, unit: "MINUTES") {
          input message: 'Do you want to approve the promotion to UAT?', ok: 'YES'
        }
      }
    }
    stage('Promote-to-UAT') {
      steps {
        sh '/usr/local/bin/heroku pipelines:promote -a nodejs-heroku-explorer-qa --to nodejs-heroku-explorer-uat'
      }
    }
    stage('Business-Approval') {
      steps {
        timeout(time: 15, unit: "MINUTES") {
          input message: 'Do you want to approve the promotion to Production?', ok: 'YES'
        }
      }
    }
    stage('Promote-to-Production') {
      steps {
        sh '/usr/local/bin/heroku pipelines:promote -a nodejs-heroku-explorer-uat --to nodejs-heroku-explorer-prod'
      }
    }
  }
  post {
    always {
      cleanWs()
    }
  }
}
