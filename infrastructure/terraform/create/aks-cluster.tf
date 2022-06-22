terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.10.0"
    }
  }
}

provider "azurerm" {
  features {}
}

# Create Resource Group
resource "azurerm_resource_group" "aks" {
  name     = "${var.name_prefix}-rg"
  location = "${var.location}"
}

# Create managed Kubernetes cluster (AKS)
resource "azurerm_kubernetes_cluster" "aks" {
  name                = "${var.name_prefix}-aks"
  location            = "${azurerm_resource_group.aks.location}"
  resource_group_name = "${azurerm_resource_group.aks.name}"
  dns_prefix          = "${var.name_prefix}"
  sku_tier            = "${var.sku_tier}"

  default_node_pool {
    name            = "${var.node_name}"
    node_count      = "${var.node_count}"
    vm_size         = "${var.vm_size}"
    os_disk_size_gb = "${var.os_disk_size_gb}"
  }

  service_principal {
    client_id     = "${var.client_id}"
    client_secret = "${var.client_secret}"
  }
}

# Initialize Helm (and install Tiller)
provider "helm" {

  kubernetes {
    host                   = "${azurerm_kubernetes_cluster.aks.kube_config.0.host}"
    client_certificate     = "${base64decode(azurerm_kubernetes_cluster.aks.kube_config.0.client_certificate)}"
    client_key             = "${base64decode(azurerm_kubernetes_cluster.aks.kube_config.0.client_key)}"
    cluster_ca_certificate = "${base64decode(azurerm_kubernetes_cluster.aks.kube_config.0.cluster_ca_certificate)}"
  }
}

# Create Static Public IP Address to be used by Nginx Ingress
resource "azurerm_public_ip" "nginx_ingress" {
  name                         = "${var.public_ip_name}"
  location                     = "${azurerm_kubernetes_cluster.aks.location}"
  resource_group_name          = "${azurerm_kubernetes_cluster.aks.node_resource_group}"
  allocation_method            = "${var.public_ip_allocation_method}"
  sku                          = "${var.public_ip_sku}"
  domain_name_label            = "${var.name_prefix}"
}

# Install Nginx Ingress using Helm Chart
resource "helm_release" "nginx_ingress" {
  name       = "${var.ingress_name}"
  repository = "${var.ingress_chart_repo}"
  chart      = "${var.ingress_name}"
  create_namespace = true
  namespace  = "${var.name_prefix}"

  set {
    name  = "controller.replicaCount"
    value = 1
  }

  set {
    name  = "controller.service.loadBalancerIP"
    value = "${azurerm_public_ip.nginx_ingress.ip_address}"
  }
}

# Install cert-manager using Helm Chart
resource "helm_release" "cert_manager" {
  name       = "${var.certmanager_name}"
  repository = "${var.certmanager_chart_repo}"
  chart      = "${var.certmanager_name}"
  create_namespace = true
  namespace  = "${var.certmanager_name}"
  version    = "${var.certmanager_chart_version}"

  set {
    name = "installCRDs"
    value = true
  }
}
