pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "your-dockerhub-username/your-image-name"
        DOCKER_CREDENTIALS_ID = "dockerhub-creds"
        KUBECONFIG = credentials('kubeconfig-creds') // this must be stored in Jenkins as a "Secret file"
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/elbanas/devops-platform-spacex.git', branch: 'main'
            }
        }

        stage('Build with Maven') {
            steps {
                sh 'gradle '
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    def jarName = sh(script: "ls target/*.jar | head -n1", returnStdout: true).trim()
                    sh "cp ${jarName} app.jar"
                    sh "docker build -t ${DOCKER_IMAGE}:${BUILD_NUMBER} ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push ${DOCKER_IMAGE}:${BUILD_NUMBER}
                        docker tag ${DOCKER_IMAGE}:${BUILD_NUMBER} ${DOCKER_IMAGE}:latest
                        docker push ${DOCKER_IMAGE}:latest
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: 'kubeconfig-creds', variable: 'KUBECONFIG_FILE')]) {
                    sh '''
                        export KUBECONFIG=$KUBECONFIG_FILE
                        kubectl apply -f deployment.yml
                        kubectl rollout restart deployment/springboot-app
                    '''
                }
            }
        }
    }

    post {
        always {
            sh 'docker logout'
        }
    }
}

