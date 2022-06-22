# In short
This project is a Innovation project for the University of applied sciences Utrecht, institute for ICT. This repository is a fork of the [StutorApp](https://github.com/QuantozProject/StutorApp) project for blockchain start-up [Quantoz](https://quantoz.com/).

In this repository can be seen as a [monorepo](https://semaphoreci.com/blog/what-is-monorepo) for all the source and infrastructure code within this project. The project structure can be found below and each individual directory has its own `README.md` file with documentation for a specific part of the project.

# Project structure
```
stutorserver
│   README.md   #project structure, explaination
│
└───infrastructure  #infrastructure directory with docker, k8s & terraform
│   │
|   └───dockerfiles     #docker files for npm dev and npm prod ready server
|   │       Dockerfile-dev      #dockerfile with npm run
|   |       Dockerfile-prod     #dockerfile with npm i --only=production
|   |       README.md   #explaination
|   |
|   └───kubernetes-manifests    #directory with kubernetes manifests
|   │       README.md   #explaination
|   |       stutor_azure_ingress-ssl.yaml   #AKS ssl ingress manifest
|   |       stutor_azure_LB.yaml    #AKS loadbalanced manifest
|   |       stutor_local.yaml   #K3S local manifest
|   |
|   └───terraform   #terraform main directory
|       |   .gitignore  #terraform gitignore
|       |   README.md   #explaination
|       |
|       └───create  #cluster creation hcl manifests
|       |   aks-cluster.tf  #hcl manifest for cluster creation
|       |   variables.tf    #hcl manifest with variables for aks-cluster.tf
|       |
|       └───deploy  #deployment of resources hcl manifest
|       |   stutor_azure_ingress_ssl.tf     #hcl manifest converted from yaml
|
└───source  #application and server sourcecode inherited from previous group
    |
    └───client  #client source code
    |       src
    |       assets
    |       tsconfig.json
    |       ...
    |
    └───server  #server source code
    |       src
    |       tsconfig.json
    |       ...
```