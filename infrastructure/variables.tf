variable "project_id" {
  description = "GCP project ID"
  type        = string
}

variable "tf_backend_bucket" {
  description = "Terraform backend configuration"
  type        = string
}

variable "gh_repository" {
  description = "GitHub repository connection data"
  type = object({
    connection_id = string
    target_branch = optional(string, "^main$")
  })

  validation {
    condition     = can(regex("^projects/.+/locations/.+/connections/.+/repositories/.+$", var.gh_repository.connection_id))
    error_message = "Connection ID must follow the format: projects/PROJECT_ID/locations/LOCATION/connections/CONNECTION_NAME/repositories/REPOSITORY_ID"
  }
}

variable "artifact_registry" {
  description = "Artifact registry data"
  type = object({
    location   = string
    repository = string
    tag        = optional(string, "latest")
  })
}

variable "cloudbuild_trigger" {
  description = "Cloud Build trigger configuration"
  type = object({
    name            = string
    location        = string
    service_account = string
  })
}

variable "cloudrun" {
  description = "Cloud Run service configuration"
  type = object({
    service_name    = string
    region          = string
    service_account = string
  })
}
