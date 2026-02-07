output "cloudbuild_image_uri" {
  description = "The URI of the Docker image in Artifact Registry."
  value       = module.cloudbuild_trigger.image_uri
}

output "cloudbuild_trigger_id" {
  description = "The ID of the last build triggered by Cloud Build."
  value       = module.cloudbuild_trigger.build_id
}

output "cloudrun_service_url" {
  description = "The URL of the Cloud Run service."
  value       = module.cloudrun.service_url
}
