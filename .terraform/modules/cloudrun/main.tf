terraform {
  required_version = ">= 1.0"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
}

provider "google" {
  project = var.project_id
}

resource "google_cloud_run_v2_service" "chracl_rating_dashboard_service" {
  project  = var.project_id
  name     = var.cloudrun.service_name
  location = var.cloudrun.region

  template {
    service_account = var.cloudrun.service_account

    containers {
      image = "${var.artifact_registry.location}-docker.pkg.dev/${var.project_id}/${var.artifact_registry.repository}/${var.cloudrun.service_name}:${var.artifact_registry.tag}"

      ports {
        container_port = 8080
      }

      resources {
        limits = {
          cpu    = "1"
          memory = "512Mi"
        }
        cpu_idle          = true
        startup_cpu_boost = true
      }
    }
  }
}
