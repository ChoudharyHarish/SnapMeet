pipeline {
    agent {
        labels "docker-agent"
    }
    
    environment {
        SSH_KEY = credentials('ec2-deploy-key')
        DOCKER_CREDS = credentials('docker-hub-creds')
        EC2_USER = 'ubuntu'
        EC2_HOST = '13.234.7.210'

        SERVER_IMAGE = "harishchaudhary17/snapmeet:server-${BUILD_NUMBER}"
        CLIENT_IMAGE = "harishchaudhary17/snapmeet:client-${BUILD_NUMBER}"

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
                    ssh -o StrictHostKeyChecking=no -i $SSH_KEY $EC2_USER@$EC2_HOST '
                        echo "Creating .env file for docker-compose..."

                        cd ~/app   

                        echo "Updating image versions in .env file..."
                        sed -i "s|^SERVER_IMAGE=.*|SERVER_IMAGE=$SERVER_IMAGE|" .env
                        sed -i "s|^CLIENT_IMAGE=.*|CLIENT_IMAGE=$CLIENT_IMAGE|" .env

                        echo "Pulling latest images..."
                        docker-compose pull

                        echo "Starting services with docker-compose..."
                        docker-compose up -d
                    '
                    """
                }
            }
        }

    }
}
