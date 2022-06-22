#SECRET VARIABLE, BE CAREFUL!
variable "client_id" {
  description = "(Required) The Client ID for the Service Principal."
  default = ""
}
#SECRET VARIABLE, BE CAREFUL!
variable "client_secret" {
  description = "(Required) The Client Secret for the Service Principal."
  default = ""
}

# Set default name prefix
variable "name_prefix" {
  description = "name prefix for recurring configurable objects"
  default = "stutor"
}

# Set default location
variable "location" {
  description = "(Required) The location where the Managed Kubernetes Cluster should be created. Changing this forces a new resource to be created."
  default = "germanywestcentral"
}

# Set SKU tier
variable "sku_tier" {
  description = "The SKU Tier that should be used for this Kubernetes Cluster. "
  default = "Free"
}

variable "node_name" {
  description = "The name of the Managed Kubernetes Cluster to create. Changing this forces a new resource to be created."
  default = "agentpool"
}

variable "node_count" {
  description = "Optional) The initial number of nodes which should exist in this Node Pool."
  default = 1
}

variable "vm_size" {
  description = "(Required) The size of the Virtual Machine"
  default = "standard_f2s_v2"
}

variable "os_disk_size_gb" {
  description = "Optional) The size of the OS Disk which should be used for each agent in the Node Pool. Changing this forces a new resource to be created."
  default = 30
}

variable "public_ip_name" {
  description = "(Required) Specifies the name of the Public IP. Changing this forces a new Public IP to be created."
  default = "nginx-ingress-pip"
}

variable "public_ip_allocation_method" {
  description = "Required) Defines the allocation method for this IP address. Possible values are Static or Dynamic."
  default = "Static"
}

variable "public_ip_sku" {
  description = " (Optional) The SKU of the Public IP. Accepted values are Basic and Standard. Defaults to Basic"
  default = "Standard"
}

variable "ingress_name" {
  description = "(Required) Release name."
  default = "ingress-nginx"
}

variable "ingress_chart_repo" {
  description = "(Optional) Repository URL where to locate the requested chart."
  default = "https://kubernetes.github.io/ingress-nginx"
}

variable "certmanager_name" {
  description = "(Required) Release name."
  default = "cert-manager"
}

variable "certmanager_chart_repo" {
  description = "(Optional) Repository URL where to locate the requested chart."
  default = "https://charts.jetstack.io"
}

variable "certmanager_chart_version" {
  description = "(Optional) Specify the exact chart version to install. If this is not specified, the latest version is installed."
  default = "v1.8.0"
}
