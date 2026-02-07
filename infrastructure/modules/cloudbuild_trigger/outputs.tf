output "image_uri" {
  description = "The URI of the Docker image in Artifact Registry."
  value       = "${var.artifact_registry.location}-docker.pkg.dev/${var.project_id}/${var.artifact_registry.repository}/${var.service_name}:${var.artifact_registry.tag}"
}

output "build_id" {
  description = "The ID of the last build triggered by Cloud Build."
  value       = google_cloudbuild_trigger.chracl_rating_dashboard_trigger.id
}
