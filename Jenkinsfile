pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "androgeek/spacex"
        DOCKER_CREDENTIALS_ID = "dockerhub-creds"
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/elbanas/devops-platform-spacex.git', branch: 'main'
            }
        }

        stage('Build Frontend') {
            steps {
                sh './gradlew ngbuildProd'
            }
        }

        stage('Build with Gradle') {
            steps {
                sh './gradlew build '
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    def jarName = sh(script: "ls Backend/build/libs/*.jar | head -n1", returnStdout: true).trim()
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
                    sh '''
                        export KUBECONFIG=/var/lib/jenkins/.kube/config
                        kubectl apply -f deployment
                        kubectl rollout restart deployment.apps/spacex-app
                    '''
            }
        }
    }



}

