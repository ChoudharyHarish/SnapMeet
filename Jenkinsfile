pipeline {
    agent any

    environment {
        DOCKER_CREDS = credentials('docker-hub-creds')  // Docker Hub credentials
        DOCKER_USER  = 'harishchoudhary17'

        BACKEND_REPO  = "${DOCKER_USER}/snapmeet-server"
        FRONTEND_REPO = "${DOCKER_USER}/snapmeet-client"

        TAG = "build-${BUILD_NUMBER}"  // auto-incremented build tag
    }

    stages {

        stage('Pre-checks') {
            steps {
                script {
                    // Check last commit message for [ci skip] or [skip ci]
                    def lastCommitMsg = sh(script: "git log -1 --pretty=%B", returnStdout: true).trim()
                    echo "Last commit message: ${lastCommitMsg}"

                    if (lastCommitMsg.contains("[ci skip]") || lastCommitMsg.contains("[skip ci]")) {
                        echo "Skipping build due to commit message containing [ci skip]"
                        currentBuild.result = 'SUCCESS'
                        error("Build skipped intentionally")
                    }
                }
            }
        }

        stage('Checkout Code') {
            steps {
                sshagent(['github-ssh-key']) {
                    sh '''
                        echo "Cloning repo via SSH..."
                        rm -rf SnapMeet
                        git clone git@github.com:ChoudharyHarish/SnapMeet.git
                        cd SnapMeet
                        git checkout master
                    '''
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh """
                        echo "Building Backend Docker image..."
                        docker build -t ${BACKEND_REPO}:${TAG} ./server

                        echo "Building Frontend Docker image..."
                        docker build -t ${FRONTEND_REPO}:${TAG} ./client
                        docker build --build-arg REACT_APP_API_URL="http://snapmeet-server:3001/api/v1" -t ${FRONTEND_REPO}:${TAG} ./client
                    """
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-creds') {
                        sh """
                            echo "Pushing Backend image..."
                            docker push ${BACKEND_REPO}:${TAG}

                            echo "Pushing Frontend image..."
                            docker push ${FRONTEND_REPO}:${TAG}
                        """
                    }
                }
            }
        }

        stage('Update K8s Manifests & Push') {
            steps {
                dir('SnapMeet') {
                    sshagent(['github-ssh-key']) {
                        sh """
                            echo "Updating Kubernetes manifests..."
                            sed -i "s|image: ${BACKEND_REPO}:.*|image: ${BACKEND_REPO}:${TAG}|" kube/server-deployment.yaml
                            sed -i "s|image: ${FRONTEND_REPO}:.*|image: ${FRONTEND_REPO}:${TAG}|" kube/client-deployment.yaml

                            git config user.email "jenkins@example.com"
                            git config user.name "jenkins-ci"

                            git add kube/
                            if ! git diff --cached --quiet; then
                                git commit -m "[ci skip] update manifests with ${TAG}"
                                git push origin master
                                echo "Manifests pushed successfully."
                            else
                                echo "No changes to commit."
                            fi
                        """
                    }
                }
            }
        }

    }

    post {
        always {
            echo "Cleaning workspace..."
            cleanWs()
        }
    }
}
