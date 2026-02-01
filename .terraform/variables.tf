variable "project_id" {
  description = "GCP project ID"
  type        = string
}

variable "service_account" {
  description = "Service account email"
  type        = string
}

variable "gh_repository" {
  description = "GitHub repository connection data"
  type = object({
    connection_id = string
    target_branch = optional(string, "^main$")
  })
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
    service_name = string
    region       = string
  })
}
