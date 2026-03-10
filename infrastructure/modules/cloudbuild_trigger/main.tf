resource "google_cloudbuild_trigger" "chracl_rating_dashboard_trigger" {
  name            = var.cloudbuild_trigger.name
  location        = var.cloudbuild_trigger.location
  service_account = var.cloudbuild_trigger.service_account

  include_build_logs = "INCLUDE_BUILD_LOGS_WITH_STATUS"

  repository_event_config {
    repository = var.gh_repository.connection_id

    push {
      branch = var.gh_repository.target_branch
    }
  }

  build {
    step {
      name = "gcr.io/cloud-builders/docker"
      args = [
        "build",
        "--build-arg",
        "NEXT_PUBLIC_GA_ID=${var.ga_id}",
        "-t",
        "${var.artifact_registry.location}-docker.pkg.dev/${var.project_id}/${var.artifact_registry.repository}/${var.service_name}:$COMMIT_SHA",
        ".",
      ]
    }
    step {
      name = "gcr.io/cloud-builders/docker"
      args = [
        "tag",
        "${var.artifact_registry.location}-docker.pkg.dev/${var.project_id}/${var.artifact_registry.repository}/${var.service_name}:$COMMIT_SHA",
        "${var.artifact_registry.location}-docker.pkg.dev/${var.project_id}/${var.artifact_registry.repository}/${var.service_name}:${var.artifact_registry.tag}",
      ]
    }
    step {
      name = "gcr.io/cloud-builders/docker"
      args = [
        "push",
        "${var.artifact_registry.location}-docker.pkg.dev/${var.project_id}/${var.artifact_registry.repository}/${var.service_name}",
        "--all-tags",
      ]
    }
    images = [
      "${var.artifact_registry.location}-docker.pkg.dev/${var.project_id}/${var.artifact_registry.repository}/${var.service_name}:$COMMIT_SHA",
      "${var.artifact_registry.location}-docker.pkg.dev/${var.project_id}/${var.artifact_registry.repository}/${var.service_name}:${var.artifact_registry.tag}",
    ]
    options {
      logging = "CLOUD_LOGGING_ONLY"
    }
  }
}
