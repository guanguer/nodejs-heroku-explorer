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
        sh 'npm cache clean --force'
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
  }
  post {
    always {
      cleanWs()
    }
  }
}
