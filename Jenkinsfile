pipeline {
  agent any
  stages {
    stage('test stage') {
      parallel {
        stage('test') {
          agent {
            docker {
              image 'node:10-alpine'
              args '-p 3000:3001'
            }

          }
          steps {
            sh '''node --version
'''
            timeout(time: 1, unit: 'MINUTES') {
              sh 'ls'
            }

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
    stage('print output') {
      steps {
        echo 'done'
      }
    }
  }
}