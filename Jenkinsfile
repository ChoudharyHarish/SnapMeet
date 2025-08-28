pipeline {
    agent {
        label "snapmeet-agent"
    }
    
    environment {
        DOCKER_CREDS = credentials('docker-hub-creds')

        SERVER_IMAGE = "harishchaudhary17/snapmeet:server-latest"
        CLIENT_IMAGE = "harishchaudhary17/snapmeet:client-latest"

        SERVER_CONTAINER = 'snapmeet-server'
        CLIENT_CONTAINER = 'snapmeet-client'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'master', url: 'https://github.com/ChoudharyHarish/snapmeet.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh """
                        echo "Building Server image..."
                        docker build -t $SERVER_IMAGE ./server

                        echo "Building Client image..."
                        docker build -t $CLIENT_IMAGE ./client
                    """
                }
            }
        }

        stage('Push Images to DockerHub') {
            steps {
                script {
                    sh """
                        echo "Logging in to DockerHub..."
                        echo "$DOCKER_CREDS_PSW" | docker login -u "$DOCKER_CREDS_USR" --password-stdin

                        echo "Pushing Server image..."
                        docker push $SERVER_IMAGE

                        echo "Pushing Client image..."
                        docker push $CLIENT_IMAGE
                    """
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    sh """
                        cd ~/app
                        echo "Cleaning up old containers..."
                        docker-compose -f docker-compose.prod.yaml down || true

                        echo "Updating image versions in .env file..."
                        sed -i "s|^SERVER_IMAGE=.*|SERVER_IMAGE=$SERVER_IMAGE|" .env
                        sed -i "s|^CLIENT_IMAGE=.*|CLIENT_IMAGE=$CLIENT_IMAGE|" .env
            
                        echo "Running latest version..."
                        docker-compose -f docker-compose.prod.yaml up -d
                    """
                }
            }
        }
    }

    post {
        always {
            script {
                // Cleanup Jenkins workspace (not Docker containers)
                deleteDir()
                echo 'Workspace cleaned.'
            }
        }
    }
}
