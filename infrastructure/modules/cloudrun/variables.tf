variable "project_id" {
  description = "GCP project ID"
  type        = string
}

variable "artifact_registry" {
  description = "Artifact registry name"
  type = object({
    location   = string
    repository = string
    tag        = optional(string, "latest")
  })
}

variable "cloudrun" {
  description = "Cloud Run service configuration"
  type = object({
    service_name    = string
    region          = string
    service_account = string
  })

  validation {
    condition     = can(regex("^[a-z0-9-]+@[a-z0-9-]+\\.iam\\.gserviceaccount\\.com$", var.cloudrun.service_account))
    error_message = "Service account must be a valid GCP service account email (e.g., name@project.iam.gserviceaccount.com)."
  }
}
