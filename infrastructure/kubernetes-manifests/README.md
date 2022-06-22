# In short
This folder represents the Kubernetes manifests and the development phases;
 - `stutor_local.yaml` is the kubernetes manifest for local execution within a bare metal K3S or K8S cluster, tested with [K3S v1.23.6-rc1+k3s1](https://k3s.io/).
 - `stutor_azure_LB.yaml` is the kubernetes file for Azure Kubernetes Services (AKS) where the service is directly exposed over a public IP to the internet.
 - `stutor_azure_ingress-ssl.yaml` is the final iteration of the kubernetes file, with the implementation of a PostgreSQL database with Azure storage, nginx ingress with a public ip and a domain name, and last but not least working Let's encrypt certificates.

In the section below you can find the steps to manually configure and install the service within a AKS cluster, all the commands have been issued via the [Azure Cloud Shell](https://docs.microsoft.com/en-us/azure/cloud-shell/overview).

## Manual Azure Kubernetes Services setup for Stutor
```
tobias@Azure:~$ az network public-ip create \
> --resource-group stutor \
> --name stutor_public --sku Standard \
> --allocation-method static \
> --query publicIp.ipAddress -o tsv

az group show -n stutor -o tsv --query id

az aks show -n stutor -g stutor --query "identity.principalId" -o tsv

az role assignment create --assignee b99028c8-d2ba-46aa-b040-273a842f61cf --role "Network Contributer" --scope /subscriptions/1227e908-f876-403d-b7e5-a942b7d36810/resourceGroups/MC_stutor_stutor_westeurope

kubectl create namespace stutor

helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm install stutor-ingress ingress-nginx/ingress-nginx --namespace stutor --set controller.replicaCount=1 --set controller.nodeSelector."beta\.kubernetes\.io/os"=linux --set defaultBackend.nodeSelector."beta\.kubernetes\.io/os"=linux --set controller.service.loadBalancerIP="20.86.195.116"

helm repo add jetstack https://charts.jetstack.io
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.8.0/cert-manager.crds.yaml
helm install cert-manager jetstack/cert-manager --namespace cert-manager --create-namespace --version v1.8.0

kubectl apply -f stutor_azure_ingress-ssl.yaml
```
## sources on which the setup is based:
- https://devopstales.github.io/cloud/aks-ingress-controller
- https://docs.microsoft.com/en-us/azure/aks/ingress-basic