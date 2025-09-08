pipeline {
    agent any

    environment {
        DOCKER_CREDS = credentials('docker-hub-creds')
        DOCKER_USER  = 'harishchaudhary17'

        BACKEND_REPO = "${DOCKER_USER}/snapmeet-server"
        FRONTEND_REPO = "${DOCKER_USER}/snapmeet-client"

        TAG = "build-${BUILD_NUMBER}"
    }

    stages {
        stage('Pre-checks') {
            steps {
                script {
                    // Fetch the latest commit message
                    def lastCommitMsg = sh(script: "git log -1 --pretty=%B", returnStdout: true).trim()
                    echo "Last commit message: ${lastCommitMsg}"

                    if (lastCommitMsg.contains("[ci skip]") || lastCommitMsg.contains("[skip ci]")) {
                        echo "Skipping build because commit message contains [ci skip]"
                        currentBuild.result = 'SUCCESS'
                        error("Build skipped intentionally")
                    }
                }
            }
        }

        stage('Checkout Code') {
            steps {
                git branch: 'master', url: 'https://github.com/ChoudharyHarish/snapmeet.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh """
                        echo "Building Backend image..."
                        docker build -t ${BACKEND_REPO}:${TAG} ./server

                        echo "Building Frontend image..."
                        docker build -t ${FRONTEND_REPO}:${TAG} ./client
                    """
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    sh """
                        echo "Logging in to DockerHub..."
                        echo "$DOCKER_CREDS_PSW" | docker login -u "$DOCKER_CREDS_USR" --password-stdin

                        echo "Pushing Backend image..."
                        docker push ${BACKEND_REPO}:${TAG}

                        echo "Pushing Frontend image..."
                        docker push ${FRONTEND_REPO}:${TAG}
                    """
                }
            }
        }

        stage('Update K8s Manifests') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'github-creds', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_TOKEN')]) {
                        sh """
                            echo "Updating Kubernetes manifests with new image tags..."
                            sed -i "s|image: ${BACKEND_REPO}:.*|image: ${BACKEND_REPO}:${TAG}|" kube/server-deployment.yaml
                            sed -i "s|image: ${FRONTEND_REPO}:.*|image: ${FRONTEND_REPO}:${TAG}|" kube/client-deployment.yaml
        
                            git config user.email "ci@yourorg.com"
                            git config user.name "jenkins-ci"
        
                            git add kube/
                            git commit -m "[ci skip] update manifests with ${TAG}"
        
                            # Use HTTPS URL with PAT to push changes
                            git remote set-url origin https://${GIT_USER}:${GIT_TOKEN}@github.com/ChoudharyHarish/snapmeet.git
                            git push origin master
                        """
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
