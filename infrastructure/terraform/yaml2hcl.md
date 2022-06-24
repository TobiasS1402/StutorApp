If you want to copy examples from the Kubernetes documentation or migrate existing YAML manifests and use them with Terraform without manually converting YAML to HCL, this tool is for you.

tfk8s is a tool that makes it easier to work with the [Terraform Kubernetes Provider](https://registry.terraform.io/providers/hashicorp/kubernetes/latest/docs). It provides an easy solution to convert a YAML file containing multiple manifests. And Strip out server side fields when piping

# Install

```
go install github.com/jrhouston/tfk8s@latest
```
Alternatively, clone this repo and run:
```
make install
```
If Go's bin directory is not in your PATH you will need to add it:
```
export PATH=$PATH:$(go env GOPATH)/bin
```
On macOS, you can also install via [MacPorts](https://www.macports.org/):
```
sudo port install tfk8s
```

# Usage
```
Usage of tfk8s:
-f, --file string         Input file containing Kubernetes YAML manifests (default "-")
-M, --map-only            Output only an HCL map structure
-o, --output string       Output file to write Terraform config (default "-")
-p, --provider provider   Provider alias to populate the provider attribute
-s, --strip               Strip out server side fields - use if you are piping from kubectl get
-Q, --strip-key-quotes    Strip out quotes from HCL map keys unless they are required.
-V, --version             Show tool version
```

# Example
Create Terraform file from YAMl file
```
tfk8s -f stutor_azure_ingress-ssl.yaml -o output.tf
```
or, using pipes:
```
cat stutor_azure_ingress-ssl.yaml | tfk8s > output.tf
```
stutor_azure_ingress-ssl.yaml:
```
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: stutor
data:
  HU: stutor
```

✨✨ magically becomes ✨✨

output.tf:
```
resource "kubernetes_manifest" "configmap_test" {
  manifest = {
    "apiVersion" = "v1"
    "data" = {
      "HU" = "stutor"
    }
    "kind" = "ConfigMap"
    "metadata" = {
      "name" = "stutor"
    }
  }
}
```
