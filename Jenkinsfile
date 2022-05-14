pipeline {
    environment { 
        registryCredential = 'dockerhub-jenkins' 
        dockerImage = '' 
    }
    agent any

    stages {
        stage('Step 1: Git Pull') {
            steps {
               git url: 'https://github.com/akilalakshmanan/caffeine_confessions_frontend.git'
            }
        }
        
        stage('Step 2: Npm build'){
            steps{
                script{
                    sh 'sudo npm install -g npm@8.9.0'
                    sh 'sudo npm install -g serve'
                    sh 'npm run build --force'
                }
            }
        }
        
        stage('Step 3: Testing'){
            steps{
                script{
                    sh 'npm test'
                }
            }
        }
        
        stage('Step 4: Build docker image') 

            { 
                steps{ 
                    script{ 
                        dockerImage = docker.build 'akila1811/react-image'  

                    } 
                } 
            } 
            
        stage('Step 5: Push docker image')
            {
                steps{
                    script {  
                       docker.withRegistry('',registryCredential) { 
                           dockerImage.push() 
                       }
                    }
                }
            }
            
        stage('Step 6: Ansible deployment')
            {
                steps{
                    ansiblePlaybook colorized: true, disableHostKeyChecking: true, installation: 'Ansible', inventory: 'inventory', playbook: 'deployment-playbook.yml'
                }
            }
            
            
    }
}
