pipeline {
  agent none
  stages {
    stage('test') {
      parallel {
        stage('test') {
          agent {
            docker {
              image 'node:10-alpine'
            }

          }
          steps {
            sh 'node --version'
          }
        }
        stage('echo') {
          steps {
            sleep 1
            echo 'testt'
          }
        }
      }
    }
  }
}