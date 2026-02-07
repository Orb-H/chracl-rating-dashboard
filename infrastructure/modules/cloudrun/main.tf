# TODO: Add IAM settings
resource "google_cloud_run_v2_service" "chracl_rating_dashboard_service" {
  name     = var.cloudrun.service_name
  location = var.cloudrun.region
  ingress  = "INGRESS_TRAFFIC_ALL"

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

    scaling {
      min_instance_count = 0
      max_instance_count = 10
    }
  }
}
