terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.4"
    }
  }
}

provider "kubernetes" {
  config_path = "~/.kube/config"
}

resource "kubernetes_manifest" "deployment_stutor_stutor_deployment" {
  manifest = {
    "apiVersion" = "apps/v1"
    "kind" = "Deployment"
    "metadata" = {
      "labels" = {
        "app" = "stutor"
      }
      "name" = "stutor-deployment"
      "namespace" = "stutor"
    }
    "spec" = {
      "replicas" = 1
      "selector" = {
        "matchLabels" = {
          "app" = "stutor"
        }
      }
      "template" = {
        "metadata" = {
          "labels" = {
            "app" = "stutor"
          }
        }
        "spec" = {
          "containers" = [
            {
              "env" = [
                {
                  "name" = "SECRET"
                  "valueFrom" = {
                    "secretKeyRef" = {
                      "key" = "API_SECRET"
                      "name" = "stutorsecrets"
                    }
                  }
                },
                {
                  "name" = "JWT_SECRET"
                  "valueFrom" = {
                    "secretKeyRef" = {
                      "key" = "JWT_SECRET"
                      "name" = "stutorsecrets"
                    }
                  }
                },
                {
                  "name" = "DATABASE_URL"
                  "valueFrom" = {
                    "secretKeyRef" = {
                      "key" = "DATABASE_URL"
                      "name" = "stutorsecrets"
                    }
                  }
                },
                {
                  "name" = "JWT_ALGO"
                  "value" = "HS256"
                },
                {
                  "name" = "CLIENT_ID"
                  "value" = "api.stutor.me"
                },
                {
                  "name" = "BASE_URL"
                  "value" = "https://stutor.germanywestcentral.cloudapp.azure.com"
                },
                {
                  "name" = "OPENAPI_SCHEME"
                  "value" = "https"
                },
                {
                  "name" = "OPENAPI_HOST"
                  "value" = "stutor.achievdb.space"
                },
                {
                  "name" = "NODE_ENV"
                  "value" = "production"
                },
                {
                  "name" = "PORT"
                  "value" = "3000"
                },
              ]
              "image" = "ghcr.io/tobiass1402/stutorserver-prod:master"
              "imagePullPolicy" = "Always"
              "name" = "stutor"
              "ports" = [
                {
                  "containerPort" = 3000
                },
              ]
            },
          ]
        }
      }
    }
  }
}

resource "kubernetes_manifest" "secret_stutor_stutorsecrets" {
  manifest = {
    "apiVersion" = "v1"
    "stringData" = {
      "API_SECRET" = ""
      "DATABASE_URL" = ""
      "JWT_SECRET" = ""
      "POSTGRES_PASSWORD" = ""
    }
    "kind" = "Secret"
    "metadata" = {
      "name" = "stutorsecrets"
      "namespace" = "stutor"
    }
    "type" = "Opaque"
  }
}

resource "kubernetes_manifest" "service_stutor_stutor_service" {
  manifest = {
    "apiVersion" = "v1"
    "kind" = "Service"
    "metadata" = {
      "name" = "stutor-service"
      "namespace" = "stutor"
    }
    "spec" = {
      "ports" = [
        {
          "port" = 3000
        },
      ]
      "selector" = {
        "app" = "stutor"
      }
      "type" = "ClusterIP"
    }
  }
}

resource "kubernetes_manifest" "ingress_stutor_stutor_ingress" {
  manifest = {
    "apiVersion" = "networking.k8s.io/v1"
    "kind" = "Ingress"
    "metadata" = {
      "annotations" = {
        "cert-manager.io/cluster-issuer" = "letsencrypt-prod"
        "nginx.ingress.kubernetes.io/use-regex" = "true"
      }
      "name" = "stutor-ingress"
      "namespace" = "stutor"
    }
    "spec" = {
      "ingressClassName" = "nginx"
      "rules" = [
        {
          "host" = "stutor.germanywestcentral.cloudapp.azure.com"
          "http" = {
            "paths" = [
              {
                "backend" = {
                  "service" = {
                    "name" = "stutor-service"
                    "port" = {
                      "number" = 3000
                    }
                  }
                }
                "path" = "/"
                "pathType" = "Prefix"
              },
            ]
          }
        },
      ]
      "tls" = [
        {
          "hosts" = [
            "stutor.germanywestcentral.cloudapp.azure.com",
          ]
          "secretName" = "tls-secret"
        },
      ]
    }
  }
}

resource "kubernetes_manifest" "clusterissuer_stutor_letsencrypt_prod" {
  manifest = {
    "apiVersion" = "cert-manager.io/v1"
    "kind" = "ClusterIssuer"
    "metadata" = {
      "name" = "letsencrypt-prod"
    }
    "spec" = {
      "acme" = {
        "email" = "tobias.seijsener@student.hu.nl"
        "privateKeySecretRef" = {
          "name" = "letsencrypt-prod"
        }
        "server" = "https://acme-v02.api.letsencrypt.org/directory"
        "solvers" = [
          {
            "http01" = {
              "ingress" = {
                "class" = "nginx"
                "podTemplate" = {
                  "spec" = {
                    "nodeSelector" = {
                      "kubernetes.io/os" = "linux"
                    }
                  }
                }
              }
            }
          },
        ]
      }
    }
  }
}

resource "kubernetes_persistent_volume_claim" "stutor_pvc" {
  metadata {
    name      = "stutor-pvc"
    namespace = "stutor"
  }
  spec {
    access_modes = ["ReadWriteOnce"]
    resources {
      requests = {
        storage = "5Gi"
      }
    }
    storage_class_name = "managed-premium"
  }
}

resource "kubernetes_manifest" "statefulset_stutor_stutor_db" {
  manifest = {
    "apiVersion" = "apps/v1"
    "kind" = "StatefulSet"
    "metadata" = {
      "name" = "stutor-db"
      "namespace" = "stutor"
    }
    "spec" = {
      "replicas" = 1
      "selector" = {
        "matchLabels" = {
          "app" = "stutor-db"
        }
      }
      "serviceName" = "stutor-db-service"
      "template" = {
        "metadata" = {
          "labels" = {
            "app" = "stutor-db"
          }
        }
        "spec" = {
          "containers" = [
            {
              "env" = [
                {
                  "name" = "POSTGRES_DB"
                  "value" = "stutor"
                },
                {
                  "name" = "POSTGRES_USER"
                  "value" = "stutoradmin"
                },
                {
                  "name" = "POSTGRES_PASSWORD"
                  "valueFrom" = {
                    "secretKeyRef" = {
                      "key" = "POSTGRES_PASSWORD"
                      "name" = "stutorsecrets"
                    }
                  }
                },
                {
                  "name" = "TZ"
                  "value" = "Europe/Amsterdam"
                },
                {
                  "name" = "PGDATA"
                  "value" = "/var/lib/postgresql/data/stutor-db"
                },
              ]
              "image" = "postgres:14-alpine"
              "imagePullPolicy" = "IfNotPresent"
              "name" = "stutor-db"
              "ports" = [
                {
                  "containerPort" = 5432
                  "name" = "postgres-port"
                  "protocol" = "TCP"
                },
              ]
              "volumeMounts" = [
                {
                  "mountPath" = "/var/lib/postgresql/data"
                  "name" = "postgres-claim"
                },
              ]
            },
          ]
          "volumes" = [
            {
              "name" = "postgres-claim"
              "persistentVolumeClaim" = {
                "claimName" = "stutor-pvc"
              }
            },
          ]
        }
      }
    }
  }
}

resource "kubernetes_manifest" "service_stutor_stutor_db_service" {
  manifest = {
    "apiVersion" = "v1"
    "kind" = "Service"
    "metadata" = {
      "name" = "stutor-db-service"
      "namespace" = "stutor"
    }
    "spec" = {
      "ports" = [
        {
          "port" = 5432
        },
      ]
      "selector" = {
        "app" = "stutor-db"
      }
      "type" = "ClusterIP"
    }
  }
}
