variable "project_id" {
  description = "GCP project ID"
  type        = string
}

variable "service_name" {
  description = "Cloud Run service name"
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

variable "ga_id" {
  description = "Google Analytics ID"
  type        = string
}
